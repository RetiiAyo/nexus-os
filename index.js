const fs = require("fs");
const functions = require("./functions");
const config = require("./config");

console.log(`OS Version: ${config.version}`);
console.log(`OS Size: ${(functions.convertBytesToMB(functions.getFolderSize(__dirname + "/os"))).toFixed(2)} MB`);
console.log("OS Folder:")
functions.printDirectoryStructure(__dirname + "/os");