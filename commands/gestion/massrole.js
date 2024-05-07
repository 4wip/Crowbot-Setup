const Discord = require('discord.js')
const db = require('quick.db')
const {
	MessageActionRow,
	MessageButton,
	MessageMenuOption,
	MessageMenu
} = require('discord-buttons');

module.exports = {
	name: 'massrole',
	aliases: ['massiverole'],
	run: async (client, message, args, prefix, color) => {


		let perm = ""
		message.member.roles.cache.forEach(role => {
			if (db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
		})
		if (client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {

			if (args[0] === "add") {
				const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
				if (!role) return message.channel.send(`Aucun rôle trouver pour \`${args[1] || " "}\``)
				let count = 0
				message.channel.send(`Je suis entrain d'ajouté le rôle \`${role}\` à ${message.guild.memberCount} utilisateur...`)
				message.guild.members.cache.forEach(member => setInterval(() => {
					count++
					if (member) member.roles.add(role, `Masiverole par ${message.author.tag}`).catch()
					if (count === message.guild.memberCount) return message.channel.send(`J'effectue la tâche, Merci de patienter ${message.guild.memberCount > 1 ? `J'ajoute le rôle à ${message.guild.memberCount} membres` : `J'ajoute le rôle à membres ${message.guild.memberCount} membre`}`);
				}), 250)


			} else if (args[0] === "remove") {
				const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
				if (!role) return message.channel.send(`Aucun rôle trouver pour \`${args[1] || " "}\``)
				let count = 0
				message.channel.send(`Je suis entrain d'enlevé le rôle \`${role}\` à ${message.guild.memberCount} utilisateur...`)
				message.guild.members.cache.forEach(member => setInterval(() => {
					count++
					if (member) member.roles.remove(role, `Massiverole par ${message.author.tag}`).catch()
					if (count === message.guild.memberCount) return message.channel.send(`J'effectue la tâche, Merci de patienter ${message.guild.memberCount > 1 ? `J'enleve le rôle à ${message.guild.memberCount} membres` : `J'enleve le rôle à membres ${message.guild.memberCount} membre`}`);
				}), 250);

			}
		}

	}
}
