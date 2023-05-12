const path = require('path');
const fs = require('fs');

const extImgController = (folder, name) => {
    const files = fs.readdirSync(folder);
    for (const file of files) {
        const extname = path.extname(file);
        const basename = path.basename(file, extname);
        if (basename === name) {
            return extname;
        }
    }
    return 'nothing';
};


module.exports = extImgController;