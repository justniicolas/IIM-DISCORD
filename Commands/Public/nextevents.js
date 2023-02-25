const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('prochains-evenements')
    .setDescription('Affiche les prochains événements à venir'),
  category: 'Public',
  async execute(interaction) {
    // Récupérer les événements dans le salon dédié
    const salon = interaction.guild.channels.cache.find(channel => channel.name === 'événements');
    const messages = await salon.messages.fetch();

    // Filtrer les messages qui contiennent des événements non validés
    const evenements = messages.filter(message => message.author.id === interaction.client.user.id && message.embeds.length > 0 && message.embeds[0].fields.length === 3);

    // Trier les événements par date
    const sortedEvenements = evenements.sort((a, b) => {
      const dateA = new Date(a.embeds[0].fields[0].value);
      const dateB = new Date(b.embeds[0].fields[0].value);
      return dateA - dateB;
    });

    // Créer l'Embed pour afficher les prochains événements
    const evenementsEmbed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Prochains événements')
      .setTimestamp();

    // Ajouter chaque événement à l'Embed
    sortedEvenements.forEach(message => {
      const evenementEmbed = message.embeds[0];
      evenementsEmbed.addFields({ name: evenementEmbed.title, value: `${evenementEmbed.fields[0].value} à ${evenementEmbed.fields[1].value}` });
        });

    // Envoyer l'Embed avec les prochains événements
    interaction.reply({ embeds: [evenementsEmbed], ephemeral: true });
  }
};
