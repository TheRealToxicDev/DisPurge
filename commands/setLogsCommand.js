const { MessageEmbed } = require ('discord.js');
const ServerDB = require ('../mongo/serverSchema');
const UsersDB = require ('../mongo/userSchema');
const EmbedConfig = require ('../listeners/embeds/main');
const ErrorEmbedConfig = require ('../listeners/embeds/errors');

module.exports.run = async (client , message, args) => {

    await message.delete().catch(() => {})

    let server = await ServerDB.findOne({ ServerID: message.guild.id })
    if (!server) await new ServerDB({ ServerID: message.guild.id })

   let logchannel = args[0]

   if (!logchannel) return message.channel.send('Please mention a Channel or provide a Channel ID')

   let final_logchannel = logchannel.name || logchannel.id

   await ServerDB.updateOne({ ServerID: message.guild.id}, {$set: { AuditLogs: final_logchannel }})

    let success = new MessageEmbed()
      success.setAuthor('Action: Set Logs', EmbedConfig.image)
      success.setColor(EmbedConfig.blurple)
      success.setDescription(`Log Channel has been set to ${final_logchannel}`)
      success.setFooter(EmbedConfig.footer, EmbedConfig.image)

      return message.channel.send(success)
}

module.exports.help = {
    name: "set-logs",
    category: "config",
    aliases: [],
    description: "Set the Logs Channel ",
    example: "``set-logs <channelMention>``"
}

module.exports.requirements = {
    userPerms: ["MANAGE_CHANNELS"],
    clientPerms: ["MANAGE_MESSAGES"],
    ownerOnly: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}
