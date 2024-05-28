N'hésitez pas à mettre en star ce github.
```
Le bot ne mute plus les personnes qui rejoigne un serveur.
Le NSFW retiré du bot.
Etc...
```
### Setup
```
1. Créez un bot
･ Rendez-vous sur le site : https://discord.com/developers/applications
･ En haut à droite, cliquez sur "Nouvelle Application".
･ Dans l'onglet "Bot", cochez les 3 "Privileged Gateway Intents" (Presence Intent, Server Intent et Message Content Intent).
･ Réinitialisez et copiez le token de votre bot.
･ Allez dans l'onglet "Oauth2", puis dans "OAuth2 URL Generator", cochez "bot" et "administrator".
･ Copiez et collez l'URL générée dans un autre onglet et invitez le bot dans votre serveur.
```


2.1 L'héberger sur son PC
```
Prérequis :
Assurez-vous d'avoir Node.js 16.20.0 : https://nodejs.org/en/blog/release/v16.20.0
Téléchargez Crowbot-Fix.zip depuis les releases (https://github.com/4wip/Crowbot-Fix/releases/)
Extrayez le dossier sur votre PC
Pour le token, vous serez obliger d'aller dans util/login.js et client.login("Mettre votre token ici.");

Allez dans config.json :
{
    "color": "#2B2D31", //Couleur HEX
    "prefix": "+", //Préfixe du bot, par exemple pour utiliser +help
    "name": "CrowBot Remade", // Footer Embed
    "defaultjoinmessage": "{user} vient de rejoindre. Il a été invité par **{inviter:name}** qui a désormais **{invite} invitations** !", // Modifiable
    "defaultleavemessage": "{user} vient de quitter. Il avait été invité par **{inviter:name}** qui a désormais **{invite} invitations** ", // Modifiable
    "defaultLevelmessage": "**{user}** vient de passer au niveau **{level}**. Bravo à lui !", // Modifiable
        "owner": [  // ID des propriétaires
        "1208337813339373569", 
        "",
        ""
    ]
}

Lancement du bot
Ouvrez un terminal.
Tapez "npm i" dans le terminal.
Ensuite, pour lancer le bot, tapez "node index.js" dans le terminal.
Une autre option est de double-cliquer sur le fichier .bat pour lancer le bot. Ce fichier effectue la même opération que la commande précédente.
```


2.2 Héberger 24/7 sur Render | Gratuit (PC et Mobile)
```
Faites un fork du dépôt GitHub suivant pour modifier le fichier config.json : https://github.com/4wip/Crowbot-Fix/fork
Rendez-vous sur le site Render et créez un compte.
Créez un service web sur Render :
Utilisez le fork que vous venez de faire.
Paramètres :
Région : Ohio (US East).
Runtime : Node
Commande de construction : "npm i"
Commande de démarrage : "node index.js"
Type d'instance : Gratuit ou autre.

Variables d'environnement :
token : Entrez le token de votre bot.
NODE_VERSION : 16.20.0

Enfin, créez votre service web.
Votre bot va se construire. Allez dans l'onglet "logs" sur Render pour suivre le processus. Une fois que tout est chargé, vous verrez l'indication suivante : "Connecté à Nomdetonbot". Cela signifie que votre bot est en ligne.

Pour maintenir votre bot en ligne 24/7, rendez-vous sur le site cron-job.org et créez un compte.
Dans le tableau de bord, allez dans l'onglet "Cronjobs" et créez un nouveau Cronjob :
Nom : Choisissez le nom que vous souhaitez.
URL : Utilisez l'URL de votre service web sur Render (voir l'image).
Calendrier d'exécution : Chaque minute.
Créez le Cronjob et voilà, votre bot fonctionne maintenant 24/7.
```
![image](https://github.com/4wip/Crowbot-Fix/assets/168364544/9c70adb6-34f7-44fe-97ad-78b46c2795bf)

```
Si vous avez une question ou besoin d'aide : discord.gg/A5bfyv3AzB
```
### Crédit
```
https://github.com/whoisbaby/CrowBot-Remade
```
