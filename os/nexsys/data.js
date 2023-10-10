const fs = require("fs");
const path = require("path");
const data = new Map();

module.exports = {
    loadData: function () {
        const files = fs.readdirSync(__dirname, "/database").filter(file => file.endsWith(".nxsave"));
        files.forEach(file => {
            const filePath = fs.readFileSync(path.join(__dirname, `/database/${file}`));
            const parsedFile = JSON.parse(filePath);
        });
    },
};