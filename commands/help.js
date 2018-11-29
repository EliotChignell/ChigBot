let index = require('./../index.js');

module.exports = {
	name: 'help',
	description: 'Ping!',
	execute(message) {
		index.data.otherVars.sendEmbed = true;
		index.data.otherVars.eTitle = 'Help';
		index.data.otherVars.eDescription = 'The commands available are:\n```help, ping, info, coinflip```';
	},
};