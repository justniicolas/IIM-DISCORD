const {Client, ModalBuilder} = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Logged in as ${client.user.username}!`);

    }, 
};