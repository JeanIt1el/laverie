
# 🧼 Laverie - Application de gestion de laverie avec Symfony

Ce projet est une application web développée avec **Symfony 6**, permettant la gestion complète d’une laverie : clients, employés, services, réservations, paiements, pointage du personnel, etc.

---

## 🚀 Fonctionnalités principales

- Gestion des **clients**
- Gestion des **réservations** avec ajout de services
- Suivi des **paiements** (espèces ou mobile money)
- Gestion des **services** proposés par la laverie
- Système de **pointage** pour les employés
- Attribution de **rôles** et permissions
- Génération de **fausses données** pour tests via fixtures
- Utilisation de **Faker** pour simuler des données réalistes

---

## 🛠️ Prérequis

- PHP >= 8.1
- Composer
- MySQL (via WAMP ou autre)
- Symfony CLI (optionnel)
- Navigateur web
- Accès à phpMyAdmin recommandé

---

## ⚙️ Installation

### 1. Cloner le dépôt

git clone https://github.com/Hajatiana-0407/Laverie.git
cd Laverie

### 2. Installer les dépendances PHP

composer install

### 3. Configurer la base de données

Crée un fichier `.env.local` et configure la variable `DATABASE_URL` :

DATABASE_URL="mysql://root:@127.0.0.1:3306/laverie"

Puis exécute :

php bin/console doctrine:database:create
php bin/console doctrine:schema:update --force

---

## 🔄 Générer des fausses données (fixtures)

php bin/console doctrine:fixtures:load

⚠️ Toutes les données existantes seront supprimées.

---

## 📊 Exemple d'entités

### ✳️ Client

- id
- nom
- prenom
- telephone
- email

### ✳️ Employé

- id
- nom
- poste
- date_embauche

### ✳️ Service

- id
- nom
- prix

### ✳️ Réservation

- id
- client_id (relation)
- date_reservation
- statut

### ✳️ Paiement

- id
- montant
- client_id (relation)
- mode_paiement_id (relation)
- date_paiement

### ✳️ Pointage

- id
- employe_id (relation)
- date
- heure_arrivee
- heure_depart

---

## 🧪 Exemple de commandes utiles

### Lancer le serveur Symfony

symfony serve

Ou avec PHP intégré :

php -S localhost:8000 -t public

Accès : http://localhost:8000

---

## 🗃️ Structure du projet

src/
├── Controller/         # Contrôleurs Symfony
├── Entity/             # Entités Doctrine
├── Repository/         # Requêtes custom
├── DataFixtures/       # Fausses données pour test
templates/              # Vues Twig
config/                 # Fichiers de config
public/                 # Point d’entrée du site (index.php)

---

## 🧠 Développeurs

- 👤 @Hajatiana-0407
- 👤 @Fabrice Faniry RANDT


