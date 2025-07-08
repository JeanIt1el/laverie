<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250708081643 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE employe (id INT AUTO_INCREMENT NOT NULL, service_id INT DEFAULT NULL, role_id INT DEFAULT NULL, nom VARCHAR(255) NOT NULL, prenoms VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, phone INT NOT NULL, cin VARCHAR(100) NOT NULL, INDEX IDX_F804D3B9ED5CA9E6 (service_id), INDEX IDX_F804D3B9D60322AC (role_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE materiel (id INT AUTO_INCREMENT NOT NULL, service_id INT DEFAULT NULL, nom_materiel VARCHAR(255) NOT NULL, type_materiel VARCHAR(100) NOT NULL, etat_materiel VARCHAR(100) NOT NULL, quantite INT NOT NULL, INDEX IDX_18D2B091ED5CA9E6 (service_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE pointage (id INT AUTO_INCREMENT NOT NULL, employe_id INT DEFAULT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', heure_debut DATETIME NOT NULL, heure_fin DATETIME NOT NULL, remarque VARCHAR(255) DEFAULT NULL, INDEX IDX_7591B201B65292 (employe_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE role (id INT AUTO_INCREMENT NOT NULL, nom_role VARCHAR(100) NOT NULL, description_role VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE service (id INT AUTO_INCREMENT NOT NULL, denomination VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, prix DOUBLE PRECISION NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE service_reservation (service_id INT NOT NULL, reservation_id INT NOT NULL, INDEX IDX_8E526FF9ED5CA9E6 (service_id), INDEX IDX_8E526FF9B83297E7 (reservation_id), PRIMARY KEY(service_id, reservation_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE employe ADD CONSTRAINT FK_F804D3B9ED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id)');
        $this->addSql('ALTER TABLE employe ADD CONSTRAINT FK_F804D3B9D60322AC FOREIGN KEY (role_id) REFERENCES role (id)');
        $this->addSql('ALTER TABLE materiel ADD CONSTRAINT FK_18D2B091ED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id)');
        $this->addSql('ALTER TABLE pointage ADD CONSTRAINT FK_7591B201B65292 FOREIGN KEY (employe_id) REFERENCES employe (id)');
        $this->addSql('ALTER TABLE service_reservation ADD CONSTRAINT FK_8E526FF9ED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE service_reservation ADD CONSTRAINT FK_8E526FF9B83297E7 FOREIGN KEY (reservation_id) REFERENCES reservation (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE employe DROP FOREIGN KEY FK_F804D3B9ED5CA9E6');
        $this->addSql('ALTER TABLE employe DROP FOREIGN KEY FK_F804D3B9D60322AC');
        $this->addSql('ALTER TABLE materiel DROP FOREIGN KEY FK_18D2B091ED5CA9E6');
        $this->addSql('ALTER TABLE pointage DROP FOREIGN KEY FK_7591B201B65292');
        $this->addSql('ALTER TABLE service_reservation DROP FOREIGN KEY FK_8E526FF9ED5CA9E6');
        $this->addSql('ALTER TABLE service_reservation DROP FOREIGN KEY FK_8E526FF9B83297E7');
        $this->addSql('DROP TABLE employe');
        $this->addSql('DROP TABLE materiel');
        $this->addSql('DROP TABLE pointage');
        $this->addSql('DROP TABLE role');
        $this->addSql('DROP TABLE service');
        $this->addSql('DROP TABLE service_reservation');
    }
}
