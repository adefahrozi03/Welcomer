const Schema = require('../../models/welcome-channel');
const { MessageEmbed } = require('discord.js');
const client = require('../../index');
const timezone = require("moment-timezone");

module.exports = {
    name: 'guildMemberAdd',

    /**
     * @param {GuildMember} member 
     * @param {Client} client 
     */
    async execute(member) {
  Schema.findOne({ Guild: member.guild.id }, async (err, data) => {
    if (!data) return;

    const channel = member.guild.channels.cache.get(data.Channel);
    // const guildAvatar = client.guilds.cache
    //   .get(member.guild.id)
    //   .iconURL({ dynamic: true });
    const userAvatar = member.user.displayAvatarURL({
      dynamic: true,
      size: 512,
    });

    try {
      channel.send({
        embeds: [
          new MessageEmbed()
            .setTitle('New Member!')
            .setThumbnail(userAvatar)
            .setDescription(
              `Hey <@${member.user.id}>, Welcome to **${member.guild.name}**!`
            )
            .setFooter(`${member.guild.memberCount} members`)
          .setFooter({ text: `${member.guild.memberCount} members | Today at ${timezone.tz("Asia/Jakarta").format("HH:mma") + " "}`})
            .setColor('BLUE'),
        ],
      });
    } catch (err) {
      console.log(err);
    }
  });
}
}