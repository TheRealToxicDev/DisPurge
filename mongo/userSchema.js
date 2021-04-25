const { Schema, model } = require ('mongoose');

module.exports = model("users", new Schema({
    UserID: { type: String, default: '00000000000000' },
    Username: { type: String, default: 'DefaultUser' },
    LastPurge: { type: Map, default: { MessageChannel: 'User has not Purged any Messages', Amount: 0 }}
}));
