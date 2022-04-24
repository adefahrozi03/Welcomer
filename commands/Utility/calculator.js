const Discord = module.require("discord.js");
const simplydjs = require("simply-djs")

module.exports = {
  name: "calculator",
  aliases: ["calc"],
  description: "calculates.",
    category: "Utility",
    ownerOnly: true,
  run: async (client, message, args) => {
    simplydjs.calculator(message, {
    embedColor: '#075FFF',
    })
  },
};