const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Répond avec Pong!'),
    category : 'Public',
    execute(interaction) {
        interaction.reply({content : 'Pong!', ephemeral: true});
    }
};
