const Bot = require('./index');
const Web = require('./utils/website');

const { PORT, TOKEN, MONGO_DB } = process.env;

(async () => {

    let client = await Bot.init(TOKEN);

    await new Web(client).listen(process.env.PORT || 8080);

    console.log(`Website running on port ${client.config.port}`);
})()
