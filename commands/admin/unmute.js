const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("odcisz")
        .setDescription("Odcisza użytkownika")
        .addUserOption(option =>
            option
                .setName('użytkownik')
                .setDescription('wyiera uzytkownika do odciszenia')
                .setRequired(true)
        ).setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers),

    async execute(interaction){
        const target = interaction.options.getUser('użytkownik');
        await interaction.guild.members.edit(target, {mute: false});
        interaction.reply(`Odciszono użytkownika ${target}!`)
    }
}