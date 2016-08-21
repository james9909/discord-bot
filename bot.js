var Discord = require("discord.js");

var config = require("./config");
var plugins = require("./plugins")

var commands = {
    "ping": {
        run: function(bot, message, args) {
            bot.sendMessage(message, "pong!");
        }
    }
}

var bot = new Discord.Client();

bot.on("ready", function() {
    console.log("Ready to rock!");
	bot.setPlayingGame("Stronghold");
});

bot.on("message", function(message) {
    let prefix = "!";

    if (message.author === bot.user || message.content[0] !== prefix) {
        return;
    }

    var args = message.content.split(" ");
    var command = args[0].substring(1); // Get rid of "!"
    args.shift();

    if (command in commands) {
        commands[command].run(bot, message, args);
    } else {
        bot.sendMessage(message, "It ain't gon work.");
    }
});

bot.on("voiceJoin", function(VoiceChannel,User){
    bot.sendTTSMessage(VoiceChannel, User.username + " has joined");
    console.log("Hi");
});

bot.on("voiceLeave", function(VoiceChannel,User){
    bot.sendTTSMessage(VoiceChannel, User.username + " has left");
    console.log("Bye");
});


plugins.loadPlugins(commands);
bot.loginWithToken(config.login_token, function(error, token) {
    if (error) {
        console.log("Failed to log in.\n" + error);
    } else {
        console.log("Logged in.");
    }
});
