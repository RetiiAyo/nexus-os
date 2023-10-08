const fs = require("fs");
const functions = require("./os/nexsys/functions");
const config = require("./config");
const colors = require("colors");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let type = 1;

rl.input.on("keypress", (key, data) => {
    if (key == "E" && type == 1) {
        console.clear();
        console.log("Booting NexusOS..");
    };
});

console.log(`OS Version: ${config.version}`);
console.log(`OS Size: ${(functions.convertBytesToMB(functions.getFolderSize(__dirname + "/os"))).toFixed(2)} MB`);

console.log(("OS " + "-".repeat(process.stdout.columns - 3)).bold);
functions.printDirectoryStructure(__dirname + "/os");

console.log(("-".repeat(process.stdout.columns)).bold);
console.log(functions.printKeybind("^E", "Start OS") + functions.printKeybind("^R", "Create User") + functions.printKeybind("^E", "Remove User"));