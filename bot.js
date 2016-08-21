var Discord = require("discord.js");

try {
    var config = require("./config");
} catch (e) {
    console.log("[!] config.json not found.");
    process.exit(1);
}

var plugins = require("./plugins");

var commands = {
    "ping": {
        run: function(bot, message, args) {
            bot.sendMessage(message, "pong!");
        }
    },
    "calc": {
        run: function(bot, message, args) {
            bot.sendMessage(message, eval(args.join("")));
        }
    }
};

var bot = new Discord.Client();

bot.on("ready", function() {
    console.log("Ready to rock!");
    bot.setPlayingGame("Stronghold");
    bot.on("voiceJoin", function(voiceChannel, user) {
        bot.sendTTSMessage(bot.channels[0], user.username + " has joined");
    });

    bot.on("voiceLeave", function(voiceChannel, user) {
        bot.sendTTSMessage(bot.channels[0], user.username + " has left");
    });

});

bot.on("message", function(message) {
    const prefix = "!";

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

plugins.loadPlugins(commands);
bot.loginWithToken(config.login_token, function(error, token) {
    if (error) {
        console.log("Failed to log in.\n" + error);
    } else {
        console.log("Logged in.");
    }
});
