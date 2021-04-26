const { MessageEmbed } = require ('discord.js');
const moment = require ('moment');
const EmbedConfig = require ('../listeners/embeds/main');

module.exports.run = (client , message, args) => {

 let embed = new MessageEmbed()
   embed.setAuthor('DisPurge Statistics', EmbedConfig.image)
   embed.setColor(EmbedConfig.blurple)
   embed.setDescription('Woah, What are you doing here 🤔!.')
   embed.addField('User Count', `${client.users.cache.size} Users`, true)
   embed.addField('Guild Count', `${client.guilds.cache.size} Guilds`, true)
   embed.addField('Command Count', `${client.commands.size} Commands`, true)
   embed.addField('DisPurge Ping', `${client.ws.ping}ms`, true)
   embed.addField('Vote Links', `[Infinity Bots](${client.config.infinity_votes})`, true)
   embed.setFooter(EmbedConfig.footer, EmbedConfig.image)

   message.channel.send(embed)
 }

module.exports.help = {
    name: "about",
    category: "info",
    aliases: [],
    description: "Tells you a bit about DisPurge!!",
    example: "``about``"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ['EMBED_LINKS'],
    ownerOnly: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}