const axios = require('axios');
const db = require("quick.db")
const Discord = require("discord.js");
const ms = require("ms")

module.exports = (client, member, voiceChannel) => {
    
	const color = db.get(`color_${member.guild.id}`) === null ? client.config.color : db.get(`color_${member.guild.id}`)
	let wass = db.get(`logvc_${voiceChannel.guild.id}`);
	const logschannel = voiceChannel.guild.channels.cache.get(wass)
    
	if (logschannel) logschannel.send(new Discord.MessageEmbed()
		.setColor(color)
		.setDescription(`${member} **Partage sont stream** dans <#${voiceChannel.id}>`)
		.setFooter(`${client.config.name}`)
		.setTimestamp()
	)
}
