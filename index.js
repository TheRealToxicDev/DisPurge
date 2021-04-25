const { Client, Collection } = require ('discord.js');
const config = require ('./config');

const client = new Client({
    disableMentions: 'everyone',
    disabledEvents: ['TYPING_START']
});

client.commands = new Collection();
client.aliases = new Collection();

client.limits = new Map();
client.snipe = new Set()

client.config = config;
client.logs = console.log;

const commands = require ('./utils/commands');
commands.run(client);

const events = require ('./utils/events');
events.run(client);

client.login(client.config.token);