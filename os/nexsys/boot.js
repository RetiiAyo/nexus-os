const constantUpdate = false;
const tabs = ["Home", "System", "Information"];
let activeTab = 0;
let type = 0;
let secondTextEnabled = false;
let userInput = false;
const rl = require("./functions").readline;

module.exports = async () => {
    let header = "nexus os";
    let text = "initializing..";
    let secondText = "";

    function centerText(text, width) {
        const padding = " ".repeat((width - text.length) / 2);
        return padding + text;
    };

    function loadingMenu() {
        if (type != 0) return;

        const terminalWidth = process.stdout.columns;
        const terminalHeight = process.stdout.rows;

        const verticalPadding = "\n".repeat((terminalHeight - 4) / 2);

        console.clear();
        console.log(verticalPadding);
        console.log(centerText(header, terminalWidth));
        console.log(centerText(text, terminalWidth));
        if (secondTextEnabled == true) console.log(centerText(secondText, terminalWidth));
        console.log(verticalPadding);
    };

    function loadingFunction() {
        header = "nexus os - updating";
        text = "checking for updates..";

        // update check logic soon

        header = "nexus os - login";
        text = "please start typing to input a user..";
        secondTextEnabled = true;
        userInput = true;
    };

    function mainMenu() {
        const interval = setInterval(() => {
            loadingMenu();
        }, 100);
        loadingFunction();

        rl.input.on("keypress", (key, data) => {
            if (data.name == "tab" && data.ctrl == false && data.meta == false && type == 1) {
                activeTab = (activeTab + 1) % tabs.length;
            };

            if (userInput == true) {
                if (data.name == "enter") {
                    secondTextEnabled = false;
                };
                

                secondText = secondText + key;
            };
        });
        process.stdout.on("resize", () => {
            if (type == 0) {
                loadingMenu();
            };
        });
    };

    mainMenu();
};