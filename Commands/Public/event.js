const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('evenement')
    .setDescription('Crée un nouvel événement')
    .addStringOption(option => option.setName('nom').setDescription('Nom de l\'événement').setRequired(true))
    .addStringOption(option => option.setName('date').setDescription('Date de l\'événement (format AAAA-MM-JJ)').setRequired(true))
    .addStringOption(option => option.setName('heure').setDescription('Heure de l\'événement (format HH:MM)').setRequired(true))
    .addStringOption(option => option.setName('lieu').setDescription('Lieu de l\'événement').setRequired(true))
    .addStringOption(option => option.setName('description').setDescription('Description de l\'événement').setRequired(true)),
  category: 'Public',
  async execute(interaction) {
    const nom = interaction.options.getString('nom');
    const date = interaction.options.getString('date');
    const heure = interaction.options.getString('heure');
    const lieu = interaction.options.getString('lieu');
    const description = interaction.options.getString('description');

    // Trouver le salon où envoyer l'événement
    const salon = interaction.guild.channels.cache.find(channel => channel.name === 'événements');
    const user = interaction.user;
    const userAvatarURL = user.displayAvatarURL();

    // Créer l'Embed pour l'événement
    const evenementEmbed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(nom)
      .setDescription(description)
      .addFields(
        {
          name: 'Date',
          value: date
        },
        {
          name: 'Heure',
          value: heure
        },
        {
          name: 'Lieu',
          value: lieu
        }
      )
      .setTimestamp()
.setFooter({ text: 'Créé par ' + interaction.user.username, iconUrl: userAvatarURL });


    // Créer un bouton pour valider l'événement
    const validerButtonEvent = new ButtonBuilder()
      .setCustomId('valider_event_button')
      .setLabel('Valider')
      .setStyle('Secondary');

    // Créer une rangée de boutons pour le message d'événement
    const EventbuttonRow = new ActionRowBuilder()
      .addComponents(validerButtonEvent);

    // Envoyer l'événement dans le salon dédié
    const evenementMessage = await salon.send({ content: '@here Nouvel événement en attente de validation !', embeds: [evenementEmbed], components: [EventbuttonRow] });

    // Répondre à l'utilisateur avec un message de confirmation
    interaction.reply({ content: 'Votre événement a été créé avec succès et sera publié dans ' + salon.toString() + ' après validation.', ephemeral: true });

    const modIds = ['997432418808115241']; // Remplacez cela par un tableau d'identifiants de modérateurs

    // Attendre que le bouton "Valider" soit cliqué par un modérateur
    const filter = interaction => interaction.customId === 'valider_event_button' && modIds.includes(interaction.user.id);
    const collector = evenementMessage.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', async interaction => {
      // Valider l'événement et l'afficher à tout le monde
      evenementEmbed.spliceFields(0, 0, { name: 'Statut', value: 'Validé' });
      await evenementMessage.edit({ content: 'Nouvel événement !', embeds: [evenementEmbed], components: [] });
      await interaction.update({ content: '✅ Événement validé avec succès', components: [] });
      const creator = interaction.user;
      const creatorMessage = `Votre événement **${nom}** a été validé et sera publié dans ${salon.toString()}. Merci de l'avoir créé !`;
      creator.send(creatorMessage);
    });

  }

};