const Bot = require('./client/index');
const Web = require('./web/index');

const { PORT, TOKEN, MONGO_DB } = process.env;

(async () => {

    let client = await Bot.init(TOKEN);

    await new Web(client).listen(process.env.PORT || 8080);

    console.log(`Website running on port ${client.config.port}`);
})()
