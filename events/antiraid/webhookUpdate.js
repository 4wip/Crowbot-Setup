const axios = require('axios');
const db = require("quick.db")
const {
	MessageEmbed
} = require("discord.js");
const ms = require("ms")
const request = require("request")
module.exports = async (client, channelUpdated) => {
	const guild = channelUpdated.guild
	const color = db.get(`color_${guild.id}`) === null ? client.config.color : db.get(`color_${guild.id}`)


	const executor = await channelUpdated.guild.fetchAuditLogs({
		limit: 1,
		type: "WEBHOOK_CREATE"
	}).then(async (audit) => audit.entries.first());
	let perm = ""
	if (db.get(`webhookwl_${guild.id}`) === null) perm = client.user.id === executor.id || guild.owner.id === executor.id || client.config.owner.includes(executor.id) || db.get(`ownermd_${client.user.id}_${executor.id}`) === true || db.get(`wlmd_${guild.id}_${executor.id}`) === true
	if (db.get(`webhookwl_${guild.id}`) === true) perm = client.user.id === executor.id || guild.owner.id === executor.id || client.config.owner.includes(executor.id) || db.get(`ownermd_${client.user.id}_${executor.id}`) === true
	if (db.get(`webhook_${guild.id}`) === true && executor.executor && !perm) {
		if (db.get(`webhooksanction_${guild.id}`) === "ban") {


			axios({
				url: `https://discord.com/api/v9/guilds/${guild.id}/bans/${executor.id}`,
				method: 'PUT',
				headers: {
					Authorization: `bot ${process.env.token}`
				},
				data: {
					delete_message_days: '1',
					reason: 'Antirole'
				}
			}).then(() => {

			}).catch(() => {


			})
		} else if (db.get(`webhook_sanction_${guild.id}`) === "kick") {
			guild.members.cache.get(executor.id).kick().then(() => {

			}).catch(() => {

			})
		} else if (db.get(`webhook_sanction_${guild.id}`) === "derank") {

			guild.members.cache.get(executor.id).roles.set([]).then(() => {


			}).catch(() => {

			})
		}
		setInterval(() => {
			channelUpdated.fetchWebhooks().then((webhooks) => {
				for (const webhook of webhooks) {

					request(`https://discord.com/api/v9/webhooks/${webhook[0]}`, {
						"headers": {
							"authorization": `Bot ${process.env.token}`,
						},
						"method": "DELETE",
					}, (error, response, body) => {

					})



				}
			});

			channelUpdated.messages.fetch({
					limit: 100
				})
				.then((messages) => {
					var filtered = messages.filter(m => m.webhookID).array().slice(0, 100);
					channelUpdated.bulkDelete(filtered, true)

				})
		}, 500)
	}

}
