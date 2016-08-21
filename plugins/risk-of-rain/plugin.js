module.exports.ror = function(bot, message, args) {
    if (args.length == 1) {
        bot.sendMessage(message, rorGenerator(parseInt(args[0])));
    } else {
        bot.sendMessage(message, "Usage: !ror <number of players>");
    }
}

function rorGenerator(players) {
    if ((players === parseInt(players, 10)) && (players <= 4)) {

        var characters = ["Commando", "Enforcer", "Bandit", "Huntress", "HAN-D", "Engineer", "Miner", "Sniper", "Acrid", "Mercenary", "Loader", "CHEF"];
        var artifacts = ["Honor", "Kin", "Disortion", "Spite", "Glass", "Enigma", "Sacrifice", "Commands", "Spirit", "Origin"];

        var output = "";
        var num_artifacts = Math.floor(Math.random() * 10);

        characters = shuffle(characters);
        artifacts = shuffle(artifacts);

        output += "Artifacts: ";
        for (i = num_artifacts; i > 0; i--) {
            output += artifacts[i] + ", ";
        }

        output += "\nCharacters: "
        for (i = players; i > 0; i--) {
            var newChar = Math.floor(Math.random() * 12);
            output += characters[newChar] + ", ";
        }

        return output;
    }

    return "It ain't gon work";
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
