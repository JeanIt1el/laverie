<?php

namespace App\DataFixtures;

use App\Entity\Client;
use App\Entity\Employe;
use App\Entity\Materiel;
use App\Entity\Role;
use App\Entity\Service;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use DateTimeImmutable;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        // === ROLE ===
        $roles = [];
        foreach (['Admin', 'Employé', 'Manager'] as $roleName) {
            $role = new Role();
            $role->setNomRole($roleName);
            $role->setDescriptionRole("Rôle de $roleName");
            $manager->persist($role);
            $roles[] = $role;
        }

        // === SERVICE ===
        $services = [];
        for ($i = 0; $i < 5; $i++) {
            $service = new Service();
            $service->setDenomination($faker->word());
            $service->setDescription($faker->sentence());
            $service->setPrix($faker->randomFloat(2, 10, 200));
            $service->setCreatedAt(new DateTimeImmutable());
            $manager->persist($service);
            $services[] = $service;
        }

        // === CLIENT ===
        $clients = [];
        for ($i = 0; $i < 20; $i++) {
            $client = new Client();
            $client->setNomClient($faker->lastName());
            $client->setPrenomClient($faker->firstName());
            $client->setEmailClient($faker->unique()->safeEmail());
            $client->setPhoneClient($faker->phoneNumber());
            $client->setAdresseClient($faker->address());
            $manager->persist($client);
            $clients[] = $client;
        }

        // === EMPLOYE ===
        for ($i = 0; $i < 10; $i++) {
            $employe = new Employe();
            $employe->setNom($faker->lastName());
            $employe->setPrenoms($faker->firstName());
            $employe->setEmail($faker->unique()->safeEmail());
            $employe->setPhone($faker->numberBetween(32000000, 39999999));
            $employe->setCin($faker->unique()->numerify('##########'));
            $employe->setCreatedAt(new DateTimeImmutable());
            $employe->setService($faker->randomElement($services));
            $employe->setRole($faker->randomElement($roles));
            $manager->persist($employe);
        }

        // === MATERIEL ===
        for ($i = 0; $i < 15; $i++) {
            $materiel = new Materiel();
            $materiel->setNomMateriel($faker->word());
            $materiel->setTypeMateriel($faker->randomElement(['Machine', 'Accessoire', 'Produit']));
            $materiel->setEtatMateriel($faker->randomElement(['Neuf', 'Usagé', 'En panne']));
            $materiel->setQuantite($faker->numberBetween(1, 20));
            $materiel->setCreatedAt(new DateTimeImmutable());
            $materiel->setService($faker->randomElement($services));
            $manager->persist($materiel);
        }

        $manager->flush();
    }
}
