const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("botembed")
    .setDescription("Bot Embed")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
  category: "Embed",

  async executeInteractionCreate(interaction) {
    if (interaction.isCommand()) {
      const permissions = new Permissions();

      if (interaction.guild) {
        // Autorise uniquement le rôle "moderator" à exécuter la commande
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
    }
  },
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle("Les détails du BOT IIM")
      .setDescription("IIM - Digital School")
      .setColor(0xf07d00)
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
      .addFields({
        name: "LE BOT IIM",
        value:
          "Le bot IIM est un bot Discord dédié à aider les étudiants de l'IIM à mieux travailler et à s'organiser. Constamment en évolution, il est régulièrement mis à jour pour offrir de nouvelles fonctionnalités et améliorer l'expérience utilisateur. Grâce à lui, vous pouvez rester informé des dernières actualités sur le campus et dans le monde entier, grâce à sa rubrique dédiée. Pour accéder à toutes les commandes disponibles, il vous suffit de taper '/help' dans le chat. Si vous préférez parcourir toutes les options disponibles, vous pouvez simplement taper le caractère '/' pour afficher la liste complète des commandes. Ce bot est développé par Nicolas Becharat, étudiant en 1ème année à l'IIM en Javascipt via Discord.js v14.",
        inline: true,
      });
    await interaction.reply({
      embeds: [embed],
    });
  },
};

