const RoleSchema = require('../../models/autorole')
const client = require('../../index')
module.exports = {
    name: 'guildMemberAdd',

    /**
     * @param {GuildMember} member 
     * @param {Client} client 
     */
    async execute(member, guild) {
  RoleSchema.findOne({ Guild: member.guild.id }, async (err, data) => {
    if (!data) return;
    if (data) {
      const role = member.guild.roles.cache.find(role => role.id == data.Role)
      if (!role) {
        console.log(`Auto Role: ${data.Role} was deleted from ${member.guild.id}`)
        return data.delete()
      }
      member.roles.add(role.id)
    }
  })
}
}