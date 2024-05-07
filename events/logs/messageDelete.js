const axios = require('axios');
const db = require("quick.db")
const Discord = require("discord.js");
const ms = require("ms")

module.exports = (client, message) => {
    
	let guild = message.guild
	const color = db.get(`color_${guild.id}`) === null ? client.config.color : db.get(`color_${guild.id}`)
	let wass = db.get(`msglog_${message.guild.id}`);
	const logschannel = message.guild.channels.cache.get(wass)

	if (logschannel) logschannel.send(new Discord.MessageEmbed()
        .setColor(color)
		.setAuthor(`Message supprimé`)
		.setDescription(`dans <#${message.channel.id}> par ${message.author}`)
		.addField(`Message Supprimé :`, `${message.content} **(embed)**`)
		.setFooter(`${client.config.name}`)
		.setTimestamp())
}
