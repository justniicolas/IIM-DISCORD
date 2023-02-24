const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear les messages")
    .addIntegerOption((option) =>
      option
        .setName("nombre")
        .setDescription("Le nombre de messages à supprimer")
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
    const count = interaction.options.getInteger("nombre");
    if (count < 1 || count > 100) {
      return interaction.reply({
        content: "Vous devez saisir un nombre compris entre 1 et 10",
        ephemeral: true,
      });
    }

    await interaction.channel.bulkDelete(count, true).catch(console.error);

    await interaction.reply({
      content: ` **${count}** messages supprimés`,
      ephemeral: true,
    });
  },
};
