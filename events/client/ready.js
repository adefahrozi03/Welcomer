const client = require("../../index.js");
const prefix = process.env.prefix
const chalk = require("chalk");

const activities = [
  { name: `${prefix}help | BETA`, type: 'PLAYING' },
  { name: `${prefix}help | Working All Servers`, type: 'LISTENING' }
];

module.exports = {
    name: 'ready',
    once: true,

    /**
     * @param {Client} client 
     */
    async execute(client) {
        
        // Puts an activity
        client.user.setPresence({ status: 'online', activity: activities[0] });
    let activity = 1;
    setInterval(() => {
        activities[2] = { name: `${prefix}help | ${client.channels.cache.size} Channels`, type: 'WATCHING' };
        activities[3] = { name: `${prefix}help | ${client.users.cache.size} Users`, type: 'WATCHING' };
        activities[4] = { name: `${prefix}help | ${client.guilds.cache.size} Servers`, type: 'STREAMING'}
        if (activity > 4) activity = 0;
        client.user.setActivity(activities[activity]);
        activity++;
    }, 5000);
        
        // Send a message on the console
        console.log(chalk.bgGreenBright.black(`[LOG]`),(`${client.user.tag} is now online!`));
        console.log(chalk.bgGreenBright.black(`[LOG]`),(`Bot serving ${client.users.cache.size} users`))
        console.log(chalk.bgGreenBright.black(`[LOG]`),(`Bot serving on Ready to serve in ${client.guilds.cache.size} servers`))
    }
}