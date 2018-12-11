
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

// Encryption Variables and Functions
let input = '';
let key = '';
let finalString = '';
const characters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9',' '];
const oCharacters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9',' '];
let shuffledCharacters = [];

function shuffle(a) {
  let b = a;
  var j, x, i;
  for (i = b.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = b[i];
      b[i] = b[j];
      b[j] = x;
  }
  return b;
}

client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity('for ch help...', { type: 'LISTENING' });
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
  let eCommand = message.content.split(' ');
  const eColor = message.guild.members.get('442184461405126656').displayHexColor;
  console.log("("+message.author.username+") "+message.content);

  finalString = '';

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
      break;
    
    case 'info':
      sendEmbed = true;
      eTitle = 'Information about this bot';
      eDescription = "The bot's GitHub page: [click here](https://github.com/EliotChignell/ChigBot)\nMy (the developer's) website: [click here](https://eliotchignell.github.io)\nThe bot's website: [click here](https://eliotchignell.github.io/ChigBot)";
      break;
    
    case 'encrypt':

      input = '';
      sendEmbed = false;
      if (!message.channel.type == "dm") return message.reply("You cannot encrypt/decrypt in a server/group dm!\nPlease DM me to encrypt/decrypt a message!");
      sendEmbed = true;

      for (var i=2;i<command.length;i++) {
        input += command[i];
        if (i<command.length-1) input += ' ';
      }

      key = '';
      shuffledCharacters = shuffle(oCharacters);
      input.split('');

      for (var i=0;i<input.length;i++) {
          for (var j=0;j<characters.length;j++) {
              if (input[i] == characters[j]) {
                  finalString += shuffledCharacters[j];
              }
          }
      }

      key = shuffledCharacters.join('');

      eTitle = "Encryption Tool";
      eDescription = "Encrypted Text:\n```"+finalString+"```\nKey:\n```"+key+"```";
      
      break;
    
    case 'decrypt':
      
      key = command;
      key.splice(0,2);
      key.length = 2;
      key = key.join(' ');

      input = eCommand;
      input.shift();
      console.log(input);
      input.shift();
      console.log(input);
      input.shift();
      console.log(input);
      input.shift();
      console.log(input);
      input = input.join(' ');
      console.log('Key: '+key);
      console.log('Input: '+input);

      /*
      key.splice(0,2);
      key.length = 2;
      key.join(' ').toString();
      console.log(key);
      */

      for (var i=0;i<input.length;i++) {
          for (var j=0;j<key.length;j++) {
              if (input[i] == key[j]) {
                  finalString += characters[j];
              }
          }
      }

      sendEmbed = true;
      eTitle = 'Decryption Tool';
      eDescription = 'Decrypted Text:\n```'+finalString+'```';
      break;
  
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
