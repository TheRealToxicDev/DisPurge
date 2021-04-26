const { MessageEmbed } = require ('discord.js');
const ServerDB = require ('../mongo/serverSchema');
const UsersDB = require ('../mongo/userSchema');
const EmbedConfig = require ('../listeners/embeds/main');
const ErrorEmbedConfig = require ('../listeners/embeds/errors');

module.exports.run = async (client , message, args) => {

    await message.delete().catch(() => {})

    let server = await ServerDB.findOne({ ServerID: message.guild.id })
    if (!server) await new ServerDB({ ServerID: message.guild.id })

   let logchannel = args.slice(0).join(" ")

   if (!logchannel) return message.channel.send('Please provide a valid Channel ID');

   await ServerDB.updateOne({ ServerID: message.guild.id}, {$set: { AuditLogs: logchannel }})

    let success = new MessageEmbed()
      success.setAuthor('Action: Set Logs', EmbedConfig.image)
      success.setColor(EmbedConfig.blurple)
      success.setDescription(`Log Channel has been set to <#${logchannel}>`)
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
    ownerOnly: true
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}
