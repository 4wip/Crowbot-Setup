const Discord = require("discord.js");
const disbut = require("discord-buttons")
const db = require("quick.db")

module.exports = (client) => {
	setInterval(async () => {
		client.guilds.cache.forEach(guild => {
			let memberformat = db.fetch(`memberformat_${guild.id}`)
			let onlineformat = db.fetch(`onlineformat_${guild.id}`)
			let vocalformat = db.fetch(`vocalformat_${guild.id}`)
			let boostformat = db.fetch(`boostformat_${guild.id}`)
			if (memberformat == null) memberformat = `💎・Membres: ${guild.memberCount}`
			if (onlineformat == null) onlineformat = `🌟・En ligne: ${guild.members.cache.filter(m => m.user.presence.status !== 'offline').size}`
			if (vocalformat == null) vocalformat = `🎧・En vocal: ${guild.members.cache.filter(m => m.voice.channel).size}`
			if (boostformat == null) boostformat = `🔮・Boost: ${guild.premiumSubscriptionCount}`

			let memberchannel = guild.channels.cache.get(db.fetch(`member_${guild.id}`))
			if (!memberchannel) {
				return;
			} else {
				memberchannel.setName(memberformat.replace("<count>", guild.memberCount))
			}
			let onlinechannel = guild.channels.cache.get(db.fetch(`online_${guild.id}`))
			if (!onlinechannel) {
				return;
			} else {
				onlinechannel.setName(onlineformat.replace("<count>", guild.members.cache.filter(m => m.user.presence.status !== 'offline').size))
			}
			let vocalchannel = guild.channels.cache.get(db.fetch(`vocal_${guild.id}`))
			if (!vocalchannel) {
				return;
			} else {
				vocalchannel.setName(vocalformat.replace("<count>", guild.members.cache.filter(m => m.voice.channel).size))
			}
			let boostchannel = guild.channels.cache.get(db.fetch(`boost_${guild.id}`))
			if (!boostchannel) {
				return;
			} else {
				boostchannel.setName(boostformat.replace("<count>", guild.premiumSubscriptionCount))
			}
		});

	}, 5000)
}
