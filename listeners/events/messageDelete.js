const moment = require('moment');

module.exports = (client, message) => {

if (client.snipe.has(message.guild.id)) client.snipe.delete(message.guild.id); //Check if there are any other recent messages
client.snipe.add(message.guild.id); //Add the guild

client.snipe[message.guild.id] = {
  message: message.content,
  name: message.author.tag,
  channel: message.channel.name,
  time: moment(message.createdAt).format('YYYY-MM-DD'),
  image: message.attachments.first() ? message.attachments.first().proxyURL : null
  };
};
