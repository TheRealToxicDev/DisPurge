const { MessageEmbed } = require ('discord.js');

const ServersDB = require ('../mongo/serverSchema');

const EmbedConfig = require ('../listeners/embeds/main');
const ErrorEmbedConfig = require ('../listeners/embeds/errors');

module.exports.run = async (client, message, args) => {
    
    let guild = await ServersDB.findOne({ ServerID: message.guild.id });

    if (!guild) await new ServersDB({ ServerID: message.guild.id }).save();
    
    let new_prefix = args.slice(0).join(' ');

    let tomany_args = new MessageEmbed()
       .setAuthor('Error: Missing Args', EmbedConfig.image)
       .setColor(ErrorEmbedConfig.ember_color)
       .setDescription('Prefix cant be more then 10 Characters')
       .addField('Default Prefix', 'dp.', true)
        .addField('Current Prefix', guild.ServerPrefix, true)
       .setTimestamp()
       .setFooter(EmbedConfig.footer, EmbedConfig.image)

    if (new_prefix.length > 10) return message.channel.send(tomany_args);
    
        let missing_args = new MessageEmbed()
       .setAuthor('Error: Missing Args', EmbedConfig.image)
       .setColor(ErrorEmbedConfig.ember_color)
       .setDescription('Please provide the required args ``dp.prefix newPrefix``')
       .addField('Default Prefix', 'dp.', true)
       .addField('Current Prefix', guild.ServerPrefix, true)
       .setTimestamp()
       .setFooter(EmbedConfig.footer, EmbedConfig.image)
    
    if (!new_prefix) return message.channel.send(missing_args);

    guild.ServerPrefix = new_prefix;

    await guild.save();

    let embed = new MessageEmbed()
    .setAuthor('Okay, Done!', EmbedConfig.image)
    .setColor(EmbedConfig.blurple)
    .setDescription('Prefix has been set')
    .addField('Default Prefix', 'dp.', true)
    .addField('New Prefix', args[0], true)
    .setTimestamp()
    .setFooter(EmbedConfig.footer, EmbedConfig.image)

    return message.channel.send(embed);
}

module.exports.help = {
    name: "prefix",
    category: "config",
    aliases: [],
    description: "Set the Bots Prefix for this Guild!",
    example: "``prefix <newPrefix>``"
}

module.exports.requirements = {
    userPerms: ["MANAGE_GUILD"],
    clientPerms: ["EMBED_LINKS"],
    ownerOnly: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}
