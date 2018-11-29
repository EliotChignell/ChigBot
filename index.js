
/*

  ChigBot 0.1 BETA NOT WORKING VERSION
  made by Eliot Chignell (@EliotChignell on git and twitter)
  with the help of anidiots.guide and discordjs.guide

*/

const fs = require('fs');
const Discord = require('discord.js');
const prefix = 'ch';

const secrets = require('./secrets.json');

var otherVars = {
	eColor: null,
	eTitle: "",
	eAuthor: null,
	eDescription: "",
	eFooter: "",
	eImage: null,
	eThumbnail: null,
	embed: null,
	sendEmbed: false
};

/*
var eColor, eTitle, eAuthor, eDescription, eFooter, eImage, eThumbnail, embed;
var sendEmbed = false; 
*/

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {

	exports.data = {otherVars, client};
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length+1).split(/ +/);
	const commandName = args.shift().toLowerCase();

	otherVars.eColor = message.guild.members.get('442184461405126656').displayHexColor;

	// Command Logging
	console.log("("+message.author.username+") "+message.content);

	// if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	try {
		command.execute(message, args);
		if (otherVars.sendEmbed) {
			otherVars.embed = new Discord.RichEmbed()
				.setTitle(otherVars.eTitle)
				.setColor(otherVars.eColor)
				.setAuthor("chigbot",client.user.displayAvatarURL)
				.setDescription(otherVars.eDescription)
				.setFooter('ch [command]')
				.setImage(otherVars.eImage)
				.setThumbnail(otherVars.eThumbnail)
				.setTimestamp();
			message.channel.send(otherVars.embed);
		}
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

});

exports.data = {otherVars, client};

client.login(secrets.token);