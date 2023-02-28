const { commandInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {
    const { customId, values, guild, member } = interaction;
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) {
        return interaction.reply({
          content: "outdated command",
        });
      }
      command.execute(interaction, client);
    } else if (interaction.isButton()) {
      if (customId == "verify") {
        const role = interaction.guild.roles.cache.get("1078708973097734174");
        return interaction.member.roles.add(role).then((member) =>
          interaction.reply({
            content: "You have been verified!",
            ephemeral: true,
          })
        );
      }
    } else if (interaction.isSelectMenu()) {
      if (customId == "reaction-roles") {
        for (let i = 0; i < values.length; i++) {
          const roleId = values[i];

          const role = guild.roles.cache.get(roleId);
          const hasRole = member.roles.cache.has(roleId);

          switch (hasRole) {
            case true:
              member.roles.remove(role);
              break;
            case false:
              member.roles.add(role);
              break;
          }
        }
        interaction.reply({ content: "Vos rôles ont été mis à jour", ephemeral: true });
      } else {
        return;
      }
    }
  },
};
