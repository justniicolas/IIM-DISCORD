const rrSchema = require("../../Models/ReactionRoles");
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("add-role")
        .setDescription("Add custom reaction role.")
        .addRoleOption(option =>
            option.setName("role")
                .setDescription("Role to be assigned")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("description")
                .setDescription("Description of the role.")
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName("emoji")
                .setDescription("Emoji for the role.")
                .setRequired(false)
        ),
    async execute(interaction) {
       // Permission
       if (!interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) return interaction.reply({
        embeds: [
            new EmbedBuilder()
                .setDescription("You don't have `ManageRoles` permission.")
        ], ephemeral: true
    });
        const { options, guildId, member } = interaction;

        const role = options.getRole("role");
        const description = options.getString("description");
        const emoji = options.getString("emoji");

        try {

            if (role.position >= member.roles.highest.position)
                return interaction.reply({ content: "I don't have permissions for that.", ephemeral: true });

            const data = await rrSchema.findOne({ GuildID: guildId });

            const newRole = {
                roleId: role.id,
                roleDescription: description || "No description.",
                roleEmoji: emoji || "",
            }

            if (data) {
                let roleData = data.roles.find((x) => x.roleId === role.id);

                if (roleData) {
                    roleData = newRole;
                } else {
                    data.roles = [...data.roles, newRole]
                }

                await data.save();
            } else {
                await rrSchema.create({
                    GuildID: guildId,
                    roles: newRole,
                });
            }

            return interaction.reply({ content: `Created new role **${role.name}**` });

        } catch (err) {
            console.log(err);
            const EmbedError = new EmbedBuilder()
                    .setTitle("Error")
                    .setDescription("Something went wrong. Please contact the developers")
                    .setColor("Red")
                    .setTimestamp()
    
                await interaction.reply({ embeds: [EmbedError], ephemeral: true });
        }
    }
}