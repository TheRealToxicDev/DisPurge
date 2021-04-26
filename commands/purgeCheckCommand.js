const { MessageEmbed } = require ('discord.js');
const ServerDB = require ('../mongo/serverSchema');
const UsersDB = require ('../mongo/userSchema');
const EmbedConfig = require ('../listeners/embeds/main');
const ErrorEmbedConfig = require ('../listeners/embeds/errors');

module.exports.run = async (client , message, args) => {

  try {

    await message.delete().catch(() => {})

    let user = (message.mentions.users.first() || client.users.cache.get(args[0]));

       let no_args = new MessageEmbed()
      .setAuthor(`Error: Missing Args`, EmbedConfig.image)
      .setColor(ErrorEmbedConfig.ember_color)
      .setDescription('Please provide a staff member to fetch stats for!')
      .addField('Note', 'This can be a @Mention or ID', true)
      .setFooter(EmbedConfig.footer, EmbedConfig.image)


    if (!user || user.bot) return message.channel.send(no_args);

    let isUser = await Users.findOne({ UserID: user.id }, { _id: false });

    if (!isUser) {

    let not_found = new MessageEmbed()
      .setAuthor(`Error: Staff Check Failed`, client.user.displayAvatarURL())
      .setColor(ErrorEmbedConfig.ember_color)
      .setDescription('I cannot find that user, Are you sure they are in my DB ?')
      .setFooter(EmbedConfig.footer, EmbedConfig.image)

     return message.channel.send(not_found);

    } else {

        const embed = new MessageEmbed()
          .setAuthor(`GET: Purge Check`, EmbedConfig.image)
          .setColor(EmbedConfig.blurple)
          .setDescription(`Purge info for ${isUser.Username}`)
          .addField('Last Purge Amount', isUser.LastPurge.get('MessageChannel'), true)
          .addField('Last Purge Channel', isUser.LastPurge.get('Amount'), true)
          .setFooter(EmbedConfig.footer, EmbedConfig.image)

          return message.channel.send(embed)

    }
   } catch (e) {

        var embed2 = new MessageEmbed()
            .setTitle('Whoops, Something went wrong!!!')
            .setColor(ErrorEmbedConfig.ember_color)
            .setDescription("If this issue continues please contact my Dev Team")
            .addField("Error", `${e.message}`)
            .setTimestamp()

        return message.channel.send(embed2);
     }
}

module.exports.help = {
    name: "purge-check",
    category: "info",
    aliases: ['pc', 'purges'],
    description: "Check the Last Purge info for the Provided User!",
    example: "``purge-check <@user>``"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ["SEND_MESSAGES"],
    ownerOnly: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}
