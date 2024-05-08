const Discord = require('discord.js')
const db = require('quick.db')
const {
	MessageActionRow,
	MessageButton,
	MessageMenuOption,
	MessageMenu
} = require('discord-buttons');
const {
	ButtonPages
} = require('../../util/embedButton/start.js');

module.exports = {
	name: 'help',
	aliases: [],
	run: async (client, message, args, prefix, color) => {
		if (args[0] === "all") {

			const public = new Discord.MessageEmbed()
				.setColor(color)
				.setFooter(`Prefix : ${prefix} • ${client.config.name}`)
				.setTitle("Liste des commandes par permissions")
				.setTimestamp()
				.setDescription(`

**__Public__**
- \`${client.config.prefix}banner [membre]\`
- \`${client.config.prefix}invite [membre]\`
- \`${client.config.prefix}support\`
- \`${client.config.prefix}pic [membre]\`
- \`${client.config.prefix}snipe\`
- \`${client.config.prefix}ping\`
- \`${client.config.prefix}serverinfo [guild\`
- \`${client.config.prefix}userinfo [user]\`
- \`${client.config.prefix}top [rank]\`
- \`${client.config.prefix}help\`
- \`${client.config.prefix}channelinfo [sallon]\`
`)

			let perm = ""
			message.member.roles.cache.forEach(role => {
				if (db.get(`modsp_${message.guild.id}_${role.id}`)) perm = true
				if (db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
				if (db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
			})
			if (client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {

				const mods = new Discord.MessageEmbed()
					.setColor(color)
					.setFooter(`Prefix : ${prefix} • ${client.config.name}`)
					.setTitle("Liste des commandes par permissions")
					.setTimestamp()
					.setDescription(`*Les commandes Public sont aussi disponible pour la permissions Mods*
                
**__Perm Mods__**
- \`${client.config.prefix}mute <membre> [temps/raison]\`
- \`${client.config.prefix}mutelist\`
- \`${client.config.prefix}unmute <membre>\`
- \`${client.config.prefix}warn [add/remove/clear/list]\`
`)

				const admin = new Discord.MessageEmbed()
					.setColor(color)
					.setFooter(`Prefix : ${prefix} • ${client.config.name}`)
					.setTitle("Liste des commandes par permissions")
					.setTimestamp()
					.setDescription(`*Les commandes disponible pour les permissions Mods sont aussi disponible pour la permissions Admin*
                
**__Perm Admin__**
- \`${client.config.prefix}alladmin\`
- \`${client.config.prefix}allbot\`
- \`${client.config.prefix}allbotadmin\`
- \`${client.config.prefix}ban <membre> [raison]\`
- \`${client.config.prefix}unban <membreID>\`
- \`${client.config.prefix}banlist\`
- \`${client.config.prefix}kick <membre> [raison]\`
`)

				const owner = new Discord.MessageEmbed()
					.setColor(color)
					.setFooter(`Prefix : ${prefix} • ${client.config.name}`)
					.setTitle("Liste des commandes par permissions")
					.setTimestamp()
					.setDescription(`*Les commandes disponible pour les permissions Admin sont aussi disponible pour la permissions Owner*
                
** __Perm Owner__**
- \`${client.config.prefix}lock [salon/all]\`
- \`${client.config.prefix}renew [salon/all]\`
- \`${client.config.prefix}unlock [salon/all]\`
- \`${client.config.prefix}clear [membre/message]\`
`)

				const owner2 = new Discord.MessageEmbed()
					.setColor(color)
					.setFooter(`Prefix : ${prefix} • ${client.config.name}`)
					.setTitle("Liste des commandes par permissions")
					.setTimestamp()
					.setDescription(`*Les commandes disponible pour toute les permissions sont aussi disponible pour les personnes étant owner du bot*
                
**__Owner Discord__** (*seulement owner discord bot, non config*)
- \`${client.config.prefix}perm [clear/set/del <perm> <rôle>]\` 
- \`${client.config.prefix}massrole <add/remove> <rôle>\`
- \`${client.config.prefix}logs\`
- \`${client.config.prefix}levels\`
- \`${client.config.prefix}leave\`
- \`${client.config.prefix}giveaway\`
- \`${client.config.prefix}giveaway reroll\`
- \`${client.config.prefix}emoji <add/remove> <emoji>\`
- \`${client.config.prefix}embed\`
- \`${client.config.prefix}counter\`
- \`${client.config.prefix}prefix <prefix>\`
- \`${client.config.prefix}rolemenu\`
- \`${client.config.prefix}say <message>\`
- \`${client.config.prefix}soutien\`
- \`${client.config.prefix}tempvoc\`
- \`${client.config.prefix}welcome\`
- \`${client.config.prefix}theme <color>\`
- \`${client.config.prefix}public <add/clear/list/remove> <add/remove: salon>\`
- \`${client.config.prefix}unlock all\`
`)
					.setFooter(`Prefix : ${prefix} • ${client.config.name}`)

				const embedPages = [public, mods, admin, owner, owner2];
				ButtonPages(client.interaction, message, embedPages, 60 * 1000, "gray", "▶", "◀");
			}


		} else if (!args[0]) {



			let perm = ""
			message.member.roles.cache.forEach(role => {
				if (db.get(`modsp_${message.guild.id}_${role.id}`)) perm = 1
				if (db.get(`admin_${message.guild.id}_${role.id}`)) perm = 2
				if (db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = 3
			})
			if (db.get(`ownermd_${client.user.id}_${message.author.id}`) === true) perm = 4
			if (client.config.owner.includes(message.author.id)) perm = 5

			const util = new Discord.MessageEmbed()
			util.setColor(color)
			util.setFooter(`Prefix : ${prefix} • ${client.config.name}`)
			util.setTitle("Utilitaire")
			util.setTimestamp()
			util.setDescription("*Les paramètres entre **`<>`** sont obligatoire, alors que les paramètres entre **`[]`** eux sont facultatifs*")
				if (2 <= perm) util.addField(`\`${prefix}alladmin\``, "Permet de voir tout les administrateurs présents sur le serveur")
				if (2 <= perm) util.addField(`\`${prefix}allbot\``, "Permet de voir tout les bots présents sur le serveur")
				if (2 <= perm) util.addField(`\`${prefix}allbotadmin\``, "Permet de voir tout les bots administrateurs présents sur le serveur")
			util.addField(`\`${prefix}banner [membre]\``, "Permet de voir la bannière d'un utilisateur")
			util.addField(`\`${prefix}channelinfo [salon]\``, "Permet de d'avoir des informations sur un salon")
			util.addField(`\`${prefix}help\``, "Permet de voir la liste des commandes du bot")
				if (1 <= perm) util.addField(`\`${prefix}help all\``, "Permet de voir les commandes du bot via les permissions")
			util.addField(`\`${prefix}invite [membre]\``, "Permet de voir le nombre d'invtations que possède un utilisateur")
			util.addField(`\`${prefix}pic [membre]\``, "Permet de voir la photo de profil d'un utilisateur")

			util.addField(`\`${prefix}ping\``, "Permet de voir la latence du bot et du websocket en ms")
				if (2 <= perm) util.addField(`\`${prefix}roleinfo <rôle>\``, "Permet de d'avoir des informations sur un rôle")
			util.addField(`\`${prefix}serverinfo [guild]\``, "Permet de d'avoir des informations sur un serveur où ce trouve le bot")
			util.addField(`\`${prefix}snipe\``, "Permet de voir le dernier message supprimés")
			util.addField(`\`${prefix}top [rank]\``, "Permet de voir un classement sois d'invitations, sois de rank")
			util.addField(`\`${prefix}userinfo [user]\``, "Permet de d'avoir des informations sur un utilisateur")
			util.addField(`\`${prefix}support\``, "Donne une invitation pour le serveur de support bot")
				if (1 <= perm) util.addField(`\`${prefix}voice [info all/all]\``, "Permet de voir des informations sur les les membres en vocal sur le serveur")


			const mods = new Discord.MessageEmbed()
			mods.setColor(color)
			mods.setFooter(`Prefix : ${prefix} • ${client.config.name}`)
			mods.setTitle("Modération")
			mods.setTimestamp()
			mods.setDescription("*Les paramètres entre **`<>`** sont obligatoire, alors que les paramètres entre **`[]`** eux sont facultatifs*")
			if (4 <= perm) mods.addField(`\`${prefix}addrole <membre> <rôle>\` (*Seulement les rôles sans permissions dangereuse*)`, "Permet de donner un rôle à un membre sur le serveur")
			if (2 <= perm) mods.addField(`\`${prefix}ban <membre> [raison]\``, "Permet de bannir un membre du serveur")
			if (2 <= perm) mods.addField(`\`${prefix}banlist\``, "Permet de voir tout les membres bannis sur le serveur")
			if (3 <= perm) mods.addField(`\`${prefix}clear [membre/message]\``, "Permet de supprimés des messages dans un salon")
			if (4 <= perm) mods.addField(`\`${prefix}derank <membre>\``, "Permet d'enlever tout les rôles d'un membre")
			if (2 <= perm) mods.addField(`\`${prefix}kick <membre> [raison]\``, "Permet d'expulser un membre du serveur")
			if (3 <= perm) mods.addField(`\`${prefix}lock [salon]\``, "Permet de fermé un salon du serveur pour le rôle @everyone")
			if (4 <= perm) mods.addField(`\`${prefix}lock all\``, "Permet de fermé tout les salons du serveur pour le rôle @everyone")
			if (1 <= perm) mods.addField(`\`${prefix}mute <membre> [temps/raison]\``, "Permet de rendre muet un membre sur le serveur")
			if (1 <= perm) mods.addField(`\`${prefix}mutelist\``, "Permet de voir les membres muet en direct")
			if (4 <= perm) mods.addField(`\`${prefix}muterole [rôle]\``, "Permet de définir un rôle muet ou d'en crée un")
			if (3 <= perm) mods.addField(`\`${prefix}renew [salon]\``, "Permet de recrée un salon du serveur")
			if (4 <= perm) mods.addField(`\`${prefix}renew all\``, "Permet de recrée tout les salons du serveur")
			if (2 <= perm) mods.addField(`\`${prefix}unban <membre>\``, "Permet de debannir un membre du serveur")
			if (4 <= perm) mods.addField(`\`${prefix}unban all\``, "Permet de debannir tout les membres du serveur")
			if (3 <= perm) mods.addField(`\`${prefix}unlock [salon]\``, "Permet d'ouvir un salon du serveur pour le rôle @everyone")
			if (4 <= perm) mods.addField(`\`${prefix}unlock all\``, "Permet de réouvir tout les salons du serveur pour le rôle @everyone")
			if (1 <= perm) mods.addField(`\`${prefix}unmute <membre>\``, "Permet de demute un membre du serveur")
			if (4 <= perm) mods.addField(`\`${prefix}unmute all\``, "Permet de demute tout les membres muet sur le serveur")
			if (1 <= perm) mods.addField(`\`${prefix}warn <add/remove/list/clear> <add/remove: membre> <remove: warnID>\``, "Permet de gérer les sanctions d'un membre")


			const gestion = new Discord.MessageEmbed()
			gestion.setColor(color)
			gestion.setFooter(`Prefix : ${prefix} • ${client.config.name}`)
			gestion.setTitle("Serveur Gestion")
			gestion.setTimestamp()
			gestion.setDescription("*Les paramètres entre **`<>`** sont obligatoire, alors que les paramètres entre **`[]`** eux sont facultatifs*")
			if (5 <= perm) gestion.addField(`\`${prefix}antiraid\``, "Permet de gérer les modules d'antiraid sur le serveur")
			if (4 <= perm) gestion.addField(`\`${prefix}counter\``, "Permet de gérer les compteurs personnalisés sur le serveur")
			if (4 <= perm) gestion.addField(`\`${prefix}embed\``, "Permet de crée un embed personalisé")
			if (4 <= perm) gestion.addField(`\`${prefix}emoji <add/remove> <emoji>\``, "Permet d'ajouté ou d'enlevé un emoji du serveur")
			if (4 <= perm) gestion.addField(`\`${prefix}giveaway\``, "Permet de crée un giveaway")
			if (4 <= perm) gestion.addField(`\`${prefix}giveaway reroll\``, "Permet de re choisir le gagnant d'un giveaway")
			if (4 <= perm) gestion.addField(`\`${prefix}leave\``, "Permet de paramétrer les actions à effectuer quand un membre quitte le serveur")
			if (4 <= perm) gestion.addField(`\`${prefix}levels\``, "Permet de paramétrer les actions à effectuer quand un membre gagne un niveau sur le serveur")
			if (4 <= perm) gestion.addField(`\`${prefix}logs\``, "Permet de définir les salons de logs")
			if (4 <= perm) gestion.addField(`\`${prefix}massrole <add/remove> <rôle>\``, "Permet d'ajouté ou d'enlevé un rôle à tout les membres du serveur")
			if (4 <= perm) gestion.addField(`\`${prefix}perm\``, "Affiche la liste des rôles ayant des permissions sur le bot")
			if (4 <= perm) gestion.addField(`\`${prefix}public <add/clear/list/remove> <add/remove: salon>\``, "Permet de gérer les salons où les commandes public sont autorisés")
			if (5 <= perm) gestion.addField(`\`${prefix}prefix <prefix>\``, "Permet de changer le prefix du bot")
			if (4 <= perm) gestion.addField(`\`${prefix}rolemenu\``, "Affiche un menu interactif pour créer ou modifier un reactionrole/boutonrole ")
			if (5 <= perm) gestion.addField(`\`${prefix}raidlog <on/off/salon>\``, "Permet de définir le salon de raidlog")
			if (4 <= perm) gestion.addField(`\`${prefix}say <message>\``, "Permet d'envoyer un message avec le bot")
			if (4 <= perm) gestion.addField(`\`${prefix}soutien\``, "Permet de donner automatiquement un rôle aux membres ayant un message dans leurs statuts ")
			if (4 <= perm) gestion.addField(`\`${prefix}tempvoc\``, "Affiche un menu interactif pour gérer les vocaux temporaires sur le serveur")
			if (4 <= perm) gestion.addField(`\`${prefix}welcome\``, "Permet de paramétrer les actions à effectuer quand un membre rejoint le serveur")
			if (5 <= perm) gestion.addField(`\`${prefix}theme <color>\``, "Permet de changer la couleur d'embed du bot")

			const bot = new Discord.MessageEmbed()
			bot.setColor(color)
			bot.setFooter(`Prefix : ${prefix} • ${client.config.name}`)
			bot.setTitle("Bot")
			bot.setTimestamp()
			bot.setDescription("*Les paramètres entre **`<>`** sont obligatoire, alors que les paramètres entre **`[]`** eux sont facultatifs*")
			if (5 <= perm) bot.addField(`\`${prefix}backup <emoji> <clear/create/list/load/remove>> <2/3/4: code>\``, "Permet de gérer les backup sur le bot")
			if (4 <= perm) bot.addField(`\`${prefix}blacklist <add/clear/list/remove> <add/remove: membre>\``, "Permet de gérer les utilisateurs blacklist")
			if (4 <= perm) bot.addField(`\`${prefix}blacklistrank <add/clear/list/remove> <add/remove: membre>\``, "Permet de gérer les utilisateurs blacklistrank")
			if (5 <= perm) bot.addField(`\`${prefix}owner <add/clear/list/remove> <add/remove: membre>\``, "Permet de gérer les utilisateurs owners")
			if (5 <= perm) bot.addField(`\`${prefix}server <invite/leave/list> <leave/invite: ID>\``, "Permet de gérer les serveurs où ce trouve le bot")
			if (5 <= perm) bot.addField(`\`${prefix}botconfig\``, "Permet de gérer le profil du bot")
			if (5 <= perm) bot.addField(`\`${prefix}botinfo\``, "Permet de voir les informations du bot")
			if (4 <= perm) bot.addField(`\`${prefix}whitelist <add/clear/list/remove> <add/remove: membre>\``, "Permet de gérer les utilisateurs whitelist")

			if (perm === "" && db.get(`channelpublic_${message.guild.id}_${message.channel.id}`) === true) return message.channel.send(util)
			if (perm === 1) {
				const embedPages = [util, mods];
				return ButtonPages(client.interaction, message, embedPages, 60 * 1000, "gray", "▶", "◀");
			} else if (perm === 2 || perm === 3) {
				const embedPages = [util, mods];
				return ButtonPages(client.interaction, message, embedPages, 60 * 1000, "gray", "▶", "◀");
			} else if (perm === 4) {
				const embedPages = [util, mods, gestion, bot];
				return ButtonPages(client.interaction, message, embedPages, 60 * 1000, "gray", "▶", "◀");
			} else if (perm === 5) {
				const embedPages = [util, mods, gestion, bot];
				return ButtonPages(client.interaction, message, embedPages, 60 * 1000, "gray", "▶", "◀");
			}
		}
	}
}
