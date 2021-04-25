const mongo = require ('mongoose');

const servers = mongo.Schema({
    ServerID: String,
    ServerPrefix: String,
    AuditLogs: String
});

module.exports = mongo.model("servers", servers);
