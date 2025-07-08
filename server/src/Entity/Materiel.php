<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\MaterielRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MaterielRepository::class)]
#[ApiResource]
class Materiel
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nom_materiel = null;

    #[ORM\Column(length: 100)]
    private ?string $type_materiel = null;

    #[ORM\Column(length: 100)]
    private ?string $etat_materiel = null;

    #[ORM\Column]
    private ?int $quantite = null;

    #[ORM\ManyToOne(inversedBy: 'materiels')]
    private ?Service $service = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_At = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNomMateriel(): ?string
    {
        return $this->nom_materiel;
    }

    public function setNomMateriel(string $nom_materiel): static
    {
        $this->nom_materiel = $nom_materiel;

        return $this;
    }

    public function getTypeMateriel(): ?string
    {
        return $this->type_materiel;
    }

    public function setTypeMateriel(string $type_materiel): static
    {
        $this->type_materiel = $type_materiel;

        return $this;
    }

    public function getEtatMateriel(): ?string
    {
        return $this->etat_materiel;
    }

    public function setEtatMateriel(string $etat_materiel): static
    {
        $this->etat_materiel = $etat_materiel;

        return $this;
    }

    public function getQuantite(): ?int
    {
        return $this->quantite;
    }

    public function setQuantite(int $quantite): static
    {
        $this->quantite = $quantite;

        return $this;
    }

    public function getService(): ?Service
    {
        return $this->service;
    }

    public function setService(?Service $service): static
    {
        $this->service = $service;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_At;
    }

    public function setCreatedAt(\DateTimeImmutable $created_At): static
    {
        $this->created_At = $created_At;

        return $this;
    }
}
