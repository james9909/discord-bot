# Plugins

This bot is easily extensible, and supports the addition of new commands via plugins.

Creating a plugin
-----------------
Creating a plugin is as easy as copying the contents of `example-plugin` into another folder.

Adding commands
---------------
All new commands must be exported in the `plugin.js` file, and must be function.
The function may take up to 3 arguments, the bot itself, a message object, and the arguments represented as an array of strings.
Here is an example:

```javascript
// Triggered when a user types !ping
module.exports.ping = function(bot, message) {
    bot.sendMessage(message, "pong!");
}

// Triggered when a user types !add, and will return the sum of all the arguments
module.exports.add = function(bot, message, args) {
    var sum = args.reduce(a, b) {
        return parseInt(a) + parseInt(b);
    }
    bot.sendMessage(message, sum);
}
```

Dependencies
------------
If a plugin requires any npm dependencies, just add them to `package.json` by running `npm install --save <dependency>`.
These dependencies will be installed when the bot is run.
