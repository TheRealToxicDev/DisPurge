const { MessageEmbed } = require ('discord.js');
const EmbedConfig = require ('../listeners/embeds/main');

module.exports.run = async (client , message, args) => {

await message.delete().catch(() => {})

function duration(ms) {

    const sec = Math.floor((ms / 1000) % 60).toString()

    const min = Math.floor((ms / (1000 * 60)) % 60).toString()

    const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()

    const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()

    return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds, `

  }

 let embed = new MessageEmbed()
   embed.setAuthor('Woah, Is it bad?', EmbedConfig.image)
   embed.setColor(EmbedConfig.blurple)
   embed.setDescription("``" + duration(client.uptime) + "``")
   embed.setFooter(EmbedConfig.footer, EmbedConfig.image)

   message.channel.send(embed)
 }

module.exports.help = {
    name: "uptime",
    category: "info",
    aliases: ['up'],
    description: "Tells you how long the Bot has been Online",
    example: "``uptime``"
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
