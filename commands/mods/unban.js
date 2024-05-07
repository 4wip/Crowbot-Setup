const Discord = require('discord.js')
const db = require('quick.db')
const ms = require("ms")
const {
    MessageActionRow,
    MessageButton,
    MessageMenuOption,
    MessageMenu
} = require('discord-buttons');
const cooldown = {}

module.exports = {
    name: 'unban',
    aliases: [],
    run: async (client, message, args, prefix, color) => {

        /*#############################################################UNBAN ALL#####################################################################################*/

        if (args[0] == 'all') {
            let perm = ""
            message.member.roles.cache.forEach(role => {
                if (db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = null
            })
            if (client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {
                try {
                    message.guild.fetchBans().then(bans => {
                        if (bans.size == 0) {
                            message.channel.send("Aucune personne n'est ban.")
                        } else {
                            bans.forEach(ban => {
                                setInterval(() => {
                                    if (ban.user) message.guild.members.unban(ban.user.id, `Unbanall par ${message.author.tag}`).catch(err => {});
                                }, 250)

                            })

                            let wass = db.get(`logmod_${message.guild.id}`);

                            const logsmod = message.guild.channels.cache.get(wass)

                            message.channel.send(`${bans.size} ${bans.size > 1 ? "utilisateurs ont": "utilisateur a"} été unban`);
                            if (logsmod) logsmod.send(

                                new Discord.MessageEmbed()
                                //.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                                .setColor(color)
                                //.setTitle(`<:protection:847072581382438953> Modération • Type: **\`bannissement\`**`)
                                //.setTimestamp()
                                //.setDescription(` **Bannissement de**: ${user}\n**Auteur**: ${message.author} \n**Salon**: ${message.channel}\n**Temps de réponse**: ${client.ws.ping}ms`)
                                .setDescription(`${message.author} a **unban** tout les membres bannis`))

                        }
                    })

                } catch (error) {
                    return;
                }
            }

        } else if (args[0]) {

            /*#############################################################UNBAN#####################################################################################*/

            let perm = ""
            message.member.roles.cache.forEach(role => {
                if (db.get(`modsp_${message.guild.id}_${role.id}`)) perm = null
                if (db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
                if (db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
            })
            if (client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {
                let wass = db.get(`logmod_${message.guild.id}`);
                const logsmod = message.guild.channels.cache.get(wass)

                const user = client.users.cache.get(args[0])
                if (!user) return message.channel.send(`Aucun membre trouvée pour \`${args[0]}\``)

                try {
                    await message.guild.fetchBan(args[0])
                } catch (e) {
                    message.channel.send(`<@${args[0]}> n'est pas ban`);
                    return;
                }

                message.guild.members.unban(user.id, `Unban par ${message.author.tag}`)
                message.channel.send(`<@${user.id}> n'est plus **banni**`);
                if (logsmod) logsmod.send(
                    new Discord.MessageEmbed()
                    // .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                    .setColor(color)
                    //        .setTitle(`<:protection:847072581382438953> Modération • Type: **\`bannissement\`**`)
                    //      .setTimestamp() 
                    //     .setDescription(` **Bannissement de**: ${user}\n**Auteur**: ${message.author} \n**Salon**: ${message.channel}\n**Temps de réponse**: ${client.ws.ping}ms`)
                    .setDescription(`${message.author} a **unban** ${user}`))


            }
        }

    }
}
