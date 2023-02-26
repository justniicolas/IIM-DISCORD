const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear les messages")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addIntegerOption((option) =>
      option
        .setName("nombre")
        .setDescription("Le nombre de messages à supprimer")
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
    
    const count = interaction.options.getInteger("nombre");
    if (count < 1 || count > 100) {
      return interaction.reply({
        content: "Vous devez saisir un nombre compris entre 1 et 10",
        ephemeral: true,
      });
    }

    await interaction.channel.bulkDelete(count, true).catch(console.error);

    await interaction.reply({
      content: ` **${count}** messages supprimés`,
      ephemeral: true,
    });
  },
};
