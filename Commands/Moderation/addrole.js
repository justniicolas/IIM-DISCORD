const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addrole")
    .setDescription("Ajouter un rôle à un utilisateur")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Le membre auquel vous souhaitez ajouter un rôle")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("Le rôle que vous souhaitez ajouter à l'utilisateur")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
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
    const roleToAdd = interaction.options.getRole("role");
    const member = await interaction.guild.members
      .fetch(user)
      .catch(console.error);

    if (!member.roles.cache.has(roleToAdd.id)) {
      await member.roles.add(roleToAdd).catch(console.error);
      await interaction.reply({
        content: `Ajout du rôle **${roleToAdd.name}** à **${user.tag}**`,
      });
    } else {
      await interaction.reply({
        content: `**${user.tag}** a déjà le rôle **${roleToAdd.name}**`,
      });
    }
  },
};
