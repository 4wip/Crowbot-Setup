const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'voice',
    aliases: ['vc', 'stats', 'stat'],

    run: async (client, message, args, prefix, color) => {
  let perm = false;
        message.member.roles.cache.forEach(role => {
            if (db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true;
            if (db.get(`admin_${message.guild.id}_${role.id}`)) perm = true;
        });

        if (client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {
            const members = await message.guild.members.fetch();
            const onlineMembers = members.filter(member => member.presence.status !== 'offline');
            const voiceMembers = members.filter(member => member.voice.channel);
            const boosts = message.guild.premiumSubscriptionCount;
            const streamingMembers = voiceMembers.filter(member => member.voice.streaming);

            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setThumbnail(message.guild.iconURL())
                .setTitle(`${message.guild.name} Statistiques!`)
                .setDescription(
                    `*Membres:* **${members.size}**\n` +
                    `*En ligne:* **${onlineMembers.size}**\n` +
                    `*En vocal:* **${voiceMembers.size}**\n` +
                    `*En stream:* **${streamingMembers.size}**\n` +
                    `*Boosts:* **${boosts}**`
                );

            message.channel.send(embed);
        }
    }
};
