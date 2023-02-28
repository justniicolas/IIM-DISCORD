const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("embed").setDescription("Embed test").setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
  category: "Embed",
  async executeInteractionCreate(interaction) {
    if (interaction.isCommand()) {

      const permissions = new Permissions();

      if (interaction.guild) { // Autorise uniquement le rôle "moderator" à exécuter la commande
        permissions.add(
        {
          id: "1076918937394094221",
          permission: true,
        },
        {
          id: "1076211711729750026",
          permission: true,
        }
        );
      }

      await interaction.command.permissions.set({ permissions });
    }
  },
  async execute(interaction, client) {
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
