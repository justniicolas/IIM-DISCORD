const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removerole")
    .setDescription("Retier un rôle à un membre")
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
  async execute(interaction) {
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
