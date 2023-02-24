const {Client} = require('discord.js');
const mongoose = require('mongoose');
const config = require('../../config.json');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        await mongoose.connect (config.mongodb || '', {
            keepAlive: true,
        }); 
        mongoose.set('strictQuery', false);
        if (mongoose.connect){
            console.log('Connected to MongoDB');
        }
    
        console.log(`Logged in as ${client.user.username}!`);

    }, 
};