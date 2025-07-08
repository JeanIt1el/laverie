<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250708083617 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE mode_paiement (id INT AUTO_INCREMENT NOT NULL, denomination_paie VARCHAR(100) NOT NULL, numero VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE paiement ADD mode_paiement_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE paiement ADD CONSTRAINT FK_B1DC7A1E438F5B63 FOREIGN KEY (mode_paiement_id) REFERENCES mode_paiement (id)');
        $this->addSql('CREATE INDEX IDX_B1DC7A1E438F5B63 ON paiement (mode_paiement_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE paiement DROP FOREIGN KEY FK_B1DC7A1E438F5B63');
        $this->addSql('DROP TABLE mode_paiement');
        $this->addSql('DROP INDEX IDX_B1DC7A1E438F5B63 ON paiement');
        $this->addSql('ALTER TABLE paiement DROP mode_paiement_id');
    }
}
