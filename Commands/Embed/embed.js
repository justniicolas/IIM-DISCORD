const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("embed").setDescription("Embed test"),
  category : 'Embed',

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
    const embed = new EmbedBuilder()
      .setTitle("Titre")
      .setDescription("Description")
      .setColor(0x00ae86)
      .setImage(client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp(Date.now())
      .setAuthor({
        url: "https://nicolas-becharat.com",
        iconURL: interaction.user.displayAvatarURL(),
        name: interaction.user.tag,
      })
      .setFooter({
        iconURL: client.user.displayAvatarURL(),
        text: client.user.tag,
      })
      .setURL("https://www.iim.fr/")
      .addFields(
        {
          name: "Champ 1",
          value: "Contenu 1",
          inline: true,
        },
        {
          name: "Champ 2",
          value: "Contenu 2",
          inline: true,
        }
      );
    await interaction.reply({
      embeds: [embed],
    });
  },
};
