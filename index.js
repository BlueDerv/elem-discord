const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const {clientId, token, defaultGuild} = require ('./const.js');
const {commands,commandHandlers} = require('./commands.js');
const comboHandler = require("./combo-handler.js");
const elementInfo = require("./info.js");
const vote = require('./vote.js');

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(clientId, defaultGuild),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS'] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

        
    commandHandlers[interaction.commandName](interaction);
});

client.on('messageCreate', comboHandler);
client.on('messageCreate', elementInfo);

client.login(token);
