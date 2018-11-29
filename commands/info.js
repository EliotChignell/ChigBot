let index = require('./../index.js');

module.exports = {
    name: 'info',
    description: "This command will tell the user links to the bot's Github page and my website.",
    execute(message) {
        index.data.otherVars.eTitle = 'Information';
        index.data.otherVars.eDescription = "The bot's GitHub page: []()";
    },
}