# Générateur JWT pour Zendesk

Ce projet permet d'implémenter l'authentification JWT pour le widget Zendesk Messaging dans votre Centre d'Aide. Il a été inspiré par les travaux de [Thomas Verschoren](https://internalnote.com/jwt-messaging) et son dépôt [zendesk_widget](https://github.com/verschoren/zendesk_widget).

## Prérequis

- Un compte Zendesk avec accès au Centre d'Aide
- Les identifiants de votre application Zendesk Messaging :
  - MESSAGING_APP_ID
  - MESSAGING_SECRET

## Installation

1. Ouvrez votre thème Zendesk Guide et accédez à l'éditeur de code
   1. https://support.zendesk.com/hc/en-us/articles/4408832558874-Editing-the-code-for-your-live-help-center-theme
2. Localisez le fichier `document_head.hdbs`
3. Copiez le contenu du fichier `src/zendesk-widget.html` et collez-le à la fin de votre fichier `document_head.hdbs`

## Configuration

### Variables d'environnement

Le service nécessite deux variables d'environnement :

```bash
MESSAGING_APP_ID=votre_app_id
MESSAGING_SECRET=votre_secret
```

### Déploiement avec Docker

1. Construire l'image :
```bash
docker build -t zendesk-jwt .
```

2. Lancer le container :
```bash
docker run -e MESSAGING_SECRET=votre_secret -e MESSAGING_APP_ID=votre_app_id -p 3000:3000 zendesk-jwt
```

### Configuration du widget

Dans le fichier `src/zendesk-widget.html`, remplacez :
```javascript
url: 'https://your.server.endpoint'
```
par l'URL de votre service déployé.

## Fonctionnement

Une fois installé, le widget s'authentifiera automatiquement lorsqu'un utilisateur se connecte à votre Centre d'Aide. Le système :

1. Détecte si l'utilisateur est connecté
2. Récupère les informations de l'utilisateur via l'API Zendesk
3. Génère un token JWT via votre endpoint
4. Authentifie le widget de messagerie avec le token généré

### Structure du JWT

Le token généré contient :
```json
{
    "alg": "HS256",
    "typ": "JWT",
    "kid": "votre_app_id"
}
{
    "scope": "user",
    "name": "nom_utilisateur",
    "email": "email@utilisateur.com",
    "exp": timestamp_expiration,
    "external_id": "id_utilisateur",
    "email_verified": true
}
```

## Sécurité

- Les variables d'environnement sensibles ne sont jamais stockées dans l'image Docker
- Le secret n'est jamais affiché dans les logs
- Les tokens JWT expirent après 24 heures
- L'authentification est requise pour accéder au service

## Support

Pour toute question ou problème, veuillez ouvrir une issue dans ce dépôt.

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## Crédits

Ce projet a été inspiré par :
- [Authenticate Zendesk Messaging](https://internalnote.com/jwt-messaging) par Thomas Verschoren
- [zendesk_widget](https://github.com/verschoren/zendesk_widget) par Thomas Verschoren