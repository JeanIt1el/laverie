<?php

namespace App\Controller;

use App\Entity\Client;
use App\Repository\ClientRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/client')]
final class ClientController extends AbstractController
{
    #[Route('', name: 'api_client_get_all', methods: ['GET'])]
    public function getAllClients(ClientRepository $clientRepository): Response
    {
        $clients = $clientRepository->findAll();
        $data = [];

        foreach ($clients as $client) {
            $data[] = [
                'id' => $client->getId(),
                'nom_client' => $client->getNomClient(),
                'prenom_client' => $client->getPrenomClient(),
                'email_client' => $client->getEmailClient(),
                'phone_client' => $client->getPhoneClient(),
                'adresse_client' => $client->getAdresseClient(),
            ];
        }

        return $this->json($data);
    }

    #[Route('', name: 'api_client_create', methods: ['POST'])]
    public function createClient(Request $request, EntityManagerInterface $em): Response
    {
        $data = json_decode($request->getContent(), true);
    
        // Validation des champs requis
        if (!isset($data['nom_client']) || empty($data['nom_client'])) {
            return $this->json(['error' => 'nom_client is required'], Response::HTTP_BAD_REQUEST);
        }
    
        if (!isset($data['prenom_client']) || empty($data['prenom_client'])) {
            return $this->json(['error' => 'prenom_client is required'], Response::HTTP_BAD_REQUEST);
        }
    
        if (!isset($data['email_client']) || empty($data['email_client'])) {
            return $this->json(['error' => 'email_client is required'], Response::HTTP_BAD_REQUEST);
        }
    
        if (!isset($data['phone_client']) || empty($data['phone_client'])) {
            return $this->json(['error' => 'phone_client is required'], Response::HTTP_BAD_REQUEST);
        }
    
        if (!isset($data['adresse_client']) || empty($data['adresse_client'])) {
            return $this->json(['error' => 'adresse_client is required'], Response::HTTP_BAD_REQUEST);
        }
    
        $client = new Client();
        $client->setNomClient($data['nom_client']);
        $client->setPrenomClient($data['prenom_client']);
        $client->setEmailClient($data['email_client']);
        $client->setPhoneClient($data['phone_client']);
        $client->setAdresseClient($data['adresse_client']);
    
        $em->persist($client);
        $em->flush();
    
        return $this->json([
            'id' => $client->getId(),
            'nom_client' => $client->getNomClient(),
            'prenom_client' => $client->getPrenomClient(),
            'email_client' => $client->getEmailClient(),
            'phone_client' => $client->getPhoneClient(),
            'adresse_client' => $client->getAdresseClient(),
        ], Response::HTTP_CREATED);
    }
    
    // zone de recuperation un element 
    #[Route('/{id}', name: 'api_client_get_one', methods: ['GET'])]
    public function getClientById(Client $client): Response
    {
        return $this->json([
            'id' => $client->getId(),
            'nom_client' => $client->getNomClient(),
            'prenom_client' => $client->getPrenomClient(),
            'email_client' => $client->getEmailClient(),
            'phone_client' => $client->getPhoneClient(),
            'adresse_client' => $client->getAdresseClient(),
        ]);
    }

    // zone de modification
    #[Route('/{id}', name: 'api_client_update', methods: ['PUT', 'PATCH'])]
    public function updateClient(Request $request, Client $client, EntityManagerInterface $em): Response
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['nom_client'])) {
            $client->setNomClient($data['nom_client']);
        }

        if (isset($data['prenom_client'])) {
            $client->setPrenomClient($data['prenom_client']);
        }

        if (isset($data['email_client'])) {
            $client->setEmailClient($data['email_client']);
        }

        if (isset($data['phone_client'])) {
            $client->setPhoneClient($data['phone_client']);
        }

        if (isset($data['adresse_client'])) {
            $client->setAdresseClient($data['adresse_client']);
        }

        $em->flush();

        // Retourner le client mis à jour
        return $this->json([
            'id' => $client->getId(),
            'nom_client' => $client->getNomClient(),
            'prenom_client' => $client->getPrenomClient(),
            'email_client' => $client->getEmailClient(),
            'phone_client' => $client->getPhoneClient(),
            'adresse_client' => $client->getAdresseClient(),
        ]);
    }


    // zone de suppression 
    #[Route('/{id}', name: 'api_client_delete', methods: ['DELETE'])]
    public function deleteClient(Client $client, EntityManagerInterface $em): Response
    {
        $em->remove($client);
        $em->flush();

        return $this->json([
            'message' => 'Client deleted successfully',
        ]);
    }
}