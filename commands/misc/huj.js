const {SlashCommandBuilder} = require("discord.js");

let object = {
    data: 'twoja stara'
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('huj')
        .setDescription('sussy'),
    async execute(interaction) {
        await interaction.reply("gnuj");
    },
};