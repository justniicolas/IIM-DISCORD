const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Time Out le membre mentionné")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Le membre à time out")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("time")
        .setDescription("Le temps du time out (en secondes)")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("raison")
        .setDescription("Les raisons du time out")
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
    const time = interaction.options.getInteger("temps");
    const member = await interaction.guild.members
      .fetch(user)
      .catch(console.error);

    if (!raison) raison = "No reason provided";

    const timeoutMessage = `Vous avez été time out du serveur **${interaction.guild.name}** pour les raisons suivantes:\n **${raison}**. \nSi vous pensez que ceci a été fait par erreur, veuillez contacter les modérateurs ou administrateurs du serveur pour obtenir de l'aide.`;
    await user.send(timeoutMessage).catch(console.error);
    await member.timeout(time * 1000 * 60, reason).catch(console.error);

    await interaction.reply({
      content: `Time Out **${user.tag} pour **${raison}**`,
    });
  },
};
