const { MessageEmbed } = require ('discord.js');
const moment = require ('moment');
const EmbedConfig = require ('../listeners/embeds/main');

module.exports.run = async (client , message, args) => {

 await message.delete().catch(() => {})

 let embed = new MessageEmbed()
   embed.setAuthor('A bit about me', EmbedConfig.image)
   embed.setColor(EmbedConfig.blurple)
   embed.setDescription('DisPurge is a simple bot written in Discord.js to allow better control over Purging Messages in a Discord Server.')
   embed.addField('Developer(s)', 'Towoxic Dev#4200 | PrettyChillDev#0420', true)
   embed.addField('Created On', moment(client.createdAt).format('MM/DD/YYYY HH:mm:ss A'), true)
   embed.addField('GitHub Repo', 'https://api.dispurge.xyz/git', true)
   embed.addField('Support Server', 'https://api.dispurge.xyz/discord', true)
   embed.addField('DisPurge Website', 'https://dispurge.xyz', true)
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
