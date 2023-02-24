const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("report")
    .setDescription("Report un membre")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Le membre que report")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Les raisons du report")
        .setRequired(true)
    ),
    category : "Modération",
  async execute(interaction) {
    const hasPermission = interaction.member.roles.cache.some((r) =>
      r.permissions.has(PermissionFlagsBits.ManageMessages)
    );

    if (!hasPermission) {
      await interaction.reply({
        content: "Vous n'avez pas la permission pour cette commande.",
        ephemeral: true,
      });
      return;
    }

    const target = interaction.options.getUser("target");
    const raison = interaction.options.getString("raison");
    const author = interaction.user;

    const embed = new EmbedBuilder()
      .setTitle("Nouveau report")
      .setDescription(
        `Un nouveau report a été fait par ${author} contre ${target}`
      )
      .addFields(
        {
          name: "Membre report",
          value: `${target} (*${target.tag}*)`,
          inline: true,
        },
        {
          name: "Report par",
          value: `${author} (**${author.tag}**)`,
          inline: true,
        },
        { name: "Raison", value: `${raison}` }
      )
      .setColor("#FF0000")
      .setTimestamp();

    const channelId = "1076598329191964674";
    const channel = interaction.guild.channels.cache.get(channelId);
    if (!channel) {
      return console.error(
        `Le channel avec l'ID **${channelId}** n'a pas été trouvé!`
      );
    }

    await channel.send({ embeds: [embed] });
    await interaction.reply({
      content: `Le report a été envoyé à **${channel.toString()}**.`,
      ephemeral: true,
    });
  },
};
