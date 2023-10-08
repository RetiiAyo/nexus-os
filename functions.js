const fs = require("fs");
const path = require("path");

module.exports = {
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

    getFolderContent: function(folderPath) {
        const files = fs.readdirSync(folderPath);
        const array = [];

        files.forEach(file => {
            const fileStats = fs.statSync(path.join(folderPath, file));
            const isFile = fileStats.isFile();
            const isDirectory = fileStats.isDirectory();

            array.push({
                name: file,
                path: path.join(folderPath, file),
                type: isFile ? "File" : isDirectory ? "Directory" : "Other"
            });
        });

        return array;
    },

    convertBytesToMB: function (bytes) {
        const totalSizeInMB = bytes / (1024 * 1024);
        return totalSizeInMB;
    }
};
