const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unban le membre")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Le membre à unban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Les raisons du unban")
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
  
    const user = interaction.options.getUser("target"); //
    let raison = interaction.options.getString("raison ");

    if (!raison) raison = "Aucune raison fournie";

    await interaction.guild.members
      .unban(user, {
        raison: raison,
      })
      .catch(console.error);

    await interaction.reply({
      content: `Unban **${user.tag}** car **${raison}**`,
    });
  },
};
