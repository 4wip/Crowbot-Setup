const axios = require('axios');
const db = require("quick.db")
const {
    MessageEmbed
} = require("discord.js");
const ms = require("ms")

module.exports = async (client, oldRole, newRole) => {
    const guild = oldRole.guild;
    const color = db.get(`color_${guild.id}`) === null ? client.config.color : db.get(`color_${guild.id}`)

	// -- Audit Logs
	axios.get(`https://discord.com/api/v9/guilds/${guild.id}/audit-logs?ilimit=1&action_type=32`, {
		headers: {
			Authorization: `Bot ${process.env.token}`
		}

	}).then(response => {
		const raidlog = guild.channels.cache.get(db.get(`${guild.id}.raidlog`))
		if (response.data && response.data.audit_log_entries[0].user_id) {
        let perm = ""
        if (db.get(`rolesmodwl_${guild.id}`) === null) perm = client.user.id === response.data.audit_log_entries[0].user_id || guild.owner.id === response.data.audit_log_entries[0].user_id || client.config.owner.includes(response.data.audit_log_entries[0].user_id) || db.get(`ownermd_${client.user.id}_${response.data.audit_log_entries[0].user_id}`) === true || db.get(`wlmd_${guild.id}_${response.data.audit_log_entries[0].user_id}`) === true
        if (db.get(`rolesmodwl_${guild.id}`) === true) perm = client.user.id === response.data.audit_log_entries[0].user_id || guild.owner.id === response.data.audit_log_entries[0].user_id || client.config.owner.includes(response.data.audit_log_entries[0].user_id) || db.get(`ownermd_${client.user.id}_${response.data.audit_log_entries[0].user_id}`) === true
        if (db.get(`rolesmod_${guild.id}`) === true && !perm) {
            if (db.get(`rolesmodsanction_${guild.id}`) === "ban") {
                
                axios({
                    url: `https://discord.com/api/v9/guilds/${guild.id}/bans/${response.data.audit_log_entries[0].user_id}`,
                    method: 'PUT',
                    headers: {
                        Authorization: `bot ${process.env.token}`
                    },
                    data: {
                        delete_message_days: '1',
                        reason: `AntiRoleUpdate`
                    }

                }).then(() => {
                    newRole.edit({
                        data: {
                            name: oldRole.name,
                            color: oldRole.hexColor,
                            permissions: oldRole.permissions,
                            hoist: oldRole.hoist,
                            mentionable: oldRole.mentionable,
                            position: oldRole.rawPosition,
                            highest: oldRole.highest,
                            reason: `AntiRoleUpdate`
                        }

                    })
                    if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a modifier le rôle ${oldRole}, il a été **ban** !`));
                }).catch(() => {
                    newRole.edit({
                        data: {
                            name: oldRole.name,
                            color: oldRole.hexColor,
                            permissions: oldRole.permissions,
                            hoist: oldRole.hoist,
                            mentionable: oldRole.mentionable,
                            position: oldRole.rawPosition,
                            highest: oldRole.highest,
                            reason: `AntiRoleUpdate`
                        }

                    })
                    if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a modifier le rôle ${oldRole}, mais il n'a pas pu être **ban** !`));

                })
            } else if (db.get(`rolesmodsanction_${guild.id}`) === "kick") {
                guild.members.cache.get(response.data.audit_log_entries[0].user_id).kick().then(() => {
                    newRole.edit({
                        data: {
                            name: oldRole.name,
                            color: oldRole.hexColor,
                            permissions: oldRole.permissions,
                            hoist: oldRole.hoist,
                            mentionable: oldRole.mentionable,
                            position: oldRole.rawPosition,
                            highest: oldRole.highest,
                            reason: `AntiRoleUpdate`
                        }

                    })
                    if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a modifier le rôle ${oldRole}, il a été **kick** !`));
                }).catch(() => {
                    newRole.edit({
                        data: {
                            name: oldRole.name,
                            color: oldRole.hexColor,
                            permissions: oldRole.permissions,
                            hoist: oldRole.hoist,
                            mentionable: oldRole.mentionable,
                            position: oldRole.rawPosition,
                            highest: oldRole.highest,
                            reason: `AntiRoleUpdate`
                        }

                    })
                    if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a modifier le rôle ${oldRole}, mais il n'a pas pu être **kick** !`));
                })
            } else if (db.get(`rolesmodsanction_${guild.id}`) === "derank") {
                guild.members.cache.get(response.data.audit_log_entries[0].user_id).roles.set([]).then(() => {
                    newRole.edit({
                        data: {
                            name: oldRole.name,
                            color: oldRole.hexColor,
                            permissions: oldRole.permissions,
                            hoist: oldRole.hoist,
                            mentionable: oldRole.mentionable,
                            position: oldRole.rawPosition,
                            highest: oldRole.highest,
                            reason: `AntiRoleUpdate`
                        }

                    })
                    if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a modifier le rôle ${oldRole}, il a été **derank** !`));
                }).catch(() => {
                    newRole.edit({
                        data: {
                            name: oldRole.name,
                            color: oldRole.hexColor,
                            permissions: oldRole.permissions,
                            hoist: oldRole.hoist,
                            mentionable: oldRole.mentionable,
                            position: oldRole.rawPosition,
                            highest: oldRole.highest,
                            reason: `AntiRoleUpdate`
                        }

                    })
                    if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a modifier le rôle ${oldRole}, mais il n'a pas pu être **derank** !`));
                })
            }
        }
    }
}
    )}
