const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(
            null,
            // file.fieldname +
            //     '-' +
            //     Date.now() +
            //     '-' +
            //     Math.floor(Math.random() * Math.random() * 1000000) +
            //     '-' +
            file.originalname
        );
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'text/csv') {
        cb(null, true);
    } else {
        console.log(file.mimetype);
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;
