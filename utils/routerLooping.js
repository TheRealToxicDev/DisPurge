const fs = require ('fs');

module.exports = (filePath) => {

    if (!filePath) throw new Error('No file path was provided!');

    if (!fs.existsSync(filePath)) fs.mkdirSync(filePath);

    const files = fs.readdirSync(filePath, { withFileTypes: true })
    .filter((entry) => !entry.isDirectory())
    .map((entry) => entry.name);

    return files;
};
