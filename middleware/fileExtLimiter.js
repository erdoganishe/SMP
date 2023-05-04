const path = require('path');

const fileExtLimiter = (allowedExtArray) => {
    return (req, res, next) => {
        const files = req.files;

        const fileExtens = [];
        Object.keys(files).forEach(key => {
            fileExtens.push(path.extname(files[key].name))
        });

        const allowed = fileExtens.every(ext => allowedExtArray.includes(ext));

        if (!allowed) {
            const message = `Upload failed. Only ${allowedExtArray.toString()}`;

            return res.status(422).json({ status: 'error', message });
        }

        next();
    }
}

module.exports = fileExtLimiter;