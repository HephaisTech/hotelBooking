const { mkdir } = require('fs');
const multer = require('multer');
const path = require('path');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: async(req, file, callback) => {
        let filePath = path.join(__dirname, '../images/hotels/');
        mkdir(filePath, { recursive: true }, (err) => {
            if (err) {
                callback(err);
            } else {
                callback(null, filePath);
            }
        });
    },
    filename: (req, file, callback) => {
        let name = file.originalname.split(' ').join('_');
        name = file.originalname.split('/').join('');
        name = file.originalname.split(".").join('');
        const extension = MIME_TYPES[file.mimetype];
        name = file.originalname.split('.' + extension).join('');
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage: storage }).array('image');