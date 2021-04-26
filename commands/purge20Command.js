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

    await message.channel.bulkDelete('20').catch(() => {})

    let success = new MessageEmbed()
      success.setAuthor('Purge Complete', EmbedConfig.image)
      success.setColor(EmbedConfig.blurple)
      success.setDescription('I have purged `20` messages from this channel.')
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
                   logs.addField('Amount', '`20`', true)
                   logs.setFooter(EmbedConfig.footer, EmbedConfig.image)
        
                channel.send(logs)
       }
   });

   await UsersDB.updateOne({
       UserID: message.author.id,
       Username: message.author.username,
       LastPurge: {
           MessageChannel: message.channel.name,
           Amount: '20'
       }
   })
}

module.exports.help = {
    name: "purge20",
    category: "purging",
    aliases: ['p20'],
    description: "Bulk Delete 20 messages under 14 days old!",
    example: "``purge10``"
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
