const {SlashCommandBuilder, AttachmentBuilder} = require("discord.js");
const Canvas = require('@napi-rs/canvas');
const {GlobalFonts} = require("@napi-rs/canvas");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('impact')
        .setDescription('Dorzuca tekst na obraz')
        .addAttachmentOption(option => option
            .setName('plik')
            .setDescription('załącznik')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('treść')
            .setDescription('Tekst, który ma pojawić się na obrazku')
            .setRequired(true)
        ),

    async execute(interaction) {
        const img = interaction.options.getAttachment('plik');
        let string = interaction.options.getString('treść');
        const canvas = Canvas.createCanvas(img.width, img.height+50);
        const context = canvas.getContext('2d');
        const background = await Canvas.loadImage(img.url);

        let fontSize = 20;
        context.font = `${fontSize}px Comic Sans MS`;

        while (context.measureText(string).width > canvas.width - 20) {
            fontSize-= 2;
            context.font = `${fontSize}px Comic Sans MS`;
        }

        context.fillStyle = '#FFFFFF';
        context.rect(0, 0, canvas.width, canvas.height);
        context.fill();

        context.fillStyle = '#000000';
        context.fillText(string, 20, 30);

        context.drawImage(background,0,50, img.width, img.height);

        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'out.png' });

        interaction.reply({ files: [attachment]});
    },
};