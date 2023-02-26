const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("welcomeembed")
    .setDescription("Welcome Embed"),
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
      .setTitle("Bienvenue sur le serveur IIM - Digital School !")
      .setDescription("IIM - Digital School")
      .setColor(0x00ae86)
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
          name: "RENTREE 2023",
          value: "Bienvenue sur le serveur IIM - Digital School !, Nous sommes heureux de vous compter parmi nous ! L'objectif de ce serveur est de vous permettre de vous informer sur les événements à l'IIM et dans le campus, de rassembler les étudiants dans un seul serveur Discord, mais aussi de travailler en effet plusieurs catégories, salons, ou encore commandes sont mis à votre disposition pour améliorer la vie sur le serveur et le campus. Je vous invite à venir découvrir le serveur et ces commandes pour apprécier pleinement le serveur !",
          inline: true,
        }
      );
    await interaction.reply({
      embeds: [embed],
    });
  },
};
