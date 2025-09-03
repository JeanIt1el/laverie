<?php

namespace App\Controller;

use App\Entity\Paiement;
use App\Entity\Reservation;
use App\Entity\ModePaiement;
use App\Repository\PaiementRepository;
use App\Repository\ReservationRepository;
use App\Repository\ModePaiementRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/paiement')]
final class PaiementController extends AbstractController
{
    // GET ALL
    #[Route('', name: 'api_paiement_get_all', methods: ['GET'])]
    public function getAllPaiements(PaiementRepository $repo): Response
    {
        $paiements = $repo->findAll();
        $data = [];

        foreach ($paiements as $p) {
            $reservation = $p->getReservation();
            $mode = $p->getModePaiement();

            $data[] = [
                'id' => $p->getId(),
                'created_at' => $p->getCreatedAt()?->format('Y-m-d H:i:s'),
                'montant' => $p->getMontant(),
                'status' => $p->getStatus(),
                'reservation' => $reservation ? [
                    'id' => $reservation->getId(),
                    'statut_reservation' => $reservation->getStatutReservation(),
                ] : null,
                'mode_paiement' => $mode ? [
                    'id' => $mode->getId(),
                    'denomination_paie' => $mode->getDenominationPaie(),
                ] : null,
            ];
        }

        return $this->json($data);
    }

    // GET ONE
    #[Route('/{id}', name: 'api_paiement_get_one', methods: ['GET'])]
    public function getPaiementById(Paiement $paiement): Response
    {
        $reservation = $paiement->getReservation();
        $mode = $paiement->getModePaiement();

        return $this->json([
            'id' => $paiement->getId(),
            'created_at' => $paiement->getCreatedAt()?->format('Y-m-d H:i:s'),
            'montant' => $paiement->getMontant(),
            'status' => $paiement->getStatus(),
            'reservation' => $reservation ? [
                'id' => $reservation->getId(),
                'statut_reservation' => $reservation->getStatutReservation(),
            ] : null,
            'mode_paiement' => $mode ? [
                'id' => $mode->getId(),
                'denomination_paie' => $mode->getDenominationPaie(),
            ] : null,
        ]);
    }

    // CREATE
    #[Route('', name: 'api_paiement_create', methods: ['POST'])]
    public function createPaiement(
        Request $request,
        EntityManagerInterface $em,
        ReservationRepository $reservationRepo,
        ModePaiementRepository $modeRepo
    ): Response {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['montant'], $data['reservation_id'], $data['status'])) {
            return $this->json(['error' => 'montant, reservation_id et status sont requis'], Response::HTTP_BAD_REQUEST);
        }

        $reservation = $reservationRepo->find($data['reservation_id']);
        if (!$reservation) {
            return $this->json(['error' => 'Reservation not found'], Response::HTTP_BAD_REQUEST);
        }

        $mode = null;
        if (!empty($data['mode_paiement_id'])) {
            $mode = $modeRepo->find($data['mode_paiement_id']);
        }

        $paiement = new Paiement();
        $paiement->setCreatedAt(new \DateTimeImmutable());
        $paiement->setMontant((float) $data['montant']);
        $paiement->setStatus($data['status']);
        $paiement->setReservation($reservation);
        $paiement->setModePaiement($mode);

        $em->persist($paiement);
        $em->flush();

        return $this->json([
            'id' => $paiement->getId(),
            'created_at' => $paiement->getCreatedAt()?->format('Y-m-d H:i:s'),
            'montant' => $paiement->getMontant(),
            'status' => $paiement->getStatus(),
            'reservation' => [
                'id' => $reservation->getId(),
                'statut_reservation' => $reservation->getStatutReservation(),
            ],
            'mode_paiement' => $mode ? [
                'id' => $mode->getId(),
                'denomination_paie' => $mode->getDenominationPaie(),
            ] : null,
        ], Response::HTTP_CREATED);
    }

    // UPDATE
    #[Route('/{id}', name: 'api_paiement_update', methods: ['PUT', 'PATCH'])]
    public function updatePaiement(
        Request $request,
        Paiement $paiement,
        EntityManagerInterface $em,
        ReservationRepository $reservationRepo,
        ModePaiementRepository $modeRepo
    ): Response {
        $data = json_decode($request->getContent(), true);

        if (isset($data['montant'])) {
            $paiement->setMontant((float) $data['montant']);
        }
        if (isset($data['status'])) {
            $paiement->setStatus($data['status']);
        }
        if (isset($data['reservation_id'])) {
            $reservation = $reservationRepo->find($data['reservation_id']);
            if (!$reservation) {
                return $this->json(['error' => 'Reservation not found'], Response::HTTP_BAD_REQUEST);
            }
            $paiement->setReservation($reservation);
        }
        if (isset($data['mode_paiement_id'])) {
            $mode = $modeRepo->find($data['mode_paiement_id']);
            $paiement->setModePaiement($mode);
        }

        $em->flush();

        return $this->json([
            'id' => $paiement->getId(),
            'created_at' => $paiement->getCreatedAt()?->format('Y-m-d H:i:s'),
            'montant' => $paiement->getMontant(),
            'status' => $paiement->getStatus(),
            'reservation' => [
                'id' => $paiement->getReservation()->getId(),
                'statut_reservation' => $paiement->getReservation()->getStatutReservation(),
            ],
            'mode_paiement' => $paiement->getModePaiement() ? [
                'id' => $paiement->getModePaiement()->getId(),
                'denomination_paie' => $paiement->getModePaiement()->getDenominationPaie(),
            ] : null,
        ]);
    }

    // DELETE
    #[Route('/{id}', name: 'api_paiement_delete', methods: ['DELETE'])]
    public function deletePaiement(Paiement $paiement, EntityManagerInterface $em): Response
    {
        $em->remove($paiement);
        $em->flush();
        return $this->json(['message' => 'Paiement deleted successfully']);
    }
}