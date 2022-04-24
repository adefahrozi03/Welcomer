const schema = require('../../models/autorole')
const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
  name: 'disable-autorole',
  timeout: 5,
  category:'Config',
  ownerOnly:true,
  aliases: ["disableautorole"],
  description: 'Disables auto role',
  userPerms: ['ADMINISTRATOR'],
  run: async (client, message, args, Discord) => {
    schema.findOne({
      Guild: message.guild.id
    }, async (err, data) => {
      if (err) throw err
      if (!data) {
        let embed2 = new MessageEmbed()
          .setDescription(`Auto role is already disabled`)
          .setColor("GREY")
          .setTimestamp()
      message.channel.send({ embeds: [embed2]})
      } else {
        await schema.findOneAndDelete({
          Guild: message.guild.id
        })
        let embed1 = new MessageEmbed()
          .setDescription(`${client.emoji.success} | Auto role has been disabled.`)
          .setColor("GREY")
          .setTimestamp()
      message.channel.send({ embeds: [embed1]})
      }
    })
  }
}