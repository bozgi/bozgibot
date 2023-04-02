const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('huj')
        .setDescription('sussy'),
    async execute(interaction) {
        await interaction.reply("gnuj");
    },
};