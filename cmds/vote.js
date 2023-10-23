const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(__filename.split(/[\\/]/).pop().split('.').shift())
		.setDescription('world')
	requiresVote: true,
	async execute(interaction) {},
};