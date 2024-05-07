const Discord = require('discord.js')
const db = require('quick.db')
const {
	MessageActionRow,
	MessageButton,
	MessageMenuOption,
	MessageMenu
} = require('discord-buttons');

module.exports = {
	name: 'pic',
	aliases: ["pp"],
	run: async (client, message, args, prefix, color) => {
		let perm = ""
		message.member.roles.cache.forEach(role => {
			if (db.get(`modsp_${message.guild.id}_${role.id}`)) perm = true
			if (db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
			if (db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
		})
		if (client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm || db.get(`channelpublic_${message.guild.id}_${message.channel.id}`) === true) {
			const use = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author
			const member = client.users.cache.get(use.id)
			const Embed = new Discord.MessageEmbed()
			Embed.setTitle(`Cette Photo De Profil Et Incroyable !!!`);
			Embed.setDescription(`Voici La Photo De Profil De <@${member.id}>`)
			Embed.setImage(`${member.displayAvatarURL({  dynamic: true })}`);
			Embed.setTimestamp()
			Embed.setFooter(`${client.config.name}`)
			Embed.setColor(color)
			message.channel.send(Embed)

		}

	}
}
