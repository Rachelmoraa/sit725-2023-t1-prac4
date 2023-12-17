
const router = require("express").Router();
const { home, newSite, uploadForm } = require("./controllers/sahara");
const upload = require("../utils/multer");

router.get("", home);
router.post("/new", upload.single("profile"), newSite);
router.get("/form", uploadForm);

module.exports = router;
