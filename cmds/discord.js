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
		.setDescription('i think discord is...')
		.setDefaultPermission(false),
	permissions: [
		{
			id: '437509885458907138',
			type: 'USER',
			permission: false,
		},
	],
	async execute(interaction) {
		await interaction.reply('This command requires nitro.');
	},
};