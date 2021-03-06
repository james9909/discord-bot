var Discord = require("discord.js");

try {
    var config = require("./config");
} catch (e) {
    console.log("[!] config.json not found.");
    process.exit(1);
}

var plugins = require("./plugins");

var boostedUser = {user:null,
                  boostTimes:0
                  };

var commands = {
    "ping": {
        run: function(bot, message, args) {
            bot.sendMessage(message, "pong!");
        }
    },

    "calc": {
        run: function(bot, message, args) {
            try {
                var expression = eval(args.join(""));
            }
            catch(e){
                bot.sendMessage(message, "Invalid expression");
                return;
            }
            bot.sendMessage(message, expression);
        }
    },

	"random": {
		run: function(bot, message, args) {
			try {
				bot.sendMessage(message, ":game_die: " + message.author.username + " has rolled **1-" + args[0] + "** and obtained " + Math.floor(Math.random() * parseInt(args[0]) + 1).toString()); 
			}
			catch(e){
				bot.sendMessage(message, "Usage: !random <Integer>");
			}
		}
	},
    
    "boostme": {
        run: function(bot, message, args){
            if (message.author == boostedUser.user) {
                boostedUser.boostTimes += 1;
                bot.sendMessage(message, "FeelsBoostedMan :muscle: " + boostedUser.user + " is feeling boosted + " + boostedUser.boostTimes);
            }
            
            else {
                boostedUser.user = message.author;
                boostedUser.boostTimes = 1;
                bot.sendMessage(message, boostedUser.user + " is now boosted + 1");
            }
        }
    }
};

var bot = new Discord.Client();

bot.on("ready", function() {
    console.log("Ready to rock!");
    bot.setPlayingGame("Stronghold");
    
    bot.on("voiceSwitch", function(voiceOld,voiceNew,user){
        bot.sendTTSMessage(bot.channels[0], user.username + " has switched");
    });
    
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

    message.content = message.content.toLowerCase();
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
