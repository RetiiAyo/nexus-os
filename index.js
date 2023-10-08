const fs = require("fs");
const functions = require("./os/nexsys/functions");
const config = require("./config");
const colors = require("colors");
const path = require("path");

const rl = functions.readline;
let type = 1;

module.exports = rl;

rl.input.on("keypress", async (key, data) => {
    if (key == "E" && type == 1) {
        console.clear();
        console.log("Booting NexusOS..");
    }
    else if (key == "R" && type == 1) {
        var accountName;
        var accountPassword;
        type = 2;

        console.clear();
        accountName = await functions.question("Account's Name: ");
        accountPassword = await functions.question("Account's Password: ");

        console.log("Creating account..");
        fs.writeFileSync(path.join(__dirname, "os", "users", `${accountName}.nxdata`), `{password:${accountPassword}}`);
        console.log("Created account!");
    };
});

console.log(`OS Version: ${config.version}`);
console.log(`OS Size: ${(functions.convertBytesToMB(functions.getFolderSize(__dirname + "/os"))).toFixed(2)} MB`);

console.log(("OS " + "-".repeat(process.stdout.columns - 3)).bold);
functions.printDirectoryStructure(__dirname + "/os");

console.log(("-".repeat(process.stdout.columns)).bold);
console.log(functions.printKeybind("^E", "Start OS") + functions.printKeybind("^R", "Create User") + functions.printKeybind("^E", "Remove User"));