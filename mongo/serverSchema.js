const mongo = require ('mongoose');

const servers = mongo.Schema({
    ServerID: String,
    ServerPrefix: { type : String, default: 'dp.', },
    AuditLogs: { type: String, default: 'purge-logs' }
});

module.exports = mongo.model("servers", servers);
