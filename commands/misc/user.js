const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('info wywolawcy komendy'),
    async execute(interaction) {
        await interaction.reply(`Komenda wywołana przez ${interaction.user.username}, który dołączył ${interaction.member.joinedAt}`)
    }

}