// Example of how to make a Command
const discord = require('discord.js');
const config = require('../../config.js');
const timezone = require("moment-timezone");

module.exports = {

    name: "ping",
    aliases: ["pong", "latency"],
    category: "Utility",
    description: "Check the bot's ping!",
    ownerOnly: true,
    run: async (client, message, args) => {

        if (!message.guild.me.permissions.has("EMBED_LINKS")) return message.channel.send({
            content: "I do not have the **MESSAGE_EMBED_LINKS** permission in this channel.\nPlease enable it."
        });

        try{
            const m = await message.channel.send('Pinging...')
            const embed = new discord.MessageEmbed()
                .addField('⏳ Latency', `_**${m.createdTimestamp - message.createdTimestamp}ms**_`, true)
                .addField('💓 API', `_**${client.ws.ping}ms**_`, true)
                .setColor(config.color)
                .setFooter({ text: `Requested by ${message.author.username} | Today at ${timezone.tz("Asia/Jakarta").format("HH:mma") + " "}`, iconURL: message.author.displayAvatarURL({ 
                        dynamic: true 
                    }) 
                })

            setTimeout(function() { m.edit({ content: ' ', embeds: [embed] }) }, 2000);
        } catch (e) {
            const embed = new discord.MessageEmbed()
                .setDescription(`${e}`)
                .setColor(config.color)
            message.channel.send({ embeds: [embed] })
        }
    }
};