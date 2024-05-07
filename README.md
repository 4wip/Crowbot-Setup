Le bot crowbot...
## Mini modifications
```
Fix mute | Le bot ajouter le role muet à chaque personnes qui rejoignaient le serveur.
Le NSFW retiré du bot.
Token du bot dans un .env
Méthode pour le 24/7
Ajout du keep_alive.js.
Soon
```
### Setup
```
L'héberger sur son PC

(Ayez Node.js 16: https://nodejs.org/en/blog/release/v16.20.0)
Dans Releases télécharger Crowbot-Fix.zip: ()
Extraire le dossier dans votre pc
Pour le token fait un fichier sans nom .env puis écriver dedans: token = "Letokendetonbot"

Allez dans config.json:
{
    "color": "#2B2D31", //Couleur HEX
    "prefix": "+", //Préfix Bot, exemple pour faire +help
    "name": "CrowBot Remade", // Footer Embed
    "defaultjoinmessage": "{user} vient de rejoindre. Il a été invité par **{inviter:name}** qui a désormais **{invite} invitations** !", // Modifiable
    "defaultleavemessage": "{user} vient de quitter. Il avais été invité par **{inviter:name}** qui a désormais **{invite} invitations** ", // Modifiable
    "defaultLevelmessage": "**{user}** vient de passer au level **{level}** bravo à lui !", // Modifiable
    "owner": ["1133246357960921158"] // ID du owner du bot
}

Le lancement:
Ouvrez un terminal pour y écrire : npm i
Puis écrivez : node index.js | et votre bot se lancera
Ou
Vous pouvez lancer votre bot en un double click via le .bat qui fait exactement la meme opération.
```

### Héberger le bot 24/7 | Gratuit (PC et Mobile)
```
Faite un fork de ce github pour y modifier la config.json
Rendez-vous sur https://render.com/ et créer vour un compte
Créer un Web Service:

Public Git repository tu met : "https://github.com/4wip/Crowbot/"
Settings :
Region Frankurt (eu central) car c'est le plus proche de la France
Runtime Node | Build Command: "npm i" | Start Command: "node index.js" | Instance type: Free ou autre.
Environment Variable | Token | Entre Le token de ton bot.
                     | NODE_VERSION | 16.20.0
Finalement créer votre Web Service.

Votre bot va se construire. à gauche il y'a écrit logs allez dessus quand tout sera charger il sera écrit :
- Connecter Nomdetonbot
==> Your service is live 🎉
Votre bot est en ligne.

Pour le maintenir 24/7
Allez sur le site https://cron-job.org/en/ et créer toi un compte
Puis t'arrivera dans le dashboard ou t'ira dans l'onglet Cronjobs
Ensuite Créer un Cronjobs : Titre: Ce que tu veux | Url celle de ton render (Voir l'image) | Calendrier d'éxecution | Chaque 1 minutes.
Créer et c'est bon ton bot fonctionne maintenant 24/7
```
![image](https://github.com/4wip/Crowbot-Fix/assets/168364544/9c70adb6-34f7-44fe-97ad-78b46c2795bf)

```
Si vous avez une question : https://discord.gg/htNuh5pZ
```
### Crédit
```
https://github.com/whoisbaby/CrowBot-Remade
```
