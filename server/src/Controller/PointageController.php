<?php

namespace App\Controller;

use App\Entity\Pointage;
use App\Entity\Employe;
use App\Repository\PointageRepository;
use App\Repository\EmployeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/pointage')]
final class PointageController extends AbstractController
{
    /* ---------- READ ALL ---------- */
    #[Route('', name: 'api_pointage_get_all', methods: ['GET'])]
    public function getAll(PointageRepository $repo): Response
    {
        return $this->json(array_map($this->serializePointage(...), $repo->findAll()));
    }

    /* ---------- READ ONE ---------- */
    #[Route('/{id}', name: 'api_pointage_get_one', methods: ['GET'])]
    public function getOne(Pointage $pointage): Response
    {
        return $this->json($this->serializePointage($pointage));
    }

    /* ---------- CREATE ---------- */
    #[Route('', name: 'api_pointage_create', methods: ['POST'])]
    public function create(
        Request $request,
        EntityManagerInterface $em,
        EmployeRepository $employeRepo
    ): Response {
        $data = json_decode($request->getContent(), true);

        if (empty($data['heure_debut'])) {
            return $this->json(['error' => 'heure_debut is required'], Response::HTTP_BAD_REQUEST);
        }
        if (empty($data['employe_id'])) {
            return $this->json(['error' => 'employe_id is required'], Response::HTTP_BAD_REQUEST);
        }

        $employe = $employeRepo->find($data['employe_id']);
        if (!$employe) {
            return $this->json(['error' => 'Employe not found'], Response::HTTP_BAD_REQUEST);
        }

        try {
            $heureDebut = new \DateTime($data['heure_debut']);
        } catch (\Exception) {
            return $this->json(['error' => 'Invalid heure_debut format'], Response::HTTP_BAD_REQUEST);
        }

        $heureFin = null;
        if (!empty($data['heure_fin'])) {
            try {
                $heureFin = new \DateTime($data['heure_fin']);
            } catch (\Exception) {
                return $this->json(['error' => 'Invalid heure_fin format'], Response::HTTP_BAD_REQUEST);
            }
            if ($heureFin <= $heureDebut) {
                return $this->json(['error' => 'heure_fin must be after heure_debut'], Response::HTTP_BAD_REQUEST);
            }
        }

        $pointage = new Pointage();
        $pointage->setHeureDebut($heureDebut)
                 ->setHeureFin($heureFin)
                 ->setEmploye($employe);

        if (isset($data['remarque'])) {
            $pointage->setRemarque($data['remarque']);
        }

        $em->persist($pointage);
        $em->flush();

        return $this->json($this->serializePointage($pointage), Response::HTTP_CREATED);
    }

    /* ---------- UPDATE ---------- */
    #[Route('/{id}', name: 'api_pointage_update', methods: ['PUT', 'PATCH'])]
    public function update(
        Request $request,
        Pointage $pointage,
        EntityManagerInterface $em,
        EmployeRepository $employeRepo
    ): Response {
        $data = json_decode($request->getContent(), true);

        if (isset($data['heure_debut'])) {
            try {
                $heureDebut = new \DateTime($data['heure_debut']);
                $pointage->setHeureDebut($heureDebut);
            } catch (\Exception) {
                return $this->json(['error' => 'Invalid heure_debut format'], Response::HTTP_BAD_REQUEST);
            }
        }

        if (array_key_exists('heure_fin', $data)) {
            if ($data['heure_fin'] === null || $data['heure_fin'] === '') {
                $pointage->setHeureFin(null);
            } else {
                try {
                    $heureFin = new \DateTime($data['heure_fin']);
                    if ($pointage->getHeureDebut() && $heureFin <= $pointage->getHeureDebut()) {
                        return $this->json(['error' => 'heure_fin must be after heure_debut'], Response::HTTP_BAD_REQUEST);
                    }
                    $pointage->setHeureFin($heureFin);
                } catch (\Exception) {
                    return $this->json(['error' => 'Invalid heure_fin format'], Response::HTTP_BAD_REQUEST);
                }
            }
        }

        if (isset($data['remarque'])) {
            $pointage->setRemarque($data['remarque']);
        }

        if (isset($data['employe_id'])) {
            if (empty($data['employe_id'])) {
                return $this->json(['error' => 'employe_id cannot be empty'], Response::HTTP_BAD_REQUEST);
            }
            $employe = $employeRepo->find($data['employe_id']);
            if (!$employe) {
                return $this->json(['error' => 'Employe not found'], Response::HTTP_BAD_REQUEST);
            }
            $pointage->setEmploye($employe);
        }

        $em->flush();
        return $this->json($this->serializePointage($pointage));
    }

    /* ---------- DELETE ---------- */
    #[Route('/{id}', name: 'api_pointage_delete', methods: ['DELETE'])]
    public function delete(Pointage $pointage, EntityManagerInterface $em): Response
    {
        $em->remove($pointage);
        $em->flush();
        return $this->json(null, Response::HTTP_NO_CONTENT);
    }

    /* ---------- BY EMPLOYE ---------- */
    #[Route('/employe/{employeId}', name: 'api_pointage_by_employe', methods: ['GET'])]
    public function byEmploye(
        int $employeId,
        PointageRepository $pointageRepo,
        EmployeRepository $employeRepo
    ): Response {
        $employe = $employeRepo->find($employeId);
        if (!$employe) {
            return $this->json(['error' => 'Employe not found'], Response::HTTP_NOT_FOUND);
        }

        $pointages = $pointageRepo->findBy(['employe' => $employe], ['createdAt' => 'DESC']);
        return $this->json(array_map($this->serializePointage(...), $pointages));
    }

    /* ---------- TODAY BY EMPLOYE ---------- */
    #[Route('/employe/{employeId}/today', name: 'api_pointage_today', methods: ['GET'])]
    public function todayByEmploye(
        int $employeId,
        PointageRepository $pointageRepo,
        EmployeRepository $employeRepo
    ): Response {
        $employe = $employeRepo->find($employeId);
        if (!$employe) {
            return $this->json(['error' => 'Employe not found'], Response::HTTP_NOT_FOUND);
        }

        $today = new \DateTime();
        $start = (clone $today)->setTime(0, 0);
        $end   = (clone $today)->setTime(23, 59, 59);

        $qb = $pointageRepo->createQueryBuilder('p')
            ->where('p.employe = :e')
            ->andWhere('p.heureDebut BETWEEN :start AND :end')
            ->setParameter('e', $employe)
            ->setParameter('start', $start)
            ->setParameter('end', $end)
            ->orderBy('p.heureDebut', 'ASC');

        return $this->json(array_map($this->serializePointage(...), $qb->getQuery()->getResult()));
    }

    /* ---------- HELPER ---------- */
    private function serializePointage(Pointage $p): array
    {
        return [
            'id'          => $p->getId(),
            'heure_debut' => $p->getHeureDebut()->format('Y-m-d H:i:s'),
            'heure_fin'   => $p->getHeureFin()?->format('Y-m-d H:i:s'),
            'remarque'    => $p->getRemarque(),
            'employe'     => [
                'id'      => $p->getEmploye()->getId(),
                'nom'     => $p->getEmploye()->getNom(),
                'prenoms' => $p->getEmploye()->getPrenoms(),
            ],
            'created_at'  => $p->getCreatedAt()->format('Y-m-d H:i:s'),
        ];
    }
}