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

    ),
    category: "Modération",
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
