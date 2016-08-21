var Discord = require("discord.js");
var config = require("./config");

var bot = new Discord.Client();

bot.on("ready", function () {
    console.log("Ready to rock!");
});

bot.on("message", function(message) {
    let prefix = "!";
	
	var input = message.content.toUpperCase().split(" ");
	
    if (message.author == bot.user) {
        // So we don't self trigger
        return;
    }

    if (input[0] === "PING") {
        bot.sendMessage(message, "Pong!");
    }

	if (input[0] === "ROR") {
		if (input.length === 2) {
			bot.sendMessage(message, rorGenerator(parseInt(input[1])));
		}

		else {
			bot.sendMessage(message, "Invalid input");
		}
	}
});

bot.loginWithToken(config.login_token, function(error, token) {
    if (error) {
        console.log("Failed to log in.\n" + error);
    } else {
        console.log("Logged in.");
    }
});


function rorGenerator(players) {
	if (players === parseInt(players, 10)) {
		
		var characters = ["Commando", "Enforcer", "Bandit", "Huntress", "HAN-D", "Engineer", "Miner", "Sniper", "Acrid", "Mercenary", "Loader", "CHEF"];
		var artifacts = ["Honor", "Kin", "Disortion", "Spite", "Glass", "Enigma", "Sacrifice", "Commands", "Spirit", "Origin"];
	
		var output = "";
		var num_artifacts = Math.floor(Math.random() * 10);

		characters = shuffle(characters);
		artifacts = shuffle(artifacts); 

		output += "Artifacts: ";
		for (i = num_artifacts; i > 0; i--) {
			output += artifacts[i] + " ";
		}

		output += "\nCharacters: "
		for (i = players; i > 0; i--) {
			output += characters[i] + " ";
		}

		return output; 
	}

	return "Invalid input";
};


function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

 	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		//Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		
		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

		return array;
};
