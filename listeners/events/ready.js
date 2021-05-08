  
const { readdirSync } = require("fs")
const { join } = require("path")
const filePath2 = join(__dirname, "..", "events");
const eventFiles2 = readdirSync(filePath2);
const timers = require("timers");

const fetch = require ('node-fetch');
const mongo = require ('mongoose');

mongo.connect(process.env.MONGO_DB, {
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
  
  const Infinity = require("infinityapi.js")
  const ibl = new Infinity(client.user.id, process.env.IBL_AUTH)
  
  ibl.post(client.guilds.cache.size, '0') // Server Count and 0 Shards

        /** fetch(`https://api.infinitybotlist.com/bot/835997853263462461 `, {
            method: "POST",
            headers: {
                "authorization": process.env.IBL_AUTH,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                servers: client.guilds.cache.size,
                shards: '1'
            })
        }).then(async res => console.log(await res.json())) */

  console.log(`Signed in as ${client.user.username} || Loaded [${eventFiles2.length}] event(s) & [${client.commands.size}] command(s)`);
}
