const { commandInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",

  execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) {
        interaction.reply({
          content: "There was an error while executing this command!",
        });
      }
      command.execute(interaction, client);
    } else if (interaction.isButton()) {
        const role = interaction.guild.roles.cache.get('1078708973097734174');
        return interaction.member.roles.add(role).then((member) => {
            interaction.reply({
                content: 'Role added',
                ephemeral: true
            })
        })
    } else {
        return;
    }
  },
};
