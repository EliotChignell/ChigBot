let index = require('./../index.js');

/*
sendEmbed = true;
      index.data.otherVars.eTitle = 'Flipped a coin!';
      if (Math.random() <= 0.5) {
        index.data.otherVars.eDescription = 'Heads!';
      } else {
	    index.data.otherVars.eDescription = 'Tails!';
      }
*/

module.exports = {
    name: 'coinflip',
    description: 'Flips a coin.',
    aliases: ['coin','flipcoin'],
    execute(message) {
        index.data.otherVars.sendEmbed = true;
        if (Math.random() <= 0.5) {
            index.data.otherVars.eDescription = 'Heads!';
        } else {
            index.data.otherVars.eDescription = 'Tails!';
        }
    },
}