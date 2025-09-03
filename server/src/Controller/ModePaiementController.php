<?php

namespace App\Controller;

use App\Repository\ModePaiementRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/mode-paiement')]
final class ModePaiementController extends AbstractController
{
    #[Route('', name: 'api_mode_paiement_get_all', methods: ['GET'])]
    public function getAll(ModePaiementRepository $repo): JsonResponse
    {
        $modes = $repo->findAll();

        $data = array_map(fn($m) => [
            'id' => $m->getId(),
            'denomination_paie' => $m->getDenominationPaie(),
            'numero' => $m->getNumero(),
        ], $modes);

        return $this->json($data);
    }
}