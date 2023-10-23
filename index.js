const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('node:fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const shell = require('shelljs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const express = require('express')
const app = express()

require('dotenv').config();

app.get('/', (req, res) => {
	res.send('Hello World!')
})
  
app.listen(3000)

function getCommands() {
	fs.rmSync('commands', { recursive: true, force: true });
	shell.exec(`git clone ${process.env.REPOSITORY} Athens`);
	shell.mv('-f', 'Athens/commands', 'commands');
	shell.rm('-rf', 'Athens');
}

function setNewCommandsCollection() {
	client.commands = new Collection();

	const commandFiles = fs.readdirSync('commands').filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const command = require(`commands/${file}`);
		client.commands.set(command.data.name, command);
	}
}
getCommands();
setNewCommandsCollection();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (interaction.commandName === 'reload') {
		await interaction.deferReply({ ephemeral: true });

		getCommands();
		
		const commands = [];
		const commandFiles = fs.readdirSync('commands').filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {
			const newCommand = require(`commands/${file}`);
			commands.push(newCommand.data.toJSON());
		}

		const reloadCommand = new SlashCommandBuilder()
						.setName('reload')
						.setDescription('Reload commands.')
						.setDefaultPermission(false)
						.toJSON();
		const reloadCommandPermissions = [
			{
				id: '437509885458907138',
				type: 'USER',
				permission: true,
			},
		];

		commands.push(reloadCommand);

		const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

		rest.put(Routes.applicationGuildCommands(process.env.APPLICATION_ID, process.env.GUILD_ID), { body: commands })
			.catch(console.error);

		setNewCommandsCollection();
		await interaction.editReply({ content: `:recycle: Reloaded ${commands.length} application commands.`, ephemeral: true });

		return;
	}

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(process.env.TOKEN);