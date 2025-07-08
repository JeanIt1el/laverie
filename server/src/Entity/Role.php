<?php

namespace App\Entity;

use App\Repository\RoleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RoleRepository::class)]
class Role
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    private ?string $nom_role = null;

    #[ORM\Column(length: 255)]
    private ?string $description_role = null;

    /**
     * @var Collection<int, Employe>
     */
    #[ORM\OneToMany(targetEntity: Employe::class, mappedBy: 'role')]
    private Collection $emploie;

    public function __construct()
    {
        $this->emploie = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNomRole(): ?string
    {
        return $this->nom_role;
    }

    public function setNomRole(string $nom_role): static
    {
        $this->nom_role = $nom_role;

        return $this;
    }

    public function getDescriptionRole(): ?string
    {
        return $this->description_role;
    }

    public function setDescriptionRole(string $description_role): static
    {
        $this->description_role = $description_role;

        return $this;
    }

    /**
     * @return Collection<int, Employe>
     */
    public function getEmploie(): Collection
    {
        return $this->emploie;
    }

    public function addEmploie(Employe $emploie): static
    {
        if (!$this->emploie->contains($emploie)) {
            $this->emploie->add($emploie);
            $emploie->setRole($this);
        }

        return $this;
    }

    public function removeEmploie(Employe $emploie): static
    {
        if ($this->emploie->removeElement($emploie)) {
            // set the owning side to null (unless already changed)
            if ($emploie->getRole() === $this) {
                $emploie->setRole(null);
            }
        }

        return $this;
    }
}
