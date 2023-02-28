const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info-evenement')
    .setDescription('Affiche des informations sur un événement')
    .addStringOption(option => option.setName('nom')
      .setDescription('Le nom de l\'événement')
      .setRequired(true)),
  category: 'Public',
  async execute(interaction) {
    // Récupérer les événements dans le salon dédié
    const salon = interaction.guild.channels.cache.find(channel => channel.name === 'événements');
    const messages = await salon.messages.fetch();

    // Filtrer les messages qui contiennent des événements non validés
    const evenements = messages.filter(message => message.author.id === interaction.client.user.id && message.embeds.length > 0 && message.embeds[0].fields.length === 4);

    // Trouver l'événement correspondant au nom donné en option
    const nomEvenement = interaction.options.getString('nom');
    const selectedEvenement = evenements.find(message => message.embeds[0].title === nomEvenement);

    // Vérifier si un événement a été trouvé
    if (!selectedEvenement) {
      return interaction.reply({ content: `L'événement "${nomEvenement}" n'a pas été trouvé.`, ephemeral: true });
    }

    // Créer l'Embed pour afficher les informations sur l'événement sélectionné
    const evenementEmbed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(selectedEvenement.embeds[0].title)
      .setDescription(selectedEvenement.embeds[0].description)
      .addFields(
        { name: 'Date', value: selectedEvenement.embeds[0].fields[1].value, inline: true },
        { name: 'Heure', value: selectedEvenement.embeds[0].fields[2].value, inline: true },
        { name: 'Lieu', value: selectedEvenement.embeds[0].fields[3].value, inline: true }
      )
      
      .setTimestamp();

    // Envoyer l'Embed avec les informations sur l'événement sélectionné
    interaction.reply({ embeds: [evenementEmbed], ephemeral: true });
  }
};