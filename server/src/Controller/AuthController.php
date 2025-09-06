<?php

namespace App\Controller;

use App\Entity\Client;
use App\Repository\ClientRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/auth')]
class AuthController extends AbstractController
{
    // === ÉTAPE 1 : Vérifie si l'email existe déjà ===
    #[Route('/request-otp', name: 'api_request_otp', methods: ['POST'])]
    public function requestOtp(
        Request $request,
        ClientRepository $clientRepo,
        EntityManagerInterface $em // ✅ Déjà injecté
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        $email = $data['email_client'] ?? null;

        if (!$email) {
            return $this->json(['error' => 'Email est requis'], 400);
        }

        $client = $clientRepo->findOneBy(['email_client' => $email]);

        if ($client) {
            // ✅ Client existe → génère OTP
            $otp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
            $expiresAt = new \DateTimeImmutable('+10 minutes');

            $client->setOtpCode($otp);
            $client->setOtpExpiresAt($expiresAt);
            $em->flush(); // ✅ CORRIGÉ : utilise $em au lieu de getDoctrine()

            return $this->json([
                'requires_completion' => false,
                'message' => 'Un code envoyé à votre email.',
                'otp' => $otp, // 🔴 DEV only
            ]);
        } else {
            // ❌ Nouveau → demande les infos
            return $this->json([
                'requires_completion' => true,
                'email' => $email,
                'message' => 'Veuillez compléter vos informations.'
            ], 206);
        }
    }

    // === ÉTAPE 2 : Compléter le profil du nouveau client ===
    #[Route('/complete-profile', name: 'api_complete_profile', methods: ['POST'])]
    public function completeProfile(
        Request $request,
        EntityManagerInterface $em,
        ClientRepository $clientRepo
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $email = $data['email'] ?? null;
        $nom = $data['nom_client'] ?? null;
        $prenom = $data['prenom_client'] ?? null;
        $phone = $data['phone_client'] ?? null;
        $adresse = $data['adresse_client'] ?? null;

        if (!$email || !$nom || !$prenom || !$phone || !$adresse) {
            return $this->json(['error' => 'Tous les champs sont requis'], 400);
        }

        // Vérifie que l'email n’existe pas déjà
        if ($clientRepo->findOneBy(['email_client' => $email])) {
            return $this->json(['error' => 'Cet email est déjà utilisé'], 409);
        }

        $client = new Client();
        $client->setEmailClient($email);
        $client->setNomClient($nom);
        $client->setPrenomClient($prenom);
        $client->setPhoneClient($phone);
        $client->setAdresseClient($adresse);

        // Génère un OTP
        $otp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        $client->setOtpCode($otp);
        $client->setOtpExpiresAt(new \DateTimeImmutable('+10 minutes'));

        $em->persist($client);
        $em->flush();

        return $this->json([
            'message' => 'Profil complété. Un code a été envoyé.',
            'otp' => $otp, // 🔴 À supprimer en production
        ]);
    }

    // === ÉTAPE 3 : Vérifier l'OTP après connexion ===
    #[Route('/verify-otp', name: 'api_verify_otp', methods: ['POST'])]
    public function verifyOtp(
        Request $request,
        ClientRepository $clientRepo,
        EntityManagerInterface $em
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        $email = $data['email_client'] ?? null;
        $otp = $data['otp'] ?? null;

        if (!$email || !$otp) {
            return $this->json(['error' => 'Email et OTP requis'], 400);
        }

        $client = $clientRepo->findOneBy(['email_client' => $email]);

        if (!$client || $client->getOtpCode() !== $otp) {
            return $this->json(['error' => 'OTP invalide'], 400);
        }

        if ($client->getOtpExpiresAt() < new \DateTimeImmutable()) {
            return $this->json(['error' => 'OTP expiré'], 400);
        }

        // OTP valide → nettoyer
        $client->setOtpCode(null);
        $client->setOtpExpiresAt(null);
        $em->flush();

        return $this->json([
            'id' => $client->getId(),
            'nom_client' => $client->getNomClient(),
            'prenom_client' => $client->getPrenomClient(),
            'email_client' => $client->getEmailClient(),
            'phone_client' => $client->getPhoneClient(),
            'adresse_client' => $client->getAdresseClient(),
        ]);
    }

    // === Optionnel : Récupérer le client connecté ===
    #[Route('/me', name: 'api_client_me', methods: ['GET'])]
    public function me(): JsonResponse
    {
        $client = $this->getUser(); // À adapter si tu utilises JWT ou session

        if (!$client) {
            return $this->json(['error' => 'Non authentifié'], 401);
        }

        return $this->json([
            'id' => $client->getId(),
            'nom_client' => $client->getNomClient(),
            'prenom_client' => $client->getPrenomClient(),
            'email_client' => $client->getEmailClient(),
            'phone_client' => $client->getPhoneClient(),
            'adresse_client' => $client->getAdresseClient(),
        ]);
    }
}