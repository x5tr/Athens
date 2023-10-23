const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(__filename.split(/[\\/]/).pop().split('.').shift())
		.setDescription('world')
		.addSubcommand(subcommand =>
			subcommand
				.setName('user')
				.setDescription('Info about a user')
				.addUserOption(option => option.setName('target').setDescription('The user')))
		.addSubcommand(subcommand =>
			subcommand
				.setName('reason')
				.setDescription('Info about a user')
				.addStringOption(option => option.setName('reason').setDescription('The reason why you ban the user'))),
	requiresVote: true,
	async execute(interaction) {
		await interaction.reply(`The user is not banned, because idk i forgor :skull:`);
	},
};