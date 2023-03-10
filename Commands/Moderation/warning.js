const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warning")
    .setDescription("Envoye un avertissement à un membre")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Le membre à avertir")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("raison")
        .setDescription("Les raisons de l'avertissement")
        .setRequired(true)
    ),
    category : "Modération",
    async executeSlashCommand(interaction) {
      if (!interaction.member.permissions.has(Permissions.FLAGS.Administrator)) {
        await interaction.reply({
          content: "Vous n'avez pas la permission d'exécuter cette commande.",
          ephemeral: true,
        });
        return;
      }
  
      await interaction.reply("Example command executed!");
    },
  
    // Gère les autorisations pour les rôles spécifiques
    async executeInteractionCreate(interaction) {
      if (interaction.isCommand()) {
        // Crée une nouvelle collection de permissions
        const permissions = new Permissions();
  
        // Autorise uniquement le rôle "moderator" à exécuter la commande
        if (interaction.guild) {
          permissions.add({
            id: "1076918937394094221",
            permission: true,
          });
        }
  
        // Applique les permissions à la commande
        await interaction.command.permissions.set({ permissions });
      }
    },
  async execute(interaction, client) {
  
    const user = interaction.options.getUser("target");
    let raison = interaction.options.getString("raison");
    const member = await interaction.guild.members
      .fetch(user)
      .catch(console.error);

    if (!raison) reason = "No reason provided";

    const warningMessage = `Vous avez été averti sur le serveur **${interaction.guild.name}** pour les raisons suivantes:\n **${raison}**. \n C'est un avertissement formel et des violations supplémentaires peuvent entraîner des mesures disciplinaires, jusqu'à et y compris un bannissement du serveur. Si vous avez des questions ou des préoccupations, veuillez contacter les modérateurs ou les administrateurs du serveur pour obtenir de l'aide.`;
    await user.send(warningMessage).catch(console.error);

    const warningLogChannel = interaction.guild.channels.cache.find(
      (channel) => channel.name === "warning-logs"
    );
    if (!warningLogChannel) {
      await interaction.reply({
        content: "Le salon de log des avertissements n'a pas été trouvé.",
        ephemeral: true,
      });
      return;
    }

    await warningLogChannel.send(
      `**${user.tag}** a reçu un avertissement **${interaction.user.tag}** car: **${raison}**`
    );

    await interaction.reply({
      content: `Un avertissement a été envoyé **${user.tag} car ${raison}`,
    });
  },
};
