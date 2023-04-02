const { REST, Routes, Client, Events, GatewayIntentBits, Collection} = require('discord.js');
const { token, client_id } = require("./config.json")
const fs = require('node:fs')
const path = require('node:path')

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath)

for (const file of commandFolders) {
    const commandsPath = path.join(foldersPath, file);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const folder of commandFolders) {
        const filePath = path.join(commandsPath, foldersPath);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`W ${filePath} brakuje "data" lub "execute"`);
        }
    }
}

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`Nie znaleziono komendy pasującej do ${interaction.commandName}!`)
        return
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'Wystąpił problem z wykonywaniem tej komendy!', ephemeral: true })
        } else  {
            await interaction.reply(({ content: 'Wystąpił problem z wykonywaniem tej komendy!', ephemeral: true }))
        }
    }
});

client.once(Events.ClientReady, c => {
    console.log(`Zalogowano jako ${c.user.tag}`)
})

client.login( token );