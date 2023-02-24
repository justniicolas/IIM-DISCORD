const { EmbedBuilder, GuildMember } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    execute(member) {
        const {user, guild} = member;
        const welcomeChannel = member.guild.channels.cache.get('1076535978115731547');
        const welcomeMessage = `Bienvenue sur le serveur, <@${member.id}>!`;
        const memberRole = '1078707452851277844';

        welcomeEmbed = new EmbedBuilder()
        .setTitle  ('**Nouveau membre**')
        .setDescription (welcomeMessage)
        .setColor  ('#00FF00')
        .addFields({name: 'Membre total', value: `${guild.memberCount}`}) 
        .setTimestamp(); 

        welcomeChannel.send({embeds: [welcomeEmbed]});
        member.roles.add(memberRole);
    }

}