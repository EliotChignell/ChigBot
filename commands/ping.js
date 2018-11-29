let index = require('./../index.js');

module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message) {
		index.data.otherVars.sendEmbed = true;
		index.data.otherVars.eDescription = '**Pong!** :ping_pong:\n:signal_strength: Ping: '+Math.floor(index.data.client.ping)+'ms';
	},
};