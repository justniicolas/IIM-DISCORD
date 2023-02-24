const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bannir un membre")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Le membre que vous souhaitez bannir")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("raison")
        .setDescription("Les raisons du bannissement")
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
    const user = interaction.options.getUser("target");
    let raison = interaction.options.getString("raison");

    const member = await interaction.guild.members
      .fetch(user)
      .catch(console.error);

    if (!raison) raison = "Pas de raison fournie";

    const banMessage = `Vous avez été banni du serveur ${interaction.guild.name} pour les raisons suivantes:\n ${raison}. \nSi vous pensez que ceci a été fait par erreur, veuillez contacter les modérateurs ou administrateurs du serveur pour obtenir de l'aide.`;
    await user.send(banMessage).catch(console.error);

    await member
      .ban({
        deleteMessageSeconds: 1200,
        reason: raison,
      })
      .catch(console.error);

    await interaction.reply({
      content: `Banni **${user.tag}** pour **${raison}**`,
    });
  },
};
