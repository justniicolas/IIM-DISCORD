const { Client , GatewayIntentBits, Partials, Collection } = require('discord.js');


const { Guilds, GuildMembers , GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Channel } = Partials;

const {loadEvents} = require('./Handlers/eventHandler.js');
const {loadCommands} = require('./Handlers/commandHandler.js');

const client = new Client({
    intents : [ Guilds, GuildMembers, GuildMessages ],
    partials : [ User, Message, GuildMember, ThreadMember ],
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.commands = new Collection();
client.config = require ('./config.json');

module.exports = client;

client.login(client.config.token).then(() => {
    loadEvents(client);
    loadCommands(client);
});
