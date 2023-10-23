const { SlashCommandBuilder } = require('@discordjs/builders');


function commandName() {
	if (__filename.indexOf('/') === -1) {
		return __filename.split('\\').pop().split('.').shift();
	}
	return __filename.split('/').pop().split('.').shift();
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName(commandName())
		.setDescription('world')
		.addSubcommand(subcommand =>
			subcommand
				.setName('user')
				.setDescription('Info about a user')
				.addUserOption(option => option.setName('target').setDescription('The user'))),
		
	async execute(interaction) {
		await interaction.reply(`heLlo worldd!!!11 ${commandName()} ${3523}`);
	},
};