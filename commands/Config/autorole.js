const schema = require('../../models/autorole')
const { MessageActionRow, MessageEmbed, MessageButton, MessageSelectMenu } = require("discord.js")
module.exports ={
  name: 'enable-autorole',
  aliases: ["enableautorole"],
  timeout: 5,
  category: 'Config',
  ownerOnly: true,
  description: 'Enable auto role system',
  userPerms: ['ADMINISTRATOR'],
  run: async (client, message, args, Discord) => {
    const role = await message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
    if (!role) {
      let rolembed = new MessageEmbed()
          .setDescription("Please specify the role you want to add for autoroles")
          .setColor("GREY")
          .setTimestamp()
      return message.channel.send({ embeds: [rolembed] });
    }
    schema.findOne({
      Guild: message.guild.id
    }, async (err, data) => {
      if (err) throw err
      if (data) {
        let embed = new MessageEmbed()
          .setDescription("Auto role feature is already enabled")
          .setColor("GREY")
        .setTimestamp()
        message.channel.send({ embeds: [embed]})
      } else {
        data = new schema({
          Guild: message.guild.id,
          Role: role.id
        })
        await data.save()
        let sendmbed = new MessageEmbed()
          .setDescription(`${client.emoji.success} | Autorole is now enabled`)
        .setColor('GREY')
        .setTimestamp()
        message.channel.send({ embeds: [sendmbed]})
      }
    })
  }
}