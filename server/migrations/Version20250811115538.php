<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250811115538 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE client_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE employe_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE materiel_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE mode_paiement_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE paiement_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE pointage_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE reservation_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE role_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE service_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE client (id INT NOT NULL, nom_client VARCHAR(255) NOT NULL, prenom_client VARCHAR(100) NOT NULL, email_client VARCHAR(255) NOT NULL, phone_client VARCHAR(20) NOT NULL, adresse_client VARCHAR(100) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE employe (id INT NOT NULL, role_id INT DEFAULT NULL, nom VARCHAR(255) NOT NULL, prenoms VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, phone VARCHAR(25) NOT NULL, cin VARCHAR(100) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_F804D3B9D60322AC ON employe (role_id)');
        $this->addSql('COMMENT ON COLUMN employe.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE employe_service (employe_id INT NOT NULL, service_id INT NOT NULL, PRIMARY KEY(employe_id, service_id))');
        $this->addSql('CREATE INDEX IDX_2592F6711B65292 ON employe_service (employe_id)');
        $this->addSql('CREATE INDEX IDX_2592F671ED5CA9E6 ON employe_service (service_id)');
        $this->addSql('CREATE TABLE materiel (id INT NOT NULL, service_id INT DEFAULT NULL, nom_materiel VARCHAR(255) NOT NULL, type_materiel VARCHAR(100) NOT NULL, etat_materiel VARCHAR(100) NOT NULL, quantite INT NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_18D2B091ED5CA9E6 ON materiel (service_id)');
        $this->addSql('COMMENT ON COLUMN materiel.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE mode_paiement (id INT NOT NULL, denomination_paie VARCHAR(100) NOT NULL, numero VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE paiement (id INT NOT NULL, reservation_id INT NOT NULL, mode_paiement_id INT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, montant DOUBLE PRECISION NOT NULL, status VARCHAR(100) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_B1DC7A1EB83297E7 ON paiement (reservation_id)');
        $this->addSql('CREATE INDEX IDX_B1DC7A1E438F5B63 ON paiement (mode_paiement_id)');
        $this->addSql('COMMENT ON COLUMN paiement.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE pointage (id INT NOT NULL, employe_id INT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, heure_debut TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, heure_fin TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, remarque VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_7591B201B65292 ON pointage (employe_id)');
        $this->addSql('COMMENT ON COLUMN pointage.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE reservation (id INT NOT NULL, client_id INT NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, statut_reservation VARCHAR(255) NOT NULL, montant_total DOUBLE PRECISION NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_42C8495519EB6921 ON reservation (client_id)');
        $this->addSql('COMMENT ON COLUMN reservation.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE role (id INT NOT NULL, nom_role VARCHAR(100) NOT NULL, description_role VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE service (id INT NOT NULL, denomination VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, prix DOUBLE PRECISION NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN service.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE service_reservation (service_id INT NOT NULL, reservation_id INT NOT NULL, PRIMARY KEY(service_id, reservation_id))');
        $this->addSql('CREATE INDEX IDX_8E526FF9ED5CA9E6 ON service_reservation (service_id)');
        $this->addSql('CREATE INDEX IDX_8E526FF9B83297E7 ON service_reservation (reservation_id)');
        $this->addSql('CREATE TABLE messenger_messages (id BIGSERIAL NOT NULL, body TEXT NOT NULL, headers TEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, available_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, delivered_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_75EA56E0FB7336F0 ON messenger_messages (queue_name)');
        $this->addSql('CREATE INDEX IDX_75EA56E0E3BD61CE ON messenger_messages (available_at)');
        $this->addSql('CREATE INDEX IDX_75EA56E016BA31DB ON messenger_messages (delivered_at)');
        $this->addSql('COMMENT ON COLUMN messenger_messages.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN messenger_messages.available_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN messenger_messages.delivered_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE OR REPLACE FUNCTION notify_messenger_messages() RETURNS TRIGGER AS $$
            BEGIN
                PERFORM pg_notify(\'messenger_messages\', NEW.queue_name::text);
                RETURN NEW;
            END;
        $$ LANGUAGE plpgsql;');
        $this->addSql('DROP TRIGGER IF EXISTS notify_trigger ON messenger_messages;');
        $this->addSql('CREATE TRIGGER notify_trigger AFTER INSERT OR UPDATE ON messenger_messages FOR EACH ROW EXECUTE PROCEDURE notify_messenger_messages();');
        $this->addSql('ALTER TABLE employe ADD CONSTRAINT FK_F804D3B9D60322AC FOREIGN KEY (role_id) REFERENCES role (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE employe_service ADD CONSTRAINT FK_2592F6711B65292 FOREIGN KEY (employe_id) REFERENCES employe (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE employe_service ADD CONSTRAINT FK_2592F671ED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE materiel ADD CONSTRAINT FK_18D2B091ED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE paiement ADD CONSTRAINT FK_B1DC7A1EB83297E7 FOREIGN KEY (reservation_id) REFERENCES reservation (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE paiement ADD CONSTRAINT FK_B1DC7A1E438F5B63 FOREIGN KEY (mode_paiement_id) REFERENCES mode_paiement (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE pointage ADD CONSTRAINT FK_7591B201B65292 FOREIGN KEY (employe_id) REFERENCES employe (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C8495519EB6921 FOREIGN KEY (client_id) REFERENCES client (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE service_reservation ADD CONSTRAINT FK_8E526FF9ED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE service_reservation ADD CONSTRAINT FK_8E526FF9B83297E7 FOREIGN KEY (reservation_id) REFERENCES reservation (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE client_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE employe_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE materiel_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE mode_paiement_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE paiement_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE pointage_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE reservation_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE role_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE service_id_seq CASCADE');
        $this->addSql('ALTER TABLE employe DROP CONSTRAINT FK_F804D3B9D60322AC');
        $this->addSql('ALTER TABLE employe_service DROP CONSTRAINT FK_2592F6711B65292');
        $this->addSql('ALTER TABLE employe_service DROP CONSTRAINT FK_2592F671ED5CA9E6');
        $this->addSql('ALTER TABLE materiel DROP CONSTRAINT FK_18D2B091ED5CA9E6');
        $this->addSql('ALTER TABLE paiement DROP CONSTRAINT FK_B1DC7A1EB83297E7');
        $this->addSql('ALTER TABLE paiement DROP CONSTRAINT FK_B1DC7A1E438F5B63');
        $this->addSql('ALTER TABLE pointage DROP CONSTRAINT FK_7591B201B65292');
        $this->addSql('ALTER TABLE reservation DROP CONSTRAINT FK_42C8495519EB6921');
        $this->addSql('ALTER TABLE service_reservation DROP CONSTRAINT FK_8E526FF9ED5CA9E6');
        $this->addSql('ALTER TABLE service_reservation DROP CONSTRAINT FK_8E526FF9B83297E7');
        $this->addSql('DROP TABLE client');
        $this->addSql('DROP TABLE employe');
        $this->addSql('DROP TABLE employe_service');
        $this->addSql('DROP TABLE materiel');
        $this->addSql('DROP TABLE mode_paiement');
        $this->addSql('DROP TABLE paiement');
        $this->addSql('DROP TABLE pointage');
        $this->addSql('DROP TABLE reservation');
        $this->addSql('DROP TABLE role');
        $this->addSql('DROP TABLE service');
        $this->addSql('DROP TABLE service_reservation');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
