const {SlashCommandBuilder, AttachmentBuilder} = require("discord.js");
const Canvas = require('@napi-rs/canvas');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fetchtype')
        .setDescription('Sprawdza typ załącznika')
        .addAttachmentOption(option => option
            .setName('plik')
            .setDescription('załącznik')
            .setRequired(true)
        ),

    async execute(interaction) {
        const canvas = Canvas.createCanvas(700, 250);
        const context = canvas.getContext('2d');
        const img = interaction.options.getAttachment('plik');
        const background = await Canvas.loadImage(img.url);

        context.drawImage(background, 0,0, canvas.width, canvas.height);

        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'out.png' });

        interaction.reply({ files: [attachment]});
    },
};