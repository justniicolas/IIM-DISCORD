const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("slowmode")
    .setDescription("Mettre un slowmode sur un salon")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
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
    async executeSlashCommand(interaction) {
      if (!interaction.member.permissions.has(Permissions.FLAGS.Administrator)) {
        await interaction.reply({
          content: "Vous n'avez pas la permission d'exécuter cette commande.",
          ephemeral: true,
        });
        return;
      }
  
      await interaction.reply("Example command executed!");
    },
  
    // Gère les autorisations pour les rôles spécifiques
    async executeInteractionCreate(interaction) {
      if (interaction.isCommand()) {
        // Crée une nouvelle collection de permissions
        const permissions = new Permissions();
  
        // Autorise uniquement le rôle "moderator" à exécuter la commande
        if (interaction.guild) {
          permissions.add({
            id: "1076918937394094221",
            permission: true,
          });
        }
  
        // Applique les permissions à la commande
        await interaction.command.permissions.set({ permissions });
      }
    },
  async execute(interaction, client) {

    const channel = interaction.options.getChannel("channel");
    const time = interaction.options.getInteger("time");

    await channel.setRateLimitPerUser(time).catch(console.error);

    await interaction.reply({
      content: `Slowmode actif avec un temps de **${time}**s pour **${channel.name}**`,
      ephemeral: true,
    });
  },
};
