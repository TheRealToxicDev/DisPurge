const { MessageEmbed } = require ('discord.js');
const ServerDB = require ('../mongo/serverSchema');
const UsersDB = require ('../mongo/userSchema');
const EmbedConfig = require ('../listeners/embeds/main');
const ErrorEmbedConfig = require ('../listeners/embeds/errors');

module.exports.run = async (client , message, args) => {

    await message.delete().catch(() => {})

    let user = await UsersDB.findOne({ UserID: message.author.id })

    if (!user) await new UsersDB({
        UserID: message.author.id,
        Username: message.author.username
    });

    if (isNaN(args[0])) {

        let embed = new MessageEmbed()
           embed.setAuthor('❌ Error: Invalid Arguements ❌', EmbedConfig.image)
           embed.setColor(ErrorEmbedConfig.ember_color)
           embed.setDescription('Required Args: Must be a valid `Number` from 1 - 99')
           embed.setFooter(EmbedConfig.footer, EmbedConfig.image)

           return message.channel.send(embed)
    }

    if (args[0] > 100) {

        let embed = new MessageEmbed()
           embed.setAuthor('❌ Error: Amount to High ❌', EmbedConfig.image)
           embed.setColor(ErrorEmbedConfig.ember_color)
           embed.setDescription('Please define an amount between `1 - 99`')
           embed.setFooter(EmbedConfig.footer, EmbedConfig.image)

           return message.channel.send(embed)
    }

    let NoAmount = new MessageEmbed()
       NoAmount.setAuthor('❌ Error: No amount provided ❌', EmbedConfig.image)
       NoAmount.setColor(ErrorEmbedConfig.ember_color)
       NoAmount.setDescription('Please define an amount between `1 - 99`')
       NoAmount.setFooter(EmbedConfig.footer, EmbedConfig.image)

    if (!args[0]) return message.channel.send(NoAmount);

    await message.channel.bulkDelete(args[0]).catch(() => {})

    let success = new MessageEmbed()
      success.setAuthor('Purge Complete', EmbedConfig.image)
      success.setColor(EmbedConfig.blurple)
      success.setDescription(`I have purged ${args[0]} messages from this channel.`)
      success.setFooter(EmbedConfig.footer, EmbedConfig.image)

      message.channel.send(success)

    ServerDB.findOne({
        ServerID: message.guild.id}, (err, res) => {
            
            let channel = message.guild.channels.cache.get(res.AuditLogs)
       
            if(channel){

                let logs = new MessageEmbed()
                   logs.setAuthor('Action: Purge', EmbedConfig.image)
                   logs.setColor(EmbedConfig.blurple)
                   logs.addField('Mod', `${message.author.username}`, true)
                   logs.addField('Amount', `${args[0]}`, true)
                   logs.setFooter(EmbedConfig.footer, EmbedConfig.image)
        
                channel.send(logs)
       }
   });

   await UsersDB.updateOne({
       UserID: message.author.id,
       Username: message.author.username,
       LastPurge: {
           MessageChannel: message.channel.name,
           Amount: args[0]
       }
   })
}

module.exports.help = {
    name: "purge",
    category: "purging",
    aliases: ['clear','prune'],
    description: "Bulk Delete messages under 14 days old!",
    example: "``purge <number>``"
}

module.exports.requirements = {
    userPerms: ["MANAGE_MESSAGES"],
    clientPerms: ["MANAGE_MESSAGES"],
    ownerOnly: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}
