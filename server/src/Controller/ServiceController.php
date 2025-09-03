<?php

namespace App\Controller;

use App\Entity\Service;
use App\Repository\ServiceRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/service')]
final class ServiceController extends AbstractController
{
    private function serializeService(Service $service): array
    {
        return [
            'id' => $service->getId(),
            'denomination' => $service->getDenomination(),
            'description' => $service->getDescription(),
            'prix' => $service->getPrix(),
            'created_at' => $service->getCreatedAt()?->format('Y-m-d H:i:s'),
        ];
    }

    #[Route('', name: 'api_service_get_all', methods: ['GET'])]
    public function getAllServices(ServiceRepository $serviceRepository): Response
    {
        $services = $serviceRepository->findAll();
        $data = array_map([$this, 'serializeService'], $services);

        return $this->json($data);
    }

    #[Route('', name: 'api_service_create', methods: ['POST'])]
    public function createService(Request $request, EntityManagerInterface $em): Response
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['denomination']) || empty($data['denomination'])) {
            return $this->json(['error' => 'denomination is required'], Response::HTTP_BAD_REQUEST);
        }

        if (!isset($data['prix']) || !is_numeric($data['prix'])) {
            return $this->json(['error' => 'prix is required and must be a number'], Response::HTTP_BAD_REQUEST);
        }

        $service = new Service();
        $service->setDenomination($data['denomination']);
        $service->setDescription($data['description'] ?? null);
        $service->setPrix((float) $data['prix']);
        $service->setCreatedAt(new \DateTimeImmutable());

        $em->persist($service);
        $em->flush();

        return $this->json($this->serializeService($service), Response::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'api_service_get_one', methods: ['GET'])]
    public function getServiceById(Service $service): Response
    {
        return $this->json($this->serializeService($service));
    }

    #[Route('/{id}', name: 'api_service_update', methods: ['PUT', 'PATCH'])]
    public function updateService(Request $request, Service $service, EntityManagerInterface $em): Response
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['denomination'])) $service->setDenomination($data['denomination']);
        if (isset($data['description'])) $service->setDescription($data['description']);
        if (isset($data['prix']) && is_numeric($data['prix'])) $service->setPrix((float) $data['prix']);

        $em->flush();

        return $this->json($this->serializeService($service));
    }

    #[Route('/{id}', name: 'api_service_delete', methods: ['DELETE'])]
    public function deleteService(Service $service, EntityManagerInterface $em): Response
    {
        $em->remove($service);
        $em->flush();

        return $this->json(['message' => 'Service deleted successfully']);
    }
}