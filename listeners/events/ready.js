  
const { readdirSync } = require("fs")
const { join } = require("path")
const filePath2 = join(__dirname, "..", "events");
const eventFiles2 = readdirSync(filePath2);
const timers = require("timers");

const mongo = require ('mongoose');

mongo.connect(client.config.mongo_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true},(err) => {
  if (err) return console.error(err);
  console.log("MONGODB IS CONNECTED")
  })

module.exports = async (client) => {          

  let activities = [
    {
      name: 'Purging your Server!',
      options: {
        type: 'STREAMING',
        url: "https://www.twitch.tv/monstercat"
      }
    },
    {
      name: 'dp.help',
      options: {
        type: 'STREAMING',
        url: "https://www.twitch.tv/monstercat"
      }
    },
    {
      name: `${client.users.cache.size} Users`,
      options: {
        type: 'WATCHING'
      }
    },
    {
      name: `${client.guilds.cache.size} Guilds`,
      options: {
        type: 'WATCHING'
      }
    },
    {
      name: ` with ${client.commands.size} Commands`,
      options: {
        type: 'PLAYING'
       }
      }
  ];
  let i = 0;

   timers.setInterval(() => {
    i = i == activities.length ? 0 : i;
   client.user.setActivity(activities[i].name, activities[i].options);
    i++;
  }, 30000);
  

  console.log(`Signed in as ${client.user.username} || Loaded [${eventFiles2.length}] event(s) & [${client.commands.size}] command(s)`);
}
