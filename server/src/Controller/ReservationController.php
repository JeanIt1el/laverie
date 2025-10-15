<?php

namespace App\Controller;

use App\Entity\Reservation;
use App\Entity\Client;
use App\Repository\ReservationRepository;
use App\Repository\ClientRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/reservation')]
final class ReservationController extends AbstractController
{
    // GET ALL
    #[Route('', name: 'api_reservation_get_all', methods: ['GET'])]
    public function getAllReservations(ReservationRepository $repo): Response
    {
        $reservations = $repo->findAll();
        $data = [];

        foreach ($reservations as $r) {
            $client = $r->getClient();
            $data[] = [
                'id' => $r->getId(),
                'created_at' => $r->getCreatedAt()?->format('Y-m-d H:i:s'),
                'statut_reservation' => $r->getStatutReservation(),
                'montant_total' => $r->getMontantTotal(),
                'client' => $client ? [
                    'id' => $client->getId(),
                    'nom_client' => $client->getNomClient(),
                    'prenom_client' => $client->getPrenomClient(),
                    'email_client' => $client->getEmailClient(),
                    'phone_client' => $client->getPhoneClient(),
                    'adresse_client' => $client->getAdresseClient(),
                ] : null,
                'services' => $r->getServices()->map(fn($s) => [
                    'id' => $s->getId(),
                    'denomination' => $s->getDenomination(),
                    'prix' => $s->getPrix(),
                ])->toArray(),
                'paiements' => $r->getPaiements()->map(fn($p) => [
                    'id' => $p->getId(),
                    'montant' => $p->getMontant(),
                    'date_paiement' => $p->getCreatedAt()?->format('Y-m-d H:i:s'),
                ])->toArray(),
            ];
        }

        return $this->json($data);
    }

    // GET ONE
    #[Route('/{id}', name: 'api_reservation_get_one', methods: ['GET'])]
    public function getReservationById(Reservation $reservation): Response
    {
        $client = $reservation->getClient();
        return $this->json([
            'id' => $reservation->getId(),
            'created_at' => $reservation->getCreatedAt()?->format('Y-m-d H:i:s'),
            'statut_reservation' => $reservation->getStatutReservation(),
            'montant_total' => $reservation->getMontantTotal(),
            'client' => $client ? [
                'id' => $client->getId(),
                'nom_client' => $client->getNomClient(),
                'prenom_client' => $client->getPrenomClient(),
                'email_client' => $client->getEmailClient(),
                'phone_client' => $client->getPhoneClient(),
                'adresse_client' => $client->getAdresseClient(),
            ] : null,
            'services' => $reservation->getServices()->map(fn($s) => [
                'id' => $s->getId(),
                'denomination' => $s->getDenomination(),
                'prix' => $s->getPrix(),
            ])->toArray(),
            'paiements' => $reservation->getPaiements()->map(fn($p) => [
                'id' => $p->getId(),
                'montant' => $p->getMontant(),
                'date_paiement' => $p->getCreatedAt()?->format('Y-m-d H:i:s'),
            ])->toArray(),
        ]);
    }

    // CREATE - ✅ Statut automatique "En attente"
    #[Route('', name: 'api_reservation_create', methods: ['POST'])]
    public function createReservation(
        Request $request,
        EntityManagerInterface $em,
        ClientRepository $clientRepo,
        \App\Repository\ServiceRepository $serviceRepo
    ): Response {
        $data = json_decode($request->getContent(), true);
        error_log(print_r($data, true));

        if (empty($data['client_id'])) {
            return $this->json(['error' => 'client_id is required'], Response::HTTP_BAD_REQUEST);
        }

        $client = $clientRepo->find($data['client_id']);
        if (!$client) {
            return $this->json(['error' => 'Client not found'], Response::HTTP_BAD_REQUEST);
        }

        $reservation = new Reservation();
        
        // ✅ Forcer le statut à "En attente" lors de la création
        $reservation->setStatutReservation('En attente');
        
        $reservation->setMontantTotal((float) ($data['montant_total'] ?? 0));
        $reservation->setClient($client);

        // Date de création
        $createdAt = !empty($data['created_at']) 
            ? \DateTimeImmutable::createFromFormat('Y-m-d', $data['created_at'])
            : new \DateTimeImmutable();
        
        if (!$createdAt) {
            return $this->json(['error' => 'Date invalide'], Response::HTTP_BAD_REQUEST);
        }
        $reservation->setCreatedAt($createdAt);

        // Associer les services
        if (!empty($data['services']) && is_array($data['services'])) {
            foreach ($data['services'] as $serviceId) {
                $service = $serviceRepo->find($serviceId);
                if ($service) {
                    $reservation->addService($service);
                }
            }
        }

        $em->persist($reservation);
        $em->flush();

        $client = $reservation->getClient();
        return $this->json([
            'id' => $reservation->getId(),
            'created_at' => $reservation->getCreatedAt()->format('Y-m-d H:i:s'),
            'statut_reservation' => $reservation->getStatutReservation(),
            'montant_total' => $reservation->getMontantTotal(),
            'client' => [
                'id' => $client->getId(),
                'nom_client' => $client->getNomClient(),
                'prenom_client' => $client->getPrenomClient(),
                'email_client' => $client->getEmailClient(),
                'phone_client' => $client->getPhoneClient(),
                'adresse_client' => $client->getAdresseClient(),
            ],
            'services' => $reservation->getServices()->map(fn($s) => [
                'id' => $s->getId(),
                'denomination' => $s->getDenomination(),
                'prix' => $s->getPrix(),
            ])->toArray(),
        ], Response::HTTP_CREATED);
    }

    // UPDATE
    #[Route('/{id}', name: 'api_reservation_update', methods: ['PUT', 'PATCH'])]
    public function updateReservation(
        Request $request,
        Reservation $reservation,
        EntityManagerInterface $em,
        ClientRepository $clientRepo
    ): Response {
        $data = json_decode($request->getContent(), true);

        // ✅ Permettre la modification du statut (pour marquer comme "Terminé")
        if (isset($data['statut_reservation'])) {
            // Valider que le statut est correct
            $validStatuses = ['En attente', 'En cours d\'exécution', 'Terminé', 'Annulé'];
            if (!in_array($data['statut_reservation'], $validStatuses)) {
                return $this->json(['error' => 'Statut invalide'], Response::HTTP_BAD_REQUEST);
            }
            $reservation->setStatutReservation($data['statut_reservation']);
        }

        if (isset($data['montant_total'])) {
            $reservation->setMontantTotal((float) $data['montant_total']);
        }

        if (isset($data['client_id'])) {
            $client = $clientRepo->find($data['client_id']);
            if (!$client) {
                return $this->json(['error' => 'Client not found'], Response::HTTP_BAD_REQUEST);
            }
            $reservation->setClient($client);
        }

        if (isset($data['created_at'])) {
            $createdAt = \DateTimeImmutable::createFromFormat('Y-m-d', $data['created_at']);
            if (!$createdAt) {
                return $this->json(['error' => 'Date invalide'], Response::HTTP_BAD_REQUEST);
            }
            $reservation->setCreatedAt($createdAt);
        }

        $em->flush();

        $client = $reservation->getClient();
        return $this->json([
            'id' => $reservation->getId(),
            'created_at' => $reservation->getCreatedAt()?->format('Y-m-d H:i:s'),
            'statut_reservation' => $reservation->getStatutReservation(),
            'montant_total' => $reservation->getMontantTotal(),
            'client' => $client ? [
                'id' => $client->getId(),
                'nom_client' => $client->getNomClient(),
                'prenom_client' => $client->getPrenomClient(),
                'email_client' => $client->getEmailClient(),
                'phone_client' => $client->getPhoneClient(),
                'adresse_client' => $client->getAdresseClient(),
            ] : null,
        ]);
    }

    // DELETE
    #[Route('/{id}', name: 'api_reservation_delete', methods: ['DELETE'])]
    public function deleteReservation(Reservation $reservation, EntityManagerInterface $em): Response
    {
        $em->remove($reservation);
        $em->flush();
        return $this->json(['message' => 'Reservation deleted successfully']);
    }
}
