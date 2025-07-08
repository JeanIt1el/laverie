<?php

namespace App\Entity;

use App\Repository\ModePaiementRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ModePaiementRepository::class)]
class ModePaiement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    private ?string $denomination_paie = null;

    #[ORM\Column(length: 255)]
    private ?string $numero = null;

    /**
     * @var Collection<int, Paiement>
     */
    #[ORM\OneToMany(targetEntity: Paiement::class, mappedBy: 'modePaiement')]
    private Collection $paiement;

    public function __construct()
    {
        $this->paiement = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDenominationPaie(): ?string
    {
        return $this->denomination_paie;
    }

    public function setDenominationPaie(string $denomination_paie): static
    {
        $this->denomination_paie = $denomination_paie;

        return $this;
    }

    public function getNumero(): ?string
    {
        return $this->numero;
    }

    public function setNumero(string $numero): static
    {
        $this->numero = $numero;

        return $this;
    }

    /**
     * @return Collection<int, Paiement>
     */
    public function getPaiement(): Collection
    {
        return $this->paiement;
    }

    public function addPaiement(Paiement $paiement): static
    {
        if (!$this->paiement->contains($paiement)) {
            $this->paiement->add($paiement);
            $paiement->setModePaiement($this);
        }

        return $this;
    }

    public function removePaiement(Paiement $paiement): static
    {
        if ($this->paiement->removeElement($paiement)) {
            // set the owning side to null (unless already changed)
            if ($paiement->getModePaiement() === $this) {
                $paiement->setModePaiement(null);
            }
        }

        return $this;
    }
}
