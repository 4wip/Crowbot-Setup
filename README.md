Discord: https://dsc.gg/4wip


Créer un bot
```
･ Rendez-vous sur le site : https://discord.com/developers/applications
･ Cliquez sur "Nouvelle Application"
･ Dans l'onglet "Bot", cochez les 3 "Privileged Gateway Intents" (Presence, Server, Message Content).
･ Réinitialisez le token et garder le (donner à personne).
Pour inviter le bot
･ Allez dans l'onglet "Oauth2", puis dans "OAuth2 URL Generator", cochez "bot" et "administrator".
･ Copiez et collez l'URL générée dans un autre onglet.
```

L'héberger sur son PC
```
Prérequis:
Assurez-vous d'avoir Node.js 16.20.0: https://nodejs.org/en/blog/release/v16.20.0
Avoir le dossier avec le bot: https://github.com/4wip/Crowbot-Setup/archive/refs/heads/main.zip

Configuration:
Pour mettre le token, aller dans le dossier util et ouvrez login.js
Vous voyez client.login("Mettre votre token ici.");  remplacer votre token (exemple: client.login("MTMyNDMMMM");  )

Allez dans config.json :
{
    "color": "#2B2D31", // Couleur des embeds (la ligne à gauche quand tu fait +help)- https://htmlcolorcodes.com/
    "prefix": "+", // Préfixe du bot, met ce que tu veux. (c'est pour faire les commandes exemple: +help +ban)
    "name": "CrowBot Remade", // Le petit texte tout en dessous de l'embed
    "defaultjoinmessage": "{user} vient de rejoindre. Il a été invité par **{inviter:name}** qui a désormais **{invite} invitations** !", // Modifiable
    "defaultleavemessage": "{user} vient de quitter. Il avait été invité par **{inviter:name}** qui a désormais **{invite} invitations** ", // Modifiable
    "defaultLevelmessage": "**{user}** vient de passer au niveau **{level}**. Bravo à lui !", // Modifiable
        "owner": [  // ID des owners du bot
        "1208337813339373569", 
        "1208337813339373569",
        ""
    ]
}

Lancement du bot:
Ouvrez un terminal
Tapez "npm i" (à faire qu'une fois)
Pour lancer le bot à chaque fois, tapez "node index.js"
```

### Crédit
```
https://github.com/whoisbaby/CrowBot-Remade
```
