const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('info wywolawcy komendy')
        .addUserOption(option =>
        option
            .setName('user')
            .setDescription('wybiera użytkownika do sprawdzenia')
        ),
    async execute(interaction) {
        const target = interaction.guild.members.cache.get(interaction.options.getUser('user').id);
        if (target === null) {
            await interaction.reply(`Komenda wywołana przez ${interaction.user.username}, który dołączył ${interaction.member.joinedAt}`);
        } else {
            await interaction.reply(`Użytkownik ${target.user.tag}, dołączył ${target.joinedAt} i jego status to ${target.mute}`);
        }
    }

}