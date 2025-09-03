<?php

namespace App\Controller;

use App\Entity\Materiel;
use App\Entity\Service;
use App\Repository\MaterielRepository;
use App\Repository\ServiceRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/materiel')]
final class MaterielController extends AbstractController
{
    #[Route('', name: 'api_materiel_get_all', methods: ['GET'])]
    public function getAllMateriels(MaterielRepository $materielRepository): Response
    {
        $materiels = $materielRepository->findAll();
        $data = [];

        foreach ($materiels as $materiel) {
            $data[] = [
                'id' => $materiel->getId(),
                'nom_materiel' => $materiel->getNomMateriel(),
                'type_materiel' => $materiel->getTypeMateriel(),
                'etat_materiel' => $materiel->getEtatMateriel(),
                'quantite' => $materiel->getQuantite(),
                'service_id' => $materiel->getService()?->getId(),
                'service_nom' => $materiel->getService()?->getDenomination(),
                'created_at' => $materiel->getCreatedAt()?->format('Y-m-d H:i:s'),
            ];
        }

        return $this->json($data);
    }

    #[Route('', name: 'api_materiel_create', methods: ['POST'])]
    public function createMateriel(Request $request, EntityManagerInterface $em, ServiceRepository $serviceRepository): Response
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['nom_materiel']) || empty($data['nom_materiel'])) {
            return $this->json(['error' => 'nom_materiel is required'], Response::HTTP_BAD_REQUEST);
        }
        if (!isset($data['type_materiel']) || empty($data['type_materiel'])) {
            return $this->json(['error' => 'type_materiel is required'], Response::HTTP_BAD_REQUEST);
        }
        if (!isset($data['etat_materiel']) || empty($data['etat_materiel'])) {
            return $this->json(['error' => 'etat_materiel is required'], Response::HTTP_BAD_REQUEST);
        }
        if (!isset($data['quantite']) || !is_numeric($data['quantite'])) {
            return $this->json(['error' => 'quantite is required and must be a number'], Response::HTTP_BAD_REQUEST);
        }

        $materiel = new Materiel();
        $materiel->setNomMateriel($data['nom_materiel']);
        $materiel->setTypeMateriel($data['type_materiel']);
        $materiel->setEtatMateriel($data['etat_materiel']);
        $materiel->setQuantite((int)$data['quantite']);
        $materiel->setCreatedAt(new \DateTimeImmutable());

        if (isset($data['service_id']) && !empty($data['service_id'])) {
            $service = $serviceRepository->find($data['service_id']);
            if (!$service) {
                return $this->json(['error' => 'Service not found'], Response::HTTP_BAD_REQUEST);
            }
            $materiel->setService($service);
        }

        $em->persist($materiel);
        $em->flush();

        return $this->json([
            'id' => $materiel->getId(),
            'nom_materiel' => $materiel->getNomMateriel(),
            'type_materiel' => $materiel->getTypeMateriel(),
            'etat_materiel' => $materiel->getEtatMateriel(),
            'quantite' => $materiel->getQuantite(),
            'service_id' => $materiel->getService()?->getId(),
            'service_nom' => $materiel->getService()?->getNom(),
            'created_at' => $materiel->getCreatedAt()?->format('Y-m-d H:i:s'),
        ], Response::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'api_materiel_get_one', methods: ['GET'])]
    public function getMaterielById(Materiel $materiel): Response
    {
        return $this->json([
            'id' => $materiel->getId(),
            'nom_materiel' => $materiel->getNomMateriel(),
            'type_materiel' => $materiel->getTypeMateriel(),
            'etat_materiel' => $materiel->getEtatMateriel(),
            'quantite' => $materiel->getQuantite(),
            'service_id' => $materiel->getService()?->getId(),
            'service_nom' => $materiel->getService()?->getNom(),
            'created_at' => $materiel->getCreatedAt()?->format('Y-m-d H:i:s'),
        ]);
    }


    // ZONE DE MISE A JOUR 
    #[Route('/{id}', name: 'api_materiel_update', methods: ['PUT', 'PATCH'])]
    public function updateMateriel(Request $request, Materiel $materiel, EntityManagerInterface $em, ServiceRepository $serviceRepository): Response
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['nom_materiel'])) $materiel->setNomMateriel($data['nom_materiel']);
        if (isset($data['type_materiel'])) $materiel->setTypeMateriel($data['type_materiel']);
        if (isset($data['etat_materiel'])) $materiel->setEtatMateriel($data['etat_materiel']);
        if (isset($data['quantite'])) $materiel->setQuantite((int)$data['quantite']);

        if (isset($data['service_id'])) {
            if ($data['service_id'] === null) {
                $materiel->setService(null);
            } else {
                $service = $serviceRepository->find($data['service_id']);
                if (!$service) return $this->json(['error' => 'Service not found'], Response::HTTP_BAD_REQUEST);
                $materiel->setService($service);
            }
        }

        $em->flush();

        return $this->json([
            'id' => $materiel->getId(),
            'nom_materiel' => $materiel->getNomMateriel(),
            'type_materiel' => $materiel->getTypeMateriel(),
            'etat_materiel' => $materiel->getEtatMateriel(),
            'quantite' => $materiel->getQuantite(),
            'service_id' => $materiel->getService()?->getId(),
            'service_nom' => $materiel->getService()?->getNom(),
            'created_at' => $materiel->getCreatedAt()?->format('Y-m-d H:i:s'),
        ]);
    }

    #[Route('/{id}', name: 'api_materiel_delete', methods: ['DELETE'])]
    public function deleteMateriel(Materiel $materiel, EntityManagerInterface $em): Response
    {
        $em->remove($materiel);
        $em->flush();
        return $this->json(['message' => 'Materiel deleted successfully']);
    }
}