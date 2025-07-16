<?php

namespace App\Controller;

use App\Entity\Role;
use App\Form\RoleType;
use App\Repository\RoleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/role')]
final class RoleController extends AbstractController
{
    #[Route('', name: 'api_role_get_all', methods: ['GET'])]
    public function getAllRoles(RoleRepository $roleRepository): Response
    {
        $roles = $roleRepository->findAll();
        $data = [];

        foreach ($roles as $role) {
            $data[] = [
                'id' => $role->getId(),
                'nom_role' => $role->getNomRole(),
                'description_role' => $role->getDescriptionRole(),
            ];
        }

        return $this->json($data);
    }

    #[Route('', name: 'api_role_create', methods: ['POST'])]
    public function createRole(Request $request, EntityManagerInterface $em): Response
    {
        $data = json_decode($request->getContent(), true);
    
        if (!isset($data['nom_role']) || empty($data['nom_role'])) {
            return $this->json(['error' => 'nom_role is required'], Response::HTTP_BAD_REQUEST);
        }
    
        $role = new Role();
        $role->setNomRole($data['nom_role']);
        $role->setDescriptionRole($data['description_role'] ?? null);
    
        $em->persist($role);
        $em->flush();
    
        return $this->json([
            'id' => $role->getId(),
            'nom_role' => $role->getNomRole(),
            'description_role' => $role->getDescriptionRole(),
        ], Response::HTTP_CREATED);
    }
    
    #[Route('/{id}', name: 'api_role_get_one', methods: ['GET'])]
    public function getRoleById(Role $role): Response
    {
        return $this->json([
            'id' => $role->getId(),
            'nom_role' => $role->getNomRole(),
            'description_role' => $role->getDescriptionRole(),
        ]);
    }

    #[Route('/{id}', name: 'api_role_update', methods: ['PUT', 'PATCH'])]
public function updateRole(Request $request, Role $role, EntityManagerInterface $em): Response
{
    $data = json_decode($request->getContent(), true);

    if (isset($data['nom_role'])) {
        $role->setNomRole($data['nom_role']);
    }

    if (isset($data['description_role'])) {
        $role->setDescriptionRole($data['description_role']);
    }

    $em->flush();

    // Retourner le rôle mis à jour
    return $this->json([
        'id' => $role->getId(),
        'nom_role' => $role->getNomRole(),
        'description_role' => $role->getDescriptionRole(),
    ]);
}


    #[Route('/{id}', name: 'api_role_delete', methods: ['DELETE'])]
    public function deleteRole(Role $role, EntityManagerInterface $em): Response
    {
        $em->remove($role);
        $em->flush();

        return $this->json([
            'message' => 'Role deleted successfully',
        ]);
    }
}
