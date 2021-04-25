const { Schema, model } = require ('mongoose');

module.exports = model("users", new Schema({
    UserID: { type: String, default: '00000000000000' },
    Username: { Type: String, default: 'DefaultUser' },
    LastPurge: { Type: Map, default: { MessageChannel: 'User has not Purged any Messages', Amount: 0 }}
}));
