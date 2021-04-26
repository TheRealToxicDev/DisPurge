const { MessageEmbed } = require ('discord.js');
const EmbedConfig = require ('../listeners/embeds/main');

module.exports.run = async (client , message, args) => {

    message.delete().catch()

     await Promise.all([
         client.destroy(),
         client.login(client.config.token)]
     );

 let embed = new MessageEmbed()
   embed.setAuthor('Im back baby!!', EmbedConfig.image)
   embed.setColor(EmbedConfig.blurple)
   embed.setDescription("Restart Successful")
   embed.setFooter(EmbedConfig.footer, EmbedConfig.image)

   return message.channel.send(embed)
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
