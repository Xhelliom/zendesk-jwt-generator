# Générateur JWT pour Zendesk

Ce projet permet d'implémenter l'authentification JWT pour le widget Zendesk Messaging dans votre Centre d'Aide.

## Installation

1. Ouvrez votre thème Zendesk Guide et accédez à l'éditeur de code
2. Localisez le fichier `document_head.hdbs`
3. Ajoutez le code suivant à la fin du fichier :

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
{{#if signed_in}}
<script type="text/javascript">
  console.log("Utilisateur connecté");

  // Récupération des informations de l'utilisateur courant
  var user = [];
  $.ajax({
    url: '/api/v2/users/me',
    async: false,
    dataType: 'json',
    success: function (json) {
      user = json;
    }
  });

  // Obtention du token pour l'utilisateur courant
  var jwttoken = '';
  $.ajax({
    type: "POST",
    url: 'https://your.server.endpoint', // Remplacez par l'URL de votre worker
    data: JSON.stringify({
      "external_id": user.user.id,
      "user_email": user.user.email, 
      "user_name": user.user.name
    }),
    dataType: 'text',
    async: false,
    success: function (json) {
      jwttoken = json;
    }
  });
  console.log(jwttoken);

  // Authentification de la messagerie
  zE('messenger', 'loginUser', function (callback) {
    callback(jwttoken);
  });
</script>
{{else}}
<script>
  console.log("Utilisateur déconnecté");
  zE('messenger', 'logoutUser');
</script>
{{/if}}
```

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