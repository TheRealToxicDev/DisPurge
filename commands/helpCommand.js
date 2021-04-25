const { MessageEmbed } = require ('discord.js')
const ServerDB = require ('../mongo/serverSchema')
const EmbedConfig = require ('../listeners/embeds/main')

module.exports.run = (client , message, args) => {

    let prefix = 'dp.'

    ServerDB.findOne({
        ServerID: message.guild.id}, (err, res) => {
            
    if(!res){

        prefix = 'tox.'
            
    }else{

        prefix = res.ServerPrefix

    }

    if (args[0] && client.commands.has(args[0])) {

        const cmd = client.commands.get(args[0]);

        let cmdname = cmd.help.name.charAt(0).toUpperCase() + cmd.help.name.slice(1)

        let aliases = 'No Command Aliases Available'

        if (cmd.help.aliases.length === 0) {

            aliases = 'No Command Aliases Available'
        } else {

            aliases = cmd.help.aliases.join('\n')
        }

        let embed = new MessageEmbed()
           embed.setAuthor(`${cmdname} Command Info`, EmbedConfig.image)
           embed.setColor(EmbedConfig.blurple)
           embed.setDescription(`${cmdname.help.description}`)
           embed.addField('Prefix', `${prefix}`, true)
           embed.addField('Category', `${cmd.help.category}`, true)
           embed.addField('Examples', `${cmd.help.example}`, true)
           embed.addField('Aliases', "``" + aliases + "``")
           embed.setFooter('Syntax: <> = Required, [] = Optional', EmbedConfig.image)

        return message.channel.send(embed)
    }

    let info_commands = client.commands.filter(cmd => cmd.help.category == 'info')

    let config_commands = client.commands.filter(cmd => cmd.help.category == 'config')

    let admin_commands = client.commands.filter(cmd => cmd.help.category == 'moderation')

    let owner_commands = client.commands.filter(cmd => cmd.help.category == 'owner')

    let embed = new MessageEmbed()
      embed.setAuthor('DisPurge Help Command', EmbedConfig.image)
      embed.setColor(EmbedConfig.blurple)
      embed.setDescription('Feeling lost? Hopefully this will help!')
      embed.addField('Information', info_commands.map(cmd => "``" + cmd.help.name + "``" ).join("** , **"), true)
      embed.addField('Moderation', admin_commands.map(cmd => "``" + cmd.help.name + "``" ).join("** , **"), true)
      embed.addField('Configuration', config_commands.map(cmd => "``" + cmd.help.name + "``" ).join("** , **"), true)

      if (client.config.owners.includes(message.author.id)) {
        embed.addField('Owners Only', owner_commands.map(cmd => "``" + cmd.help.name + "``" ).join("** , **"), true)
      }
      
      embed.setFooter(EmbedConfig.footer, EmbedConfig.image)

      message.channel.send(embed)

  })
}


module.exports.help = {
    name: "help",
    category: "info",
    aliases: ['commands', 'cmds'],
    description: "Sends you the bots help message!",
    example: "``help <command_name>``"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ["EMBED_LINKS"],
    ownerOnly: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}
