const {EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Verifie un utilisateur')
    .addChannelOption(option => option.setName('channel').setDescription('Channel de vérification').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        const channel = interaction.options.getChannel('channel');
        const verifyEmbed = new EmbedBuilder()
        .setTitle('**Vérification**')
        .setDescription('Veuillez cliquer sur le bouton ci-dessous pour vérifier votre compte')
        .setColor('#00FF00')
         
        let sendChannel = channel.send ({
            embeds : ([verifyEmbed]),
            components : [
                new ActionRowBuilder().setComponents(
                    new ButtonBuilder().setCustomId('verify').setLabel('Vérifier').setStyle(ButtonStyle.Success)

                )
            ]

        });
        if (!sendChannel){
            return interaction.reply({content : 'Il y a eu une erreur lors de l\'envoi du message', ephemeral : true});
        } else ; {
            interaction.reply({content : 'Message envoyé avec succès', ephemeral : true});
        }
    },

    
};
