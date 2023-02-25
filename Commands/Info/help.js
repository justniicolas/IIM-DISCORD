const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Affiche la liste des commandes disponibles")
    .addStringOption(option =>
      option.setName("command")
        .setDescription("Affiche l'aide pour une commande spécifique")
        .setRequired(false)
    ),
  category: "Info",
  async execute(interaction) {
    const commands = interaction.client.commands;
    commands.sort((a, b) => {
      if (a.data.name < b.data.name) {
        return -1;
      }
      if (a.data.name > b.data.name) {
        return 1;
      }
      if (a.category < b.category) {
        return -1;
      }
      if (a.category > b.category) {
        return 1;
      }
      return 0;
    });

    const categories = [...new Set(commands.map((command) => command.category))];
    const commandList = categories
      .map((category) => {
        const categoryCommands = commands.filter((command) => command.category === category);
        const commandNames = categoryCommands.map((command) => `\`${command.data.name}\``).join(", ");
        return `**${category}**\n${commandNames}`;
      })
      .join("\n\n");

    const commandOption = interaction.options.getString("command");
    if (commandOption) {
      const command = commands.find((cmd) => cmd.data.name === commandOption);
      if (command) {
        await interaction.reply({content: `ℹ️ Voici les informations pour la commande \`${command.data.name}\` :\n\n${command.data.description}`, ephemeral : true});
      } else {
        await interaction.reply({ content :`❌ La commande \`${commandOption}\` n'a pas été trouvée. Veuillez saisir une commande valide.`, ephemeral : true});
      }
    } else {
      await interaction.reply({ content: `📜 Voici toutes les commandes disponibles:\n\n${commandList}\n`, ephemeral: true });
    }
  },
};
