const fs = require("fs");
const functions = require("./os/nexsys/functions");
const config = require("./config");
const colors = require("colors");
const path = require("path");

const rl = functions.readline;
let type = 1;

module.exports = rl;

rl.input.on("keypress", async (key, data) => {
    if (key == "Q" && type == 1) {
        type = 2;

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
        fs.writeFileSync(path.join(__dirname, "os", "users", `${accountName}.nxdata`), `{"password":"${accountPassword}"}`);
        console.log("Created account!");

        setTimeout(() => {
            type = 1;
            console.clear();
            functions.printStartup(config);
        }, 1500);
    }
    else if (key == "E" && type == 1) {
        var accountName;
        var accountPassword;
        type = 2;

        console.clear();
        accountName = await functions.question("Account's Name: ");
        accountPassword = await functions.question("Account's Password: ");

        if (!fs.existsSync(path.join(__dirname, "os", "users", `${accountName}.nxdata`))) {
            console.log(`Account under the name of ${accountName} doesn't exist.`);
            setTimeout(() => {
                type = 1;
                console.clear();
                functions.printStartup(config);
            }, 1500);
            return;
        };

        const account = fs.readFileSync(path.join(__dirname, "os", "users", `${accountName}.nxdata`), "utf8");
        const parsedAccount = JSON.parse(account);

        if (accountPassword !== parsedAccount.password) {
            console.log(`Account under the name of ${accountName} has a different password.`);
            setTimeout(() => {
                type = 1;
                console.clear();
                functions.printStartup(config);
            }, 1500);
            return;
        };

        console.log("Deleting account..");
        fs.rmSync(path.join(__dirname, "os", "users", `${accountName}.nxdata`));
        console.log("Deleted account successfully!");
        setTimeout(() => {
            type = 1;
            console.clear();
            functions.printStartup(config);
        }, 1500);
    };
});

console.clear();
functions.printStartup(config);