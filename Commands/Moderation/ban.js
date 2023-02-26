const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bannir un membre")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
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
  
    async executeInteractionCreate(interaction) {
      if (interaction.isCommand()) {
        const permissions = new Permissions();
  
        if (interaction.guild) {
          permissions.add(
            {
            id: "1076918937394094221", // ID du rôle "moderator"
            permission: true,
          }
          );
        }
          await interaction.command.permissions.set({ permissions });
      }
    },
  async execute(interaction, client) {

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
