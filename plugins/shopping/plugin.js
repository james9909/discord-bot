var request = require("request");
var config = require("../../config.json");

module.exports.buy = function(bot, message, args) {
    
    if (args.length === 0) {
        bot.sendMessage(message, "Invalid query");
        return;
    }
    
    var query = args.join("+");
    search(bot, message, query);
}

function search(bot, message, query){
    request(
        { url: "http://api.prosperent.com/api/search?api_key=" + config.shop_api_key + "&sortBy=relevance+desc&limit=3&query=" + query,
          json: true }, 
        
        function(error, response, body) {
            //console.log(body);
            for (i = 0; i < body.data.length; i++) {
                var output = "";
                output += body.data[i].affiliate_url + "\n";
                output += body.data[i].keyword + "\n\n";
                output += body.data[i].description; + "\n";
                output += "Price : " + body.data[i].price + "\n";
                output += body.data[i].image_url + "\n";
                bot.sendMessage(message, output);
            }
        });
}


