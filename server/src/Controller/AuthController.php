<?php

namespace App\Controller;

use App\Entity\Client;
use App\Repository\ClientRepository;
use App\Service\EmailService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/auth')]
class AuthController extends AbstractController
{
    public function __construct(private EmailService $emailService)
    {
    }

    #[Route('/request-otp', name: 'api_request_otp', methods: ['POST'])]
    public function requestOtp(
        Request $request,
        ClientRepository $clientRepo,
        EntityManagerInterface $em
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        $email = $data['email_client'] ?? null;

        if (!$email) {
            return $this->json(['error' => 'Email est requis'], 400);
        }

        $client = $clientRepo->findOneBy(['email_client' => $email]);

        if ($client) {
            $otp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
            $expiresAt = new \DateTimeImmutable('+10 minutes');

            $client->setOtpCode($otp);
            $client->setOtpExpiresAt($expiresAt);
            $em->flush();

            try {
                $this->emailService->sendOtpEmail($email, $otp);
            } catch (\Exception $e) {
                return $this->json(['error' => 'Erreur lors de l\'envoi de l\'email: ' . $e->getMessage()], 500);
            }

            return $this->json([
                'requires_completion' => false,
                'message' => 'Un code a été envoyé à votre email.',
            ]);
        } else {
            return $this->json([
                'requires_completion' => true,
                'email' => $email,
                'message' => 'Veuillez compléter vos informations.'
            ], 206);
        }
    }

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

        if ($clientRepo->findOneBy(['email_client' => $email])) {
            return $this->json(['error' => 'Cet email est déjà utilisé'], 409);
        }

        $client = new Client();
        $client->setEmailClient($email);
        $client->setNomClient($nom);
        $client->setPrenomClient($prenom);
        $client->setPhoneClient($phone);
        $client->setAdresseClient($adresse);

        $otp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        $client->setOtpCode($otp);
        $client->setOtpExpiresAt(new \DateTimeImmutable('+10 minutes'));

        $em->persist($client);
        $em->flush();

        try {
            $this->emailService->sendOtpEmail($email, $otp);
        } catch (\Exception $e) {
            return $this->json(['error' => 'Erreur lors de l\'envoi de l\'email: ' . $e->getMessage()], 500);
        }

        return $this->json([
            'message' => 'Profil complété. Un code a été envoyé.',
        ]);
    }

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
}
