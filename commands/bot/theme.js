const Discord = require('discord.js')
const db = require('quick.db')
const {
	MessageActionRow,
	MessageButton,
	MessageMenuOption,
	MessageMenu
} = require('discord-buttons');


module.exports = {
	name: 'theme',
	aliases: ["color"],
	run: async (client, message, args, prefix, color) => {

		if (client.config.owner.includes(message.author.id)) {

			let newPrefix = args[0]
			if (!args[0]) return
			if (args[1]) return
			db.set(`color_${message.guild.id}`, args[0])
			message.channel.send(`Ma couleur d'embed est maintenant : \`${args[0]}\``)


		}


	}
}
