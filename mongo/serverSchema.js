const mongo = require ('mongoose');

const servers = mongo.Schema({
    ServerID: String,
    ServerPrefix: { Type: String, default: 'dp.' },
    AuditLogs: { Type: String, default: 'purge-logs' }
});

module.exports = mongo.model("servers", servers);
