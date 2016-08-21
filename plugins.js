var fs = require("fs");
var npm = require("npm");
var path = require("path");
var execSync = require("child_process").execSync;

var pluginDirectory = "plugins/";

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

function getNPMDependencies(path) {
    var p = require(path);

    var dependency;
    var dependencies = [];
    for (dependency in p.dependencies) {
        dependencies.push(dependency + "@" + p.dependencies[dependency]);
    }

    return dependencies;
}

function installDependencies(dependencies) {
    if (dependencies.length !== 0) {
        execSync("npm install " + dependencies.join(" "));
        return true;
    }
    return false;
}

function loadPlugins(commands) {
    if (!pathExists(pluginDirectory)) {
        console.log("[!] Plugin directory does not exist!");
        return;
    }
    var plugins = getDirectories(pluginDirectory);
    var p, dependencyPath, installed, pluginPath, plugin, command;
    for (p in plugins) {
        dependencyPath = "./" + pluginDirectory + plugins[p] + "/package.json";
        if (!pathExists(dependencyPath)) {
            console.log("[!] " + plugins[p] + " is missing a package.json file! Skipping...");
            continue;
        }
        installed = installDependencies(getNPMDependencies(dependencyPath));
        if (installed) {
            console.log("[*] Dependencies for '" + plugins[p] + "' have been installed");
        }

        pluginPath = "./" + pluginDirectory + plugins[p] + "/plugin.js";
        if (!pathExists(pluginPath)) {
            console.log("[!] " + plugins[p] + " is missing a plugin.js file! Skipping...");
            continue;
        }

        plugin = require(pluginPath);
        for (command in plugin) {
            if (commands.hasOwnProperty(command)) {
                console.log("[!] Conflicting namespace for command " + command);
                console.log("[!] Skipping...");
                continue;
            }
            commands[command] = {
                run: plugin[command]
            };
        }
        console.log("[*] Plugin '" + plugins[p] + "' has been loaded");
    }
    console.log("[*] All plugins have been loaded");
}

module.exports = {};
module.exports.loadPlugins = loadPlugins;
