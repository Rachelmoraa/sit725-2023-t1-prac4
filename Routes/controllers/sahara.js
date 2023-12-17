
const siteModel = require("../../models/sites.model");

const home = async (req, res) => {
    const sites = await siteModel.findAll();
    res.render("template.ejs", {
        sites: sites
    })
}

const uploadForm = async (req, res) => {
    res.render("newForm.ejs");
}

const newSite = async (req, res) => {
    try {
        const filepath = `uploads/${req.file.filename}`;
        req.body.profile = filepath;
        await siteModel.create(req.body);
        res.redirect("/")
    } catch (error) {
        res.json({ success: "false", message: "an error occured while creating the site" });
        console.log(error);
    }
}

module.exports = {
    home,
    newSite,
    uploadForm
}
