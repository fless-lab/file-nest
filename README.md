# File Nest - Serveur de Gestion de Fichiers

Bienvenue dans File Nest, un serveur de gestion de fichiers développé en utilisant Node.js, Express, MongoDB et l'authentification HMAC pour des opérations sécurisées.

## Table des matières

- [Introduction](#introduction)
- [Fonctionnalités](#fonctionnalités)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Routes API](#routes-api)
- [Authentification HMAC](#authentification-hmac)
- [Contributions](#contributions)
- [Licence](#licence)

## Introduction

Le serveur File Nest est conçu pour offrir un stockage sécurisé et centralisé des fichiers, accessible via une API RESTful. Il permet le stockage, la récupération et la suppression de fichiers tout en garantissant la sécurité via l'authentification HMAC.

## Fonctionnalités

- Stockage centralisé des fichiers.
- Authentification sécurisée via HMAC.
- API RESTful pour des opérations simples.
- Prise en charge de grands volumes de stockage et de requêtes.
- Utilisation de Node.js et MongoDB pour la rapidité et la flexibilité.

## Prérequis

Assure-toi d'avoir installé les éléments suivants sur ta machine :

- Node.js
- MongoDB

## Installation

1. Clone le dépôt : `git clone https://github.com/tonpseudo/file-nest.git`
2. Accède au répertoire : `cd file-nest`
3. Installe les dépendances : `npm install`

## Configuration

Crée un fichier `.env` à la racine du projet avec les configurations suivantes :

```makefile
PORT=9330
MONGODB_URI=mongodb://localhost:27017/file-nest
HMAC_SECRET=yourHmacSecret
GARBAGE_COLLECTION_INTERVAL=86400000 # Nettoyage automatique quotidien (en millisecondes)
```

## Utilisation

Lance l'application : `npm start`
L'application est maintenant accessible sur [http://localhost:9330](http://localhost:9330)

## Routes API

- **POST /files** : Télécharge un fichier.
- **GET /files/:id** : Récupère un fichier.
- **DELETE /files/:id** : Supprime un fichier.
- **GET /metadata/:id** : Récupère les métadonnées d'un fichier.

## Authentification HMAC

L'authentification HMAC est utilisée pour garantir la sécurité des opérations. Assure-toi d'utiliser la clé secrète HMAC spécifiée dans le fichier `.env`.

## Suppression Logique des Fichiers

File Nest prend en charge la suppression logique des fichiers. Les fichiers supprimés ne sont pas immédiatement retirés, mais sont marqués pour suppression. 
Le nettoyage automatique des fichiers marqués est effectué périodiquement.
- **GARBAGE_COLLECTION_INTERVAL** : Fréquence du nettoyage automatique des fichiers marqués (par défaut : quotidien).

## Contributions

Les contributions sont les bienvenues ! Pour contribuer, suivez ces étapes :

1. Fork du projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/NouvelleFonctionnalite`)
3. Commit de vos changements (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/NouvelleFonctionnalite`)
5. Créez une Pull Request

Merci de contribuer à File Nest !

## Licence

Ce projet est sous licence [MIT](LICENSE).