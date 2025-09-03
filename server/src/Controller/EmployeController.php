<?php

namespace App\Controller;

use App\Entity\Employe;
use App\Entity\Role;
use App\Entity\Service;
use App\Repository\EmployeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/employe')]
final class EmployeController extends AbstractController
{
    private function serializeEmploye(Employe $employe): array
    {
        return [
            'id' => $employe->getId(),
            'nom' => $employe->getNom(),
            'prenoms' => $employe->getPrenoms(),
            'email' => $employe->getEmail(),
            'phone' => $employe->getPhone(),
            'cin' => $employe->getCin(),
            'services' => array_map(fn($s) => $s->getId(), $employe->getServices()->toArray()),
            'role' => $employe->getRole()?->getId(),
            'created_at' => $employe->getCreatedAt()?->format('Y-m-d H:i:s'),
        ];
    }

    #[Route('', name: 'api_employe_get_all', methods: ['GET'])]
    public function getAllEmployes(EmployeRepository $employeRepository): Response
    {
        $employes = $employeRepository->findAll();
        $data = array_map([$this, 'serializeEmploye'], $employes);

        return $this->json($data);
    }

    #[Route('', name: 'api_employe_create', methods: ['POST'])]
    public function createEmploye(Request $request, EntityManagerInterface $em): Response
    {
        $data = json_decode($request->getContent(), true);

        $required = ['nom', 'prenoms', 'email', 'phone', 'cin'];
        foreach ($required as $field) {
            if (!isset($data[$field]) || empty($data[$field])) {
                return $this->json(['error' => "$field is required"], Response::HTTP_BAD_REQUEST);
            }
        }

        $employe = new Employe();
        $employe->setNom($data['nom']);
        $employe->setPrenoms($data['prenoms']);
        $employe->setEmail($data['email']);
        $employe->setPhone($data['phone']);
        $employe->setCin($data['cin']);
        $employe->setCreatedAt(new \DateTimeImmutable());

        if (!empty($data['service_ids']) && is_array($data['service_ids'])) {
            foreach ($data['service_ids'] as $serviceId) {
                if (!is_int($serviceId)) {
                    return $this->json(['error' => 'service_ids doit être un tableau d’entiers'], Response::HTTP_BAD_REQUEST);
                }
                $service = $em->getRepository(Service::class)->find($serviceId);
                if (!$service) {
                    return $this->json(['error' => "Service ID $serviceId introuvable"], Response::HTTP_BAD_REQUEST);
                }
                $employe->addService($service);
            }
        }

        if (!empty($data['role_id'])) {
            $role = $em->getRepository(Role::class)->find($data['role_id']);
            if (!$role) {
                return $this->json(['error' => 'Rôle introuvable'], Response::HTTP_BAD_REQUEST);
            }
            $employe->setRole($role);
        }

        try {
            $em->persist($employe);
            $em->flush();
            return $this->json($this->serializeEmploye($employe), Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/by-services', name: 'api_employe_by_services', methods: ['POST'])]
    public function getEmployesByServices(Request $request, EmployeRepository $employeRepository): Response
    {
        $data = json_decode($request->getContent(), true);
        $serviceIds = $data['serviceIds'] ?? [];

        if (!is_array($serviceIds)) {
            return $this->json(['error' => 'serviceIds must be an array'], Response::HTTP_BAD_REQUEST);
        }

        $employes = $employeRepository->createQueryBuilder('e')
            ->join('e.services', 's')
            ->where('s.id IN (:ids)')
            ->setParameter('ids', $serviceIds)
            ->getQuery()
            ->getResult();

        $result = array_map([$this, 'serializeEmploye'], $employes);

        return $this->json($result);
    }

    #[Route('/{id}', name: 'api_employe_get_one', methods: ['GET'])]
    public function getEmployeById(Employe $employe): Response
    {
        return $this->json($this->serializeEmploye($employe));
    }

    #[Route('/{id}', name: 'api_employe_update', methods: ['PUT', 'PATCH'])]
    public function updateEmploye(Request $request, Employe $employe, EntityManagerInterface $em): Response
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['nom'])) $employe->setNom($data['nom']);
        if (isset($data['prenoms'])) $employe->setPrenoms($data['prenoms']);
        if (isset($data['email'])) $employe->setEmail($data['email']);
        if (isset($data['phone'])) $employe->setPhone($data['phone']);
        if (isset($data['cin'])) $employe->setCin($data['cin']);

        if (isset($data['service_ids']) && is_array($data['service_ids'])) {
            // 🔥 Nettoyer les anciens services
            foreach ($employe->getServices()->toArray() as $service) {
                $employe->removeService($service);
            }

            // 🔥 Ajouter les nouveaux
            foreach ($data['service_ids'] as $serviceId) {
                if (!is_int($serviceId)) {
                    return $this->json(['error' => 'service_ids doit être un tableau d’entiers'], Response::HTTP_BAD_REQUEST);
                }
                $service = $em->getRepository(Service::class)->find($serviceId);
                if (!$service) {
                    return $this->json(['error' => "Service ID $serviceId introuvable"], Response::HTTP_BAD_REQUEST);
                }
                $employe->addService($service);
            }
        }

        if (isset($data['role_id'])) {
            $role = $em->getRepository(Role::class)->find($data['role_id']);
            if (!$role) {
                return $this->json(['error' => 'Rôle introuvable'], Response::HTTP_BAD_REQUEST);
            }
            $employe->setRole($role);
        }

        try {
            $em->flush();
            return $this->json($this->serializeEmploye($employe));
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/{id}', name: 'api_employe_delete', methods: ['DELETE'])]
    public function deleteEmploye(Employe $employe, EntityManagerInterface $em): Response
    {
        try {
            $em->remove($employe);
            $em->flush();
            return $this->json(['message' => 'Employe deleted successfully']);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}