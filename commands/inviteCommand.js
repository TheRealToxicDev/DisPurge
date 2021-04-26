const { MessageEmbed } = require ('discord.js');
const EmbedConfig = require ('../listeners/embeds/main');

module.exports.run = (client , message, args) => {

 let embed = new MessageEmbed()
   embed.setAuthor('Woah, I feel honored!!', EmbedConfig.image)
   embed.setColor(EmbedConfig.blurple)
   embed.setDescription('You can invite me using the links below')
   embed.addField('Invite HyperLink', '[Click Here Boii](https://api.dispurge.xyz/inv)', true)
   embed.addField('Invite Link (Mobile Users)', 'https://api.dispurge.xyz/inv', true)
   embed.setFooter(EmbedConfig.footer, EmbedConfig.image)

   message.channel.send(embed)
 }

module.exports.help = {
    name: "invite",
    category: "info",
    aliases: ['inv', 'join'],
    description: "Sends you a link to Invite the Bot!!",
    example: "``invite``"
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
