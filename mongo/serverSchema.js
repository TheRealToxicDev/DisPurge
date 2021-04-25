const mongo = require ('mongoose');

const servers = mongo.Schema({
    ServerID: String,
    ServerPrefix: String,
    AuditLogs: { Type: String, default: 'purge-logs' },
});

module.exports = mongo.model("servers", servers);
