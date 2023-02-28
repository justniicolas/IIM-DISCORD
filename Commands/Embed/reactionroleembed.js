const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("reactionembed")
      .setDescription("reactionBotEmbed")
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
        .setTitle("Les détails du reaction role du BOT IIM")
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
          name: "REACTION ROLE BOT IIM",
          value:
            "Le bot IIM permet d'ajouter des rôles. Avec le réaction role qui est mis en place en bas vous pouvez choisir une des majeurs que vous avez à l'IIM. Pour cela il vous suffit de cliquer sur la réaction correspondant à votre majeur. Si vous vous trompez de majeur n'hésiter à créer un ticket et la modération viendra vous retirez le rôle que vous vous êtes mis par erreur.",
          inline: true,
        });
      await interaction.reply({
        embeds: [embed],
      });
    },
  };
  
  