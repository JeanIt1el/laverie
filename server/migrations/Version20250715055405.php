<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250715055405 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE reservation_materiel (reservation_id INT NOT NULL, materiel_id INT NOT NULL, INDEX IDX_85675285B83297E7 (reservation_id), INDEX IDX_8567528516880AAF (materiel_id), PRIMARY KEY(reservation_id, materiel_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `user` (id INT AUTO_INCREMENT NOT NULL, employe_id INT DEFAULT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D6491B65292 (employe_id), UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE reservation_materiel ADD CONSTRAINT FK_85675285B83297E7 FOREIGN KEY (reservation_id) REFERENCES reservation (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE reservation_materiel ADD CONSTRAINT FK_8567528516880AAF FOREIGN KEY (materiel_id) REFERENCES materiel (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE `user` ADD CONSTRAINT FK_8D93D6491B65292 FOREIGN KEY (employe_id) REFERENCES employe (id)');
        $this->addSql('ALTER TABLE employe ADD reservation_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE employe ADD CONSTRAINT FK_F804D3B9B83297E7 FOREIGN KEY (reservation_id) REFERENCES reservation (id)');
        $this->addSql('CREATE INDEX IDX_F804D3B9B83297E7 ON employe (reservation_id)');
        $this->addSql('ALTER TABLE pointage CHANGE remarque remarque VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE reservation ADD lieu_nettoyage VARCHAR(255) NOT NULL, ADD heures_nettoyage TIME NOT NULL, ADD date_nettoyage DATETIME NOT NULL, ADD charge VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE messenger_messages CHANGE delivered_at delivered_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\'');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reservation_materiel DROP FOREIGN KEY FK_85675285B83297E7');
        $this->addSql('ALTER TABLE reservation_materiel DROP FOREIGN KEY FK_8567528516880AAF');
        $this->addSql('ALTER TABLE `user` DROP FOREIGN KEY FK_8D93D6491B65292');
        $this->addSql('DROP TABLE reservation_materiel');
        $this->addSql('DROP TABLE `user`');
        $this->addSql('ALTER TABLE employe DROP FOREIGN KEY FK_F804D3B9B83297E7');
        $this->addSql('DROP INDEX IDX_F804D3B9B83297E7 ON employe');
        $this->addSql('ALTER TABLE employe DROP reservation_id');
        $this->addSql('ALTER TABLE messenger_messages CHANGE delivered_at delivered_at DATETIME DEFAULT \'NULL\' COMMENT \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE pointage CHANGE remarque remarque VARCHAR(255) DEFAULT \'NULL\'');
        $this->addSql('ALTER TABLE reservation DROP lieu_nettoyage, DROP heures_nettoyage, DROP date_nettoyage, DROP charge');
    }
}
