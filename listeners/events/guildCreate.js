const { MessageEmbed } = require ('discord.js');
const ServersDB = require ('../../mongo/serverSchema');

module.exports = async (client, guild) => {

    const IntializeDB = new ServersDB({
        ServerID: guild.id,
        ServerPrefix: 'dp.',
        AuditLogs: { Type: String, default: 'purge-logs' }
    });

    IntializeDB.save()

    console.log(`New guild joined, DB Initialized Successfully | ${guild.name} ID: ${guild.id}`)
}
