const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("slowmode")
    .setDescription("Mettre un slowmode sur un salon")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Le salon sur lequel mettre le slowmode")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("time")
        .setDescription("Le temps du slowmode (en secondes)")
        .setRequired(true)
    ),
    category : "Modération",
  async execute(interaction, client) {
    t;
    const hasPermission = interaction.member.roles.cache.some((r) =>
      r.permissions.has(PermissionFlagsBits.ManageMessages)
    );

    if (!hasPermission) {
      await interaction.reply({
        content: "Vous n'avez pas la permission d'exécuter cette commande.",
        ephemeral: true,
      });
      return;
    }

    const channel = interaction.options.getChannel("channel");
    const time = interaction.options.getInteger("time");

    await channel.setRateLimitPerUser(time).catch(console.error);

    await interaction.reply({
      content: `Slowmode actif avec un temps de **${time}**s pour **${channel.name}**`,
    });
  },
};
