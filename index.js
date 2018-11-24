
/*
  chigbot 0.0 BETA DEV VERSION NOTHING WORKS
  Produced by Eliot Chignell: 
    Twitter - @EliotChignell
    Email - chignelleliot@gmail.com
*/

const secrets = require("./secrets.json");

const Discord = require('discord.js');
const client = new Discord.Client();

var eColor, eTitle, eAuthor, eDescription, eFooter, eImage, eThumbnail, embed;
var sendEmbed = false;

client.once('ready', () => {
    console.log('Ready!');
});

/*
Copy this

sendEmbed = true;
eTitle = "";
eDescription = "";
eImage = "";
eThumbnail = "";

*/

client.on('message', message => {
  
  if (!message.content.startsWith('ch')) return;
  
  let command = message.content.split(' ');
  const eColor = message.guild.members.get('442184461405126656').displayHexColor;
  console.log("("+message.author.username+") "+message.content);

  switch(command[1].toLowerCase()) {
    case 'ping':
	    sendEmbed = true;
      eTitle = "";
      eDescription = "**Pong!** :ping_pong:\nPing: "+client.ping+"ms";
      eImage = "";
      eThumbnail = "";
      break;
      
    case 'help':
      sendEmbed = true;
      eTitle = "Help";
      eDescription = "Commands available:\n```help ping```";
      break;
      
    case 'coinflip':
    case 'flipcoin':
    case 'coin':
	  sendEmbed = true;
	  eTitle = 'Flipped a coin!';
	  if (Math.random() <= 0.5) {
		eDescription = 'Heads!';
	  } else {
		eDescription = 'Tails!';
	  }
      
    default:
      sendEmbed = true;
      eTitle = "Invalid Command.";
      eDescription = "Please use `ch help` to find out the available commands.";
      eImage = "";
      eThumbnail = "";
      break;
  }

  if (sendEmbed) {
	let embed = new Discord.RichEmbed()
    .setTitle(eTitle)
    .setAuthor("chigbot",client.user.displayAvatarURL)
    .setColor(eColor)
    .setDescription(eDescription)
    .setFooter("ch [command]")
    .setImage(eImage)
    .setThumbnail(eThumbnail)
    .setTimestamp();
    message.channel.send(embed);
  } 
   
});

client.login(secrets.token); 
