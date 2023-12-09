# Projet d'Authentification Complet avec Gestion de Fichiers

Ce projet propose un système d'authentification complet avec les fonctionnalités de login, logout, gestion des OTP (One-Time Password), enregistrement (register), réinitialisation de mot de passe (reset password), ainsi que des fonctionnalités avancées d'upload et de récupération de fichiers. Il utilise les technologies Redis, JWT (JSON Web Token), MongoDB pour la gestion des utilisateurs, et offre une solution complète et sécurisée.

## Fonctionnalités

- **Login:** Les utilisateurs peuvent se connecter en fournissant leurs informations d'identification. Le système utilise JWT pour générer des jetons d'authentification sécurisés.

- **Logout:** Les utilisateurs peuvent se déconnecter, invalidant ainsi leur jeton d'authentification.

- **OTP (One-Time Password):** Un mécanisme de jeton à usage unique est mis en place pour renforcer la sécurité du processus d'authentification.

- **Register:** Les nouveaux utilisateurs peuvent s'inscrire en fournissant les informations nécessaires. Les données sont stockées de manière sécurisée dans une base de données MongoDB.

- **Forget Password:** Les utilisateurs peuvent demander une réinitialisation de mot de passe en fournissant leur adresse e-mail. Un e-mail contenant un lien sécurisé est envoyé pour permettre la réinitialisation du mot de passe.

- **Reset Password:** Les utilisateurs peuvent réinitialiser leur mot de passe en suivant le lien envoyé par e-mail. Le nouveau mot de passe est stocké de manière sécurisée dans la base de données.

- **Upload de Fichiers:** Les utilisateurs peuvent téléverser des fichiers en toute sécurité. Les fichiers sont stockés de manière persistante et liés à chaque utilisateur.

- **Récupération de Fichiers:** Les utilisateurs peuvent récupérer leurs fichiers précédemment téléchargés.

## Technologies Utilisées

- **Redis:** Le système utilise Redis pour gérer les jetons OTP, maintenir une liste noire des jetons invalides, et stocker les demandes de réinitialisation de mot de passe.

- **JWT (JSON Web Token):** Les jetons JWT sont utilisés pour sécuriser les sessions d'authentification.

- **MongoDB:** La base de données MongoDB est utilisée pour stocker les informations des utilisateurs et des fichiers de manière persistante.

## Configuration

Assurez-vous de configurer les variables d'environnement appropriées, telles que les clés secrètes JWT, les informations de connexion à la base de données MongoDB, les paramètres de connexion Redis, etc.

## Installation

1. Clonez ce dépôt sur votre machine locale.
   ```bash
   git clone https://github.com/fless-lab/authentification-complet.git
   ```

2. Installez les dépendances.
   ```bash
   npm install
   ```

3. Configurez les variables d'environnement.
   ```bash
   cp .env.example .env
   ```

   Modifiez le fichier `.env` avec vos paramètres spécifiques.

4. Démarrez l'application.
   ```bash
   npm start
   ```

## Vidéo de Démo

Pour visualiser une démo du projet, veuillez consulter [ce lien vers la vidéo de démonstration](https://www.youtube.com/watch?v=jhqGSjTttro).

N'hésitez pas à contribuer, signaler des problèmes ou améliorer ce projet. Merci et profitez d'une authentification sécurisée et complète avec gestion avancée de fichiers !