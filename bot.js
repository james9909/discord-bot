var Discord = require("discord.js");
var config = require("./config");

var bot = new Discord.Client();

bot.on("ready", function () {
    console.log("Ready to rock!");
});

bot.on("message", function(message) {

    let prefix = "!";

    if (message.author == bot.user) {
        // So we don't self trigger
        return;
    }

    if (message.content === "ping") {
        bot.sendMessage(message, "pong!");
    }

});

bot.loginWithToken(config.login_token, function(error, token) {
    if (error) {
        console.log("Failed to log in.\n" + error);
    } else {
        console.log("Logged in.");
    }
});
