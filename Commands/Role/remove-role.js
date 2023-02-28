const rrSchema = require("../../Models/ReactionRoles.js");
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove-role")
    .setDescription("remove a role to the reaction role list")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("The role to remove to the reaction role list")
        .setRequired(true)
    ),

  async execute(interaction) {
    const { options, guildId, member } = interaction;

    const role = options.getRole("role");

    try {
      const data = await rrSchema.findOne({ guildID: guildId });

      if (!data)
        return interaction.reply({
          content: `There is no reaction role list for this server!`,
        });
      const roles = data.roles;
      const findRole = roles.find((x) => x.roleId === role.id);

      if (!findRole)
        return interaction.reply({
          content: `There is no reaction role list for this server!`,
        });
      const fileterRole = roles.filter((x) => x.roleId !== role.id);
      data.roles = fileterRole;

        await data.save();

      return interaction.reply({
        content: `Added ${role.name} to the reaction role list!`,
      });
    } catch (err) {
      console.error(err);
      return interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};
