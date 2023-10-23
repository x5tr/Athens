const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(__filename.split(/[\\/]/).pop().split('.').shift())
		.setDescription('world'),
	async execute(interaction) {},
};