const {SlashCommandBuilder, AttachmentBuilder} = require("discord.js");
const Canvas = require('@napi-rs/canvas');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ramka')
        .setDescription('Tworzy ramkę wokół obrazka')
        .addAttachmentOption(option => option
            .setName('plik')
            .setDescription('załącznik')
            .setRequired(true)
        )
        .addIntegerOption(option => option
            .setName('grubość')
            .setDescription('Ustala grubość ramki')
            .setRequired(true)
        )
    ,

    async execute(interaction) {
        const img = interaction.options.getAttachment('plik');
        const borderSize = interaction.options.getInteger('grubość');
        const canvas = Canvas.createCanvas(img.width+(2*borderSize), img.height+(2*borderSize));
        const context = canvas.getContext('2d');
        const background = await Canvas.loadImage(img.url);

        context.fillStyle = '#FF0000';
        context.rect(0, 0, canvas.width, canvas.height);
        context.fill();
        context.drawImage(background, borderSize, borderSize, img.width, img.height);

        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'out.png' });

        interaction.reply({ files: [attachment]});
    },
};