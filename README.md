# Générateur JWT pour Zendesk

Ce projet permet d'implémenter l'authentification JWT pour le widget Zendesk Messaging dans votre Centre d'Aide.

## Installation

1. Ouvrez votre thème Zendesk Guide et accédez à l'éditeur de code
   1. https://support.zendesk.com/hc/en-us/articles/4408832558874-Editing-the-code-for-your-live-help-center-theme
2. Localisez le fichier `document_head.hdbs`
3. Copiez le contenu du fichier `src/zendesk-widget.html` et collez-le à la fin de votre fichier `document_head.hdbs`

## Fonctionnement

Une fois installé, le widget s'authentifiera automatiquement lorsqu'un utilisateur se connecte à votre Centre d'Aide. Le système :

1. Détecte si l'utilisateur est connecté
2. Récupère les informations de l'utilisateur via l'API Zendesk
3. Génère un token JWT via votre endpoint
4. Authentifie le widget de messagerie avec le token généré

## Configuration

Assurez-vous de remplacer `https://your.server.endpoint` par l'URL de votre worker qui génère les tokens JWT.

## Support

Pour toute question ou problème, veuillez ouvrir une issue dans ce dépôt.