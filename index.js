const fs = require("fs");
const functions = require("./functions");
const config = require("./config");
require("colors");

const osFiles = functions.getFolderContent(__dirname + "/os");

console.log(`OS Version: ${config.version}`);
console.log(`OS Size: ${(functions.convertBytesToMB(functions.getFolderSize(__dirname + "/os"))).toFixed(2)} MB`);