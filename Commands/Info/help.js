const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Affiche la liste des commandes disponibles"),
    category: "Aide",
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
        const commandDescriptions = categoryCommands.map((command) => `- /${command.data.name} : ${command.data.description}`).join("\n");
        return `**${category}**\n${commandDescriptions}`;
      })
      .join("\n");

    await interaction.reply(`Voici toutes les commandes disponibles:\n${commandList}`);
  },
};
