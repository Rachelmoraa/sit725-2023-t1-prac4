
let multer = require("multer");

let storage = multer.diskStorage({
    destination: (re, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `${file.originalname.split('.')[0]}-sahara.${ext}`)
    }
})

let upload = multer({ storage: storage });

module.exports = upload;
