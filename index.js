
/*
  chigbot 0.0 BETA DEV VERSION NOTHING WORKS
  Produced by Eliot Chignell: 
    Twitter - @EliotChignell
    Email - chignelleliot@gmail.com
*/

const secrets = require("./secrets.json");
const help = require('./docs/help.json');
const nouns = require('./docs/topics/words/nouns.json');

const Discord = require('discord.js');
const Enmap = require('enmap');
const DBL = require('dblapi.js');
const request = require('request');
const moment = require('moment');
const client = new Discord.Client();
client.points = new Enmap({name:'points'});
const serverList = new Enmap({name:'servers'});

var eColor, eTitle, eAuthor, eDescription, eFooter, eImage, eThumbnail, embed, user;
var clientReady = false;
var sendEmbed = false;

// Encryption Variables and Functions
let input = '';
let key = '';
let finalString = '';
const characters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9',' '];
const oCharacters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9',' '];
const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
let shuffledCharacters = [];
let localInformation = {};

// Useful functions
function shuffle(a){let b=a;var j,x,i;for(i=b.length-1;i>0;i--){j=Math.floor(Math.random()*(i+1));x=b[i];b[i]=b[j];b[j]=x};return b}
function randInt(a,b){return Math.floor((Math.random()*b)+a)}
function msToTime(e){var n=parseInt(e%1e3/100),r=parseInt(e/1e3%60),t=parseInt(e/6e4%60),a=parseInt(e/36e5%24);return(a=a<10?"0"+a:a)+"h:"+(t=t<10?"0"+t:t)+"m:"+(r=r<10?"0"+r:r)+"s"}
function msToTime2(e){parseInt(e%1e3/100);var n=parseInt(e/1e3%60),r=parseInt(e/6e4%60),s=parseInt(e/36e5%24),t=parseInt(e/864e5%7);return(t=t<10?"0"+t:t)+"d:"+(s=s<10?"0"+s:s)+"h:"+(r=r<10?"0"+r:r)+"m:"+(n=n<10?"0"+n:n)+"s."}

client.once('ready', () => {
    console.log('Ready!');
    clientReady = true;
    client.user.setActivity('ch help | '+client.users.size+' users among '+client.guilds.size+' servers.', { type: 'LISTENING' });
});

client.on('message', async (message) => {

  if (message.guild) {
    serverList.ensure(message.guild.id, {
      id: message.guild.id,
      prefix: 'ch ',
      loggingChannel: 0
    });
  }
  
  if (message.guild && message.guild.me.hasPermission('MANAGE_NICKNAMES')) message.guild.me.setNickname('ChigBot | '+serverList.get(message.guild.id,'prefix')+"help");
  if (!message.author.bot) {
    client.points.ensure(message.author.id,{
      id: message.author.id,
      tag:message.author.tag,
      username:message.author.username,
      points: 100,
      lastDaily: new Date().getTime()-86400000,
      lastWeekly: new Date().getTime()-604800000,
      lastMine: new Date().getTime()-600000,
      lastGamble: new Date().getTime()-6000,
      items: [],
      lastConfirm: ''
    });
  }

  sendEmbed = false;
  eTitle = '';
  eDescription = '';
  eImage = '';
  eThumbnail = '';
  creds = 0;
  current = 0;

  /* command[1] = message.content.slice(serverList.get(message.guild.id, "prefix").length).split(' ')[0];
  let eCommand = message.content.split(' '); */
  if (message.guild) {
    if (!message.content.startsWith(serverList.get(message.guild.id, "prefix")) || message.author.bot) return;
  } else {
    if (!message.content.startsWith("ch ") || message.author.bot) return;
  }

  let args;

  if (message.guild) args = message.content.slice(serverList.get(message.guild.id,"prefix").length).split(' ');
  if (!message.guild) args = message.content.slice(3).split(' ');

  const command = args.shift().toLowerCase();

  // const eColor = message.guild.members.get('442184461405126656').displayHexColor;

  // Logging commands
  console.log("("+message.author.username+") "+message.content);

  finalString = '';

  switch(command.toLowerCase()) {

    case 'ping':
      const m = await message.channel.send("Ping?");
      m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
      
      break;
      
    case 'help':
      if (args[0]) {
        for (var i in help) {
          help[i].names.forEach(element => {
            if (args[0].toLowerCase() == element) {
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
                        ```css\nhelp ping coinflip/coin info encrypt decrypt server balance/bal gamble invite daily weekly leaderboard/board uptime settings hangman```\n\
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
      if (message.guild) return message.channel.send("You cannot encrypt/decrypt in a server/group dm!\nPlease DM me to encrypt/decrypt a message!");
      
      input = '';
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
      if (args[0]) {
        if (!message.mentions.users.first()) return message.channel.send('Please mention someone...');
        user = message.mentions.users.first() || client.users.get(args[0]);
        if (!client.points.has(user.id)) return message.channel.send('This user does not exist on my database...');
        sendEmbed = true;
        eTitle = user.username+"'s Balance";
        eDescription = client.points.get(user.id, 'points')+' credits';
      } else {
        sendEmbed = true;
        eTitle = message.author.username+"'s Balance";
        eDescription = client.points.get(message.author.id, 'points')+' credits';
      }
      break;

    case 'gamble':
      if (!parseInt(args[0])) return message.channel.send('Please use the correct usage: `ch gamble [amount]`');
      if (parseInt(args[0]) > client.points.get(message.author.id,'points')) return message.channel.send("You don't have that much money! "+parseInt(args[0])+" > "+client.points.get(message.author.id,'points'));
    
      let rand = Math.floor((Math.random() * 2) + 1);
      if (rand == 1) { // Win
        client.points.math(message.author.id, "+", Math.floor(parseInt(args[0])*1.5), "points");
        sendEmbed = true;
        eDescription = 'You won!';
      } else if (rand == 2) { // Loss Oof
        client.points.math(message.author.id, "-", parseInt(args[0]), 'points');
        // client.points.set(message.author.id, client.points.get(message.author.id, 'points')-parseInt(args[0]),'points');
        sendEmbed = true;
        eDescription = 'You lost...';
      }
      break;

    case 'add':
      if (message.author.id == 401649168948396032) {
        client.points.math(message.author.id, "+", parseInt(args[0]), 'points');
        message.channel.send('that worked...');
      }
      break;

    case 'server':
      if (!message.guild) return message.channel.send('You are not currently in a server!');

      sendEmbed = await true;
      eTitle = await "Information on the server `"+message.guild.name+"`:";
      eDescription = await "Amount of members: `"+message.guild.memberCount+"`\n\
                      Amount of channels: `"+message.guild.channels.size+"`\n\
                      Was created on: `"+message.guild.createdAt+"`\n\
                      ID: `"+message.guild.id+"`\n\
                      Whether this server is verified: `"+message.guild.verified+"`\n\
                      Region: `"+message.guild.region+"`";
      eThumbnail = message.guild.iconURL;
      break;

    case 'invite':
      message.channel.send('https://discordapp.com/oauth2/authorize?client_id=442184461405126656&permissions=0&scope=bot');
      break;

    case 'daily':
      let lastDaily = client.points.get(message.author.id,"lastDaily");
      creds = Math.floor(client.points.get(message.author.id,'points')/10)+100;
      current = new Date().getTime();
      if (lastDaily+86400000 <= current) { // Enough time
        client.points.math(message.author.id, "+", creds,"points");
        client.points.set(message.author.id, current, "lastDaily");
        sendEmbed = true;
        eTitle = "Daily Credits";
        eDescription = "**You recieved "+creds+" credits!**\n\
                        Your current balance: "+client.points.get(message.author.id,"points")+" credits.\n\n\
                        _Each day you recieve 100+10% of your balance_";
      } else if (lastDaily+86400000 > current) {
        sendEmbed = true;
        eTitle = "Daily Credits";
        eDescription = "Please wait: "+msToTime((lastDaily+86400000)-current);
      }
      break;

    case 'weekly':
      let lastWeekly = client.points.get(message.author.id,"lastWeekly");
      creds = Math.floor(client.points.get(message.author.id,'points')/3)+100;
      current = new Date().getTime();
      if (lastWeekly+604800000 <= current) {
        client.points.math(message.author.id, "+", creds,"points");
        client.points.set(message.author.id, current, "lastWeekly");
        sendEmbed = true;
        eTitle = "Weekly Credits";
        eDescription = "**You recieved "+creds+" credits!**\n\
                        Your current balance: "+client.points.get(message.author.id,"points")+" credits.\n\n\
                        _Every week day you recieve 100+33% of your balance_";
      } else if (lastWeekly+604800000 > current) {
        sendEmbed = true;
        eTitle = "Weekly Credits";
        eDescription = "Please wait: "+msToTime2((lastWeekly+604800000)-current);
      }
      break;

    case 'id':
      user = message.mentions.users.first() || client.users.get(command);
      message.channel.send(user.id);
      break;

    case 'leaderboard':
    case 'board':

      if (args[0] || !message.guild) {
        let sorted = client.points.array().sort((a, b) => a.points - b.points).reverse().splice(0,10);
        sendEmbed = false;
        let rDescription = "The Worldwide Top 10:```diff\n";
        /*for (const data of sorted) {
          rDescription += "\n- "+client.users.get(parseInt(data.id)).tag+"\n+ "+data.points+" credits";
        }*/
        for (var i=0;i<sorted.length;i++) {
          if (client.users.get(sorted[i].id)) rDescription += "\n- "+client.users.get(sorted[i].id).tag+"\n+ "+sorted[i].points+" credits";
        }
        rDescription += '```';
        embed = new Discord.RichEmbed()
          .setTitle("Credits Leaderboard")
          .setAuthor("ChigBot",client.user.displayAvatarURL)
          .setColor(0xff8300)
          .setDescription(rDescription)
          .setFooter("ch [command]")
          .setTimestamp();
        
        message.channel.send(embed);
      } else if (!args[0] && message.guild) {
        let foundUsers = [];
        let guildIDs = [];
        message.guild.members.forEach(member => {
          if (client.points.has(member.id)) guildIDs.push(member.id);
        });
        let sorted = client.points.array().filter(p => guildIDs.includes(p.id)).sort((a, b) => a.points - b.points).reverse().splice(0,10);
        let rDescription = "The Top 10 of the server `"+message.guild.name+"`:```diff\n";
        for (const data of sorted) {
          rDescription += "\n- "+client.users.get(data.id).tag+"\n+ "+data.points+" credits";
        }
        rDescription += '```\nType `ch board world` to find out the worldwide standings.';
        sendEmbed = false;
        embed = new Discord.RichEmbed()
          .setTitle("Credits Leaderboard")
          .setAuthor("ChigBot",client.user.displayAvatarURL)
          .setColor(0xff8300)
          .setDescription(rDescription)
          .setFooter("ch [command]")
          .setTimestamp();
        message.channel.send(embed);
      }
      break;

    case 'give':
      if (!(args[0] && args[1])) return message.channel.send("Please specifiy a valid user and amount! e.g.: `ch give @Person#1234 100`");
      if (!parseInt(args[1])) return message.channel.send("Please specifiy a valid user and amount! e.g.: `ch give @Person#1234 100`");
      if (!message.mentions.users.first()) return message.channel.send("Please specifiy a valid user and amount! e.g.: `ch give @Person#1234 100`");
      user = message.mentions.users.first() || client.users.get(args[0]);
      if (client.points.get(message.author.id,"points") < parseInt(args[1])) return message.channel.send("You don't have that much money! "+parseInt(args[1])+" > "+client.points.get(message.author.id,'points'));
      client.points.math(message.author.id, "-", parseInt(args[1]), 'points');
      client.points.math(user.id, "+", parseInt(args[1]), 'points');
      sendEmbed = true;
      eTitle = "Transaction";
      eDescription = "```You ("+message.author.tag+") gave "+client.users.get(user.id).tag+" "+parseInt(args[1])+" credits.```";
      break;

    case 'settings':
      if (!message.guild) return message.channel.send("The `settings` command requires for you to be in a guild.");
      if (args[0]) {
        switch (args[0]) {
          case 'prefix':
            let previousPrefix = serverList.get(message.guild.id, "prefix");
            if (!(message.member.hasPermission("ADMINISTRATOR"))) return message.channel.send("You have to be the owner/administrator of the server to change the prefix. Please ask the owner/administrator.");
            if (!args[1]) return message.channel.send('Please specify a prefix. e.g. `ch prefix c!`');
      
            if (args[1] == "default") {
              serverList.set(message.guild.id, "ch ", "prefix");
            } else {
              serverList.set(message.guild.id, args[1], "prefix");
            }
      
            sendEmbed = true;
            eTitle = "You have changed the prefix for the server `"+message.guild.name+"`.";
            eDescription = "New prefix: `"+serverList.get(message.guild.id, "prefix")+"`\n\
                            Old prefix: `"+previousPrefix+"`";
            break;

          case 'logging':
            if (!(message.member.hasPermission("ADMINISTRATOR"))) return message.channel.send("You have to be the owner/administrator of the server to change the prefix. Please ask the owner/administrator.");
            // if (message.guild.channels.get(message.mentions.channels.first.id)) return message.channel.send("Please provide a channel that is in your server.");
            const channel = await message.mentions.channels.first();
            serverList.set(message.guild.id, channel.id, "loggingChannel");

            sendEmbed = true;
            eTitle = "Changed logging channel for the server `"+message.guild.name+"`.";
            eDescription = "Server: #"+message.mentions.channels.first().name+" ("+message.mentions.channels.first().id+").";

            break;
          default:
            message.channel.send("Please provide a valid setting subset! Type `ch settings` to find out your options.");
            break;
        }
      }
      break;

    case "uptime":
      sendEmbed = true;
      eTitle = "Uptime";
      eDescription = "This session of ChigBot has been online for\n```"+msToTime2(client.uptime)+"```";
      break;

    case 'hangman':
      if (!args[0] || args[0] == "start") { // Starting
        let randomInteger = randInt(0,nouns.nouns.length);
        localInformation[message.author.id] = {
          "inGame": true,
          "word": nouns.nouns[randomInteger].split(''),
          "nonDuplicates": nouns.nouns[randomInteger].split('').filter((item, pos, self) => {return self.indexOf(item) == pos}),
          "attempts": 0,
          "lettersAttempted": [],
          "lettersCorrect": [] 
        }
        sendEmbed = true;
        eTitle = "Hangman";
        localInformation[message.author.id].word.forEach(a => {
          eDescription += ":white_large_square:";
        });
        eDescription += "\n\nGuesses Left: "+(10-(localInformation[message.author.id].attempts))+"\nLetters Wrong: "+localInformation[message.author.id].lettersAttempted;
      } else if (args[0].length == 1) {
        if (!letters.includes(args[0].toLowerCase())) return message.channel.send("Please specify a letter A-Z!");
        if (!localInformation[message.author.id]) {
          return message.channel.send("Please start a game using `ch hangman start`");
        } else if (!localInformation[message.author.id].inGame) {
          return message.channel.send("Please start a game using `ch hangman start`");
        }
        if (!localInformation[message.author.id].word.includes(args[0].toLowerCase())) { // Wrong
          localInformation[message.author.id].attempts++;
          if (localInformation[message.author.id].attempts > 9) { // Lost
            localInformation[message.author.id].inGame = false;
            sendEmbed = true;
            eTitle = "Hangman";
            eDescription = "You Lost!\nThe word was: "+localInformation[message.author.id].word.join('');
            break;
          }
          localInformation[message.author.id].lettersAttempted.push(args[0].toLowerCase());
          sendEmbed = true;
          eTitle = "Hangman";
          localInformation[message.author.id].word.forEach(e => {
            if (localInformation[message.author.id].lettersCorrect.includes(e)) {
              eDescription += ":regional_indicator_"+e+":";
            } else {
              eDescription += ":white_large_square:";
            }
          });
          eDescription += "\nYou were wrong!\nGuesses Left: "+(10-(localInformation[message.author.id].attempts))+"\nLetters Wrong: "+localInformation[message.author.id].lettersAttempted;
        } else if (localInformation[message.author.id].word.includes(args[0].toLowerCase())) { // Correct
          if (localInformation[message.author.id].nonDuplicates.length == localInformation[message.author.id].lettersCorrect.length) { // Won
            localInformation[message.author.id].inGame = false;
            sendEmbed = true;
            eTitle = "Hangman";
            eDescription = "You Won!\nThe word was: "+localInformation[message.author.id].word.join('')+"\nTherefore, you recieve "+50*localInformation[message.author.id].word.length+" credits!";
            client.points.math(message.author.id, "+", 50*localInformation[message.author.id].word.length, "points");
            break;
          }
          localInformation[message.author.id].lettersCorrect.push(args[0].toLowerCase());
          sendEmbed = true;
          eTitle = "Hangman";
          localInformation[message.author.id].word.forEach(e => {
            if (localInformation[message.author.id].lettersCorrect.includes(e)) {
              eDescription += ":regional_indicator_"+e+":";
            } else {
              eDescription += ":white_large_square:";
            }
          });
          eDescription += "\nYou were right!\nGuesses Left: "+(10-(localInformation[message.author.id].attempts))+"\nLetters Wrong: "+localInformation[message.author.id].lettersAttempted;
        }
      }
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

client.on('guildMemberAdd', async message => {
  if (!message.guild.channels.get(serverList.get(message.guild.id, "loggingChannel"))) return;
  const channel = message.guild.channels.find(c => c.id == serverList.get(message.guild.id, "loggingChannel"));
  embed = new Discord.RichEmbed()
    .setTitle("Member Joined")
    .setAuthor(message.user.tag+" ("+message.user.id+")",message.user.avatarURL);
});

client.on('error', console.error);

setInterval(() => {
  if (clientReady) client.user.setActivity('ch help | '+client.users.size+' users among '+client.guilds.size+' servers.', { type: 'LISTENING' });
}, 30000);

client.login(secrets.token); 
