
/*
  chigbot 0.0 BETA DEV VERSION NOTHING WORKS
  Produced by Eliot Chignell: 
    Twitter - @EliotChignell
    Email - chignelleliot@gmail.com
*/

const secrets = require("./secrets.json");
const help = require('./docs/help.json');

const Discord = require('discord.js');
const Enmap = require('enmap');
const client = new Discord.Client();
client.points = new Enmap({name:'points'});

var eColor, eTitle, eAuthor, eDescription, eFooter, eImage, eThumbnail, embed;
var sendEmbed = false;

// Encryption Variables and Functions
let input = '';
let key = '';
let finalString = '';
const characters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9',' '];
const oCharacters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9',' '];
let shuffledCharacters = [];

// Useful functions
function shuffle(a){let b=a;var j,x,i;for(i=b.length-1;i>0;i--){j=Math.floor(Math.random()*(i+1));x=b[i];b[i]=b[j];b[j]=x};return b}
function randInt(a,b){return Math.floor((Math.random()*b)+a)}

client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity('ch help | Serving '+client.users.size+' users among '+client.guilds.size+' servers.', { type: 'LISTENING' });
});

client.on('message', message => {

  client.points.ensure(message.author.id,{
    tag:message.author.tag,
    points: 0,
  });

  sendEmbed = false;
  eTitle = '';
  eDescription = '';
  eImage = '';
  eThumbnail = '';
  
  if (!message.content.startsWith('ch') || message.author.bot) return;
  
  let command = message.content.split(' ');
  let eCommand = message.content.split(' ');

  /*
  if (message.guild) {
    const eColor = message.guild.members.get('442184461405126656').displayHexColor;
  } else {
    console.log('dm');
    const eColor = "#ff8300";
  }
  */

  // Logging commands
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
      if (command[2]) {
        for (var i in help) {
          help[i].names.forEach(element => {
            if (command[2].toLowerCase() == element) {
              sendEmbed = true;
              eTitle = "Help information on the command "+help[i].names[0];
              eDescription = "Description: ```"+help[i].description+"```\n\
                              Usage: ```"+help[i].usage+"```";
            }
          });
        }
      } else {
        sendEmbed = true;
        eTitle = "Help";
        eDescription = "Commands available:\n\
                        ```help ping coinflip/coin info encrypt decrypt server balance/bal gamble```\n\
                        You can also type ch help [command] to see the description and usage of that command.\n\n\
                        *Please be aware that not all the commands listed here will be fully functional.*";
      }
      
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
      eTitle = "Information";
      eDescription = "**Information about this bot**\nThe bot's GitHub page: [click here](https://github.com/EliotChignell/ChigBot)\nMy (the developer's) website: [click here](https://eliotchignell.github.io)\nThe bot's website: [click here](https://eliotchignell.github.io/ChigBot)\n\n**Statistics about this bot:**\nRunning on `"+client.guilds.size+"` servers,\nServing `"+client.users.size+"` users,\nListening on `"+client.channels.size+"` channels.\n\n*Version: TVFDV (The Very Flawed Developer Version)*";
      break;
    
    case 'encrypt':

      input = '';
      sendEmbed = false;
      if (message.guild) return message.channel.send("You cannot encrypt/decrypt in a server/group dm!\nPlease DM me to encrypt/decrypt a message!");
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
      
      if (message.guild) return message.channel.send("You cannot encrypt/decrypt in a server/group dm!\nPlease DM me to encrypt/decrypt a message!");

      key = command;
      key.splice(0,2);
      key.length = 2;
      key = key.join(' ');

      input = eCommand;
      input.shift();
      input.shift();
      input.shift();
      input.shift();
      input = input.join(' ');

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
  

    case 'balance':
    case 'bal':
    case 'money':
    case 'credits':
    case 'creds':
      sendEmbed = true;
      eTitle = message.author.username+"'s Balance";
      eDescription = client.points.get(message.author.id, 'points')+' credits';
      break;

    case 'gamble':
      if (!parseInt(command[2])) return message.channel.send('Please use the correct usage: `ch gamble [amount]`');
      if (parseInt(command[2]) > client.points.get(message.author.id,'points')) return message.channel.send("You don't have that much money! "+parseInt(command[2])+", "+client.points.get(message.author.id,'points'));
    
      let rand = Math.floor((Math.random() * 2) + 1);
      if (rand == 1) { // Win
        client.points.math(message.author.id, "+", Math.floor(parseInt(command[2])*1.5), "points");
        sendEmbed = true;
        eDescription = 'You won!';
      } else if (rand == 2) { // Loss Oof
        client.points.math(message.author.id, "-", parseInt(command[2]), 'points');
        //client.points.set(message.author.id, client.points.get(message.author.id, 'points')-parseInt(command[2]),'points');
        sendEmbed = true;
        eDescription = 'You lost...';
      }
      break;

    case 'add':
      if (message.author.id == 401649168948396032) {
        client.points.math(message.author.id, "+", parseInt(command[2]), 'points');
        message.channel.send('that worked...');
      }
      break;

    case 'server':
      if (!message.guild) return message.channel.send('You are not currently in a server!');

      sendEmbed = true;
      eTitle = "Information on the server `"+message.guild.name+"`:";
      eDescription = "Amount of members: `"+message.guild.memberCount+"`\n\
                      Amount of channels: `"+message.guild.channels.size+"`\n\
                      Was created on: `"+message.guild.createdAt+"`\n\
                      ID: `"+message.guild.id+"`\n\
                      Whether this server is verified: `"+message.guild.verified+"`\n\
                      Owner: @"+message.guild.owner.user.tag+"\n\
                      Region: `"+message.guild.region+"`";
      eThumbnail = message.guild.iconURL;
      break;

    case 'invite':
      message.channel.send('https://discordapp.com/oauth2/authorize?client_id=442184461405126656&permissions=0&scope=bot');
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
      .setAuthor("ChigBot",client.user.displayAvatarURL)
      .setColor(0xff8300)
      .setDescription(eDescription)
      .setFooter("ch [command]")
      .setImage(eImage)
      .setThumbnail(eThumbnail)
      .setTimestamp();
      message.channel.send(embed);
  } 
   
});

client.login(secrets.token); 
