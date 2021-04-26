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

    await message.channel.bulkDelete('99').catch(() => {})

    let success = new MessageEmbed()
      success.setAuthor('Purge Complete', EmbedConfig.image)
      success.setColor(EmbedConfig.blurple)
      success.setDescription('I have purged `99` messages from this channel.')
      success.setFooter(EmbedConfig.footer, EmbedConfig.image)

      message.channel.send(success)

    ServerDB.findOne({
        ServerID: message.guild.id}, async (err, res) => {
            
            let channel = message.guild.channels.cache.get(res.AuditLogs)
       
            if(channel){

                let logs = new MessageEmbed()
                   logs.setAuthor('Action: Purge', EmbedConfig.image)
                   logs.setColor(EmbedConfig.blurple)
                   logs.addField('Mod', `${message.author.username}`, true)
                   logs.addField('Amount', '`99`', true)
                   logs.setFooter(EmbedConfig.footer, EmbedConfig.image)
        
                await channel.send(logs)
       }
   });

   await UsersDB.updateOne({
       UserID: message.author.id,
       Username: message.author.username,
       LastPurge: {
           MessageChannel: message.channel.name,
           Amount: '99'
       }
   })
}

module.exports.help = {
    name: "purge99",
    category: "purging",
    aliases: ['p99'],
    description: "Bulk Delete 99 messages under 14 days old!",
    example: "``purge99``"
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
