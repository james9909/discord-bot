var fs = require("fs");
var npm = require("npm");
var path = require("path");

function pathExists(p) {
    try {
        fs.statSync(p);
        return true;
    } catch (e) {
        return false;
    }
}

function getDirectories(source) {
    return fs.readdirSync(source).filter(function(file) {
        return fs.statSync(path.join(source, file)).isDirectory();
    });
}

var pluginDirectory = "plugins/"

function getNPMDependencies(path) {
    var p = require(path);

    var dependencies = [];
    for (var dependency in p.dependencies) {
        dependencies.push(dependency + "@" + p.dependencies[dependency]);
    }

    return dependencies;
}

function installDependencies(dependencies) {
    npm.load({
        loaded: false
    }, function (err) {
        if (err) {
            console.log("There was an error: " + err);
        }
        npm.commands.install(dependencies, function (err2, data) {
            if (err2) {
                console.log("There was an error: " + err2);
            }
        });
    });
}

function loadPlugins(commands) {
    if (!pathExists(pluginDirectory)) {
        console.log("[!] Plugin directory does not exist!");
        return;
    }
    var plugins = getDirectories(pluginDirectory);
    for (var p in plugins) {
        var dependencyPath = "./" + pluginDirectory + plugins[p] + "/package.json";
        if (!pathExists(dependencyPath)) {
            console.log("[!] " + plugins[p] + " is missing a package.json file! Skipping...");
            continue;
        }
        // installDependencies(getNPMDependencies(dependencyPath));

        var pluginPath = "./" + pluginDirectory + plugins[p] + "/plugin.js";
        if (!pathExists(pluginPath)) {
            console.log("[!] " + plugins[p] + " is missing a plugin.js file! Skipping...");
            continue;
        }
        var plugin = require(pluginPath);

        for (var command in plugin) {
            if (command in commands) {
                console.log("[!] Conflicting namespace for command " + command);
                console.log("[!] Skipping...");
                continue;
            }
            commands[command] = {
                run: plugin[command]
            };
        }
    }
}

module.exports = {};
module.exports.loadPlugins = loadPlugins;
