const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removerole")
    .setDescription("Retier un rôle à un membre")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Le membre auquel vous souhaitez retirer un rôle")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("Le rôle que vous souhaitez retirer à l'utilisateur")
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
  async execute(interaction) {
  
    const user = interaction.options.getUser("target");
    const roleToRemove = interaction.options.getRole("role");
    const member = await interaction.guild.members
      .fetch(user)
      .catch(console.error);

    if (member.roles.cache.has(roleToRemove.id)) {
      await member.roles.remove(roleToRemove).catch(console.error);
      await interaction.reply({
        content: `Suppression du rôle **${roleToRemove.name}** pour **${user.tag}**`,
      });
    } else {
      await interaction.reply({
        content: `**${user.tag}** n'a pas le rôle **${roleToRemove.name}**`,
      });
    }
  },
};
