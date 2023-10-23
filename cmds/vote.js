const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(__filename.split(/[\\/]/).pop().split('.').shift())
		.setDescription('world')
		.addSubcommand(subcommand =>
			subcommand
				.setName('user')
				.setDescription('Info about a user')
				.addUserOption(option => option.setName('target').setDescription('The user'))),
	requiresVote: true,
	async execute(interaction) {
		await interaction.reply(`heLlo worldd!!!11`);
	},
};