const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unban le membre")
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

  async execute(interaction, client) {
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
