const rrSchema = require("../../Models/ReactionRoles");
const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("panel")
        .setDescription(" reaction role panel."),
    async execute(interaction) {
        
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription("You don't have `ManageRoles` permission.")
            ], ephemeral: true
        });
        
        const { options, guildId, guild, channel } = interaction;

        try {
            const data = await rrSchema.findOne({ GuildID: guildId });

            if (!data.roles.length > 0)
                return interaction.reply({ content: "This server does not have any data.", ephemeral: true });

            const panelEmbed = new EmbedBuilder()
                .setDescription("Chosir un role en cliquant sur le menu déroulant")
                .setColor("0xf07d00")

            const options = data.roles.map(x => {
                const role = guild.roles.cache.get(x.roleId);

                return {
                    label: role.name,
                    value: role.id,
                    description: x.roleDescription,
                    emoji: x.roleEmoji || undefined
                };
            });

            const menuComponents = [
                new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('reaction-roles')
                        .setMaxValues(options.length)
                        .addOptions(options),
                ),
            ];

            channel.send({ embeds: [panelEmbed], components: menuComponents });

            return interaction.reply({ content: "Succesfully sent your panel.", ephemeral: true });
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