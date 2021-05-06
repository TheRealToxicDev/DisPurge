const { MessageEmbed } = require("discord.js")

module.exports.run = (client , message, args) => {

if (client.snipe.has(message.guild.id)) {
   let embed = new MessageEmbed()
   .setAuthor("Deleted Messages", client.user.displayAvatarURL({dynamic: true}));

   if(client.snipe[message.guild.id].image) embed.setImage(client.snipe[message.guild.id].image);

   embed.addField(`Snipe: `, `\`\`\`js\n${client.snipe[message.guild.id].message || "No Content"}\n\`\`\``)
   embed.addField(`Message Sender: `, client.snipe[message.guild.id].name)
   embed.addField(`Channel: `, client.snipe[message.guild.id].channel)
   embed.addField("Sniped By:", `${message.author.tag}`)
   embed.setFooter("Deleted at: " + client.snipe[message.guild.id].time)

   message.channel.send(embed);
  }else message.channel.send(new MessageEmbed().setDescription("``❌ No deleted messages``"))
}

module.exports.help = {
    name: "snipe",
    category: "utils",
    aliases: [],
    description: "Snipe previously deleted messages or images!",
    example: "``snipe``"
}

module.exports.requirements = {
    userPerms: ["MANAGE_MESSAGES"],
    clientPerms: ["EMBED_LINKS"],
    ownerOnly: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}
