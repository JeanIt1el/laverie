<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250721113147 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE employe_service (employe_id INT NOT NULL, service_id INT NOT NULL, INDEX IDX_2592F6711B65292 (employe_id), INDEX IDX_2592F671ED5CA9E6 (service_id), PRIMARY KEY(employe_id, service_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE employe_service ADD CONSTRAINT FK_2592F6711B65292 FOREIGN KEY (employe_id) REFERENCES employe (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE employe_service ADD CONSTRAINT FK_2592F671ED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE employe DROP FOREIGN KEY FK_F804D3B9ED5CA9E6');
        $this->addSql('DROP INDEX IDX_F804D3B9ED5CA9E6 ON employe');
        $this->addSql('ALTER TABLE employe DROP service_id');
        $this->addSql('ALTER TABLE pointage CHANGE remarque remarque VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE messenger_messages CHANGE delivered_at delivered_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\'');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE employe_service DROP FOREIGN KEY FK_2592F6711B65292');
        $this->addSql('ALTER TABLE employe_service DROP FOREIGN KEY FK_2592F671ED5CA9E6');
        $this->addSql('DROP TABLE employe_service');
        $this->addSql('ALTER TABLE employe ADD service_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE employe ADD CONSTRAINT FK_F804D3B9ED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id)');
        $this->addSql('CREATE INDEX IDX_F804D3B9ED5CA9E6 ON employe (service_id)');
        $this->addSql('ALTER TABLE messenger_messages CHANGE delivered_at delivered_at DATETIME DEFAULT \'NULL\' COMMENT \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE pointage CHANGE remarque remarque VARCHAR(255) DEFAULT \'NULL\'');
    }
}
