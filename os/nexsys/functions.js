const fs = require("fs");
const path = require("path");
const colors = require("colors");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

module.exports = {
    readline: rl,
    getFolderSize: function (folderPath) {
        let totalSizeInBytes = 0;

        function calculateSize(filePath) {
            const stats = fs.statSync(filePath);

            if (stats.isFile()) {
                totalSizeInBytes += stats.size;
            } else if (stats.isDirectory()) {
                const files = fs.readdirSync(filePath);
                files.forEach(file => {
                    calculateSize(path.join(filePath, file));
                });
            }
        }

        calculateSize(folderPath);
        return totalSizeInBytes;
    },

    getFolderContent: function (folderPath) {
        const files = fs.readdirSync(folderPath);
        const array = [];

        files.forEach(file => {
            const fileStats = fs.statSync(path.join(folderPath, file));
            const isFile = fileStats.isFile();
            const isDirectory = fileStats.isDirectory();

            array.push({
                name: file,
                path: path.join(folderPath, file),
                type: isFile ? "File" : isDirectory ? "Directory" : "Other",
                size: fileStats.size
            });
        });

        return array;
    },

    convertBytesToMB: function (bytes) {
        const totalSizeInMB = bytes / (1024 * 1024);
        return totalSizeInMB;
    },

    printDirectoryStructure: function (directoryPath, indent = "") {
        const directoryContents = this.getFolderContent(directoryPath);

        directoryContents.forEach((item, index, array) => {
            const isLastItem = index === array.length - 1;
            const prefix = isLastItem ? "└── " : "├── ";
            const itemType = item.type === "File" ? "File" : "Directory";
            const fileSize = item.type === "File" ? ` (${this.convertBytesToMB(item.size).toFixed(2)} MB)` : '';

            console.log(`${indent}${prefix}${item.name} (${itemType}${fileSize})`);

            if (item.type === "Directory") {
                const newIndent = isLastItem ? `${indent}    ` : `${indent}│   `;
                this.printDirectoryStructure(item.path, newIndent);
            };
        });
    },

    printKeybind: function(keybind, name) {
        return (`(${keybind}) `.black + `${name} `.black).bgWhite
    },

    question: function(question) {
        return new Promise((resolve) => {
            rl.question(question, answer => resolve(answer));
        });
    }
};
