const Discord = require('discord.js')
const {
	MessageEmbed
} = require('discord.js')
const db = require('quick.db')
const {
	MessageActionRow,
	MessageButton,
	MessageMenuOption,
	MessageMenu
} = require('discord-buttons');

function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms)
	})
}
module.exports = {
	name: 'ping',
	aliases: ["speed"],

	run: async (client, message, args, prefix, color) => {

		let perm = ""
		message.member.roles.cache.forEach(role => {
			if (db.get(`modsp_${message.guild.id}_${role.id}`)) perm = true
			if (db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
			if (db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
		})
		if (client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm || db.get(`channelpublic_${message.guild.id}_${message.channel.id}`) === true) {
			
			let embeed = new Discord.MessageEmbed()
			embeed.setTitle("Calcul De La Latence Du Bot Et De L'API De Discord...")
			embeed.addField("Ping", `Calcul en cours`, true)
			embeed.addField("Latence", `${client.ws.ping}ms`, true)
			embeed.setColor(color)
			embeed.setTimestamp()
			embeed.setFooter(`${client.config.name}`)

			let msg = await message.channel.send(embeed)
			let embed = new Discord.MessageEmbed()
			embed.setTitle("Voici La Latence Du Bot Et De L'API De Discord")
			embed.addField("Ping", `${msg.createdAt - message.createdAt + "ms"}`, true)
			embed.addField("Latence", `${client.ws.ping}ms`, true)
			embed.setColor(color)
			embed.setTimestamp()
			embed.setFooter(`${client.config.name}`)

			return msg.edit("", embed)
		}
	}
}
