const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("wycisz")
        .setDescription("Wycisza lub odcisza uzytkownika vc")
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('wyiera uzytkownika do wyciszenia')
                .setRequired(true)
        ).setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers),

    async execute(interaction){
        const target = interaction.options.getUser('user');
        if (interaction.options.getUser('user').mute) {
            await interaction.guild.members.edit(target, {mute: false});
            interaction.channel.send(`Odciszono użytkownika ${target}!`)
        } else {
            await interaction.guild.members.edit(target, {mute: true});
            interaction.channel.send(`Wyciszono użytkownika ${target}!`)
        }
    }
}