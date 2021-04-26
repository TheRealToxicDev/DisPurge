const { MessageEmbed } = require ('discord.js');
const EmbedConfig = require ('../listeners/embeds/main');

module.exports.run = (client , message, args) => {

 message.delete().catch()

 let embed = new MessageEmbed()
   embed.setAuthor('Woah, Is it bad?', EmbedConfig.image)
   embed.setColor(EmbedConfig.blurple)
   embed.setDescription("``" + duration(client.uptime) + "``")
   embed.setFooter(EmbedConfig.footer, EmbedConfig.image)

   message.channel.send(embed)
 }

module.exports.help = {
    name: "reboot",
    category: "owner",
    aliases: ['restart', 'shutdown'],
    description: "Restart the bot!",
    example: "``reboot``"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ['EMBED_LINKS'],
    ownerOnly: true
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}
