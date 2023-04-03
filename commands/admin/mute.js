const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("wycisz")
        .setDescription("Wycisza użytkownika")
        .addUserOption(option =>
            option
                .setName('użytkownik')
                .setDescription('wyiera uzytkownika do wyciszenia')
                .setRequired(true)
        ).setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers),

    async execute(interaction){
        const target = interaction.options.getUser('użytkownik');
        await interaction.guild.members.edit(target, {mute: true});
        interaction.reply(`Wyciszono użytkownika ${target}!`)
    }
}