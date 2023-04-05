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
        .addStringOption(option => option
            .setName('kolor')
            .setDescription("Wybiera Kolor obramowania (hexcode)")
            .setRequired(false)
        )
    ,

    async execute(interaction) {
        const img = interaction.options.getAttachment('plik');
        const borderSize = interaction.options.getInteger('grubość');
        const color = interaction.options.getString('kolor');
        const canvas = Canvas.createCanvas(img.width+(2*borderSize), img.height+(2*borderSize));
        const context = canvas.getContext('2d');
        const background = await Canvas.loadImage(img.url);

        console.log(color)

        if (color == null) {
            context.fillStyle = '#FFFFFF';
        } else if (color.startsWith('#')) {
            context.fillStyle = color;
        } else {
            context.fillStyle = `#${color}`;
        }

        context.rect(0, 0, canvas.width, canvas.height);
        context.fill();
        context.drawImage(background, borderSize, borderSize, img.width, img.height);

        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'out.png' });

        interaction.reply({ files: [attachment]});
    },
};