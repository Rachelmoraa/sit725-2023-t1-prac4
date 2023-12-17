
require("dotenv").config();
const userModel = require("../../models/users.model");
const bcrypt = require("bcrypt");
const saltRouds = 10;
const jwt = require("jsonwebtoken");
const jwt_secrete_key = process.env.SEC_KEY;

const test = (req, res) => {
    console.log(req.body);
    res.json({ "message": "Welcome to james REST API'S ", user: req.body });
};

const verifyToken = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1]
        if (accessToken) {
            const verified = jwt.verify(accessToken, jwt_secrete_key);
            if (verified) {
                req.authenticated = true;
                req.id = verified;
                return next();
            }
        }
    } catch (error) {
        res.json({ success: "false", message: "hebu login manze upate the token" });
    }
}

const allUsers = async (req, res) => {
    try {
        const users = await userModel.findAll();
        res.json({ "message": users })
    } catch (error) {
        res.json({ "message": "an error has occured" });
        console.log(error);
    }
};

const signUp = async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, saltRouds);
        //const { name, email, password, profile } = req.body;
        //const profiles = req.file;
        req.body.profile = req.file.path;
        //console.log(req.body)
        await userModel.create(req.body);
        res.json({ success: "true", message: "successfully created the user", user: req.body, file: req.file.path });
    } catch (error) {
        res.json({ success: "false", message: "an error occured while creating the user" });
        console.log(error);
    }
}

const signIn = async (req, res) => {
    try {
        const foundUser = await userModel.findOne({ where: { name: req.body.name } });
        if (!foundUser) {
            res.json({ success: "false", message: "a user with that username does not exist" });
        } else {
            const password_match = await bcrypt.compare(req.body.password, foundUser.password)
            if (password_match == true) {
                let tokens = jwt.sign({ user: foundUser._id }, jwt_secrete_key, { expiresIn: '12h' });
                res.json({ success: "true", message: "Successfully loged in", loggedUser: foundUser, token: tokens });
            } else {
                res.json({ success: "false", message: "Incorect password" });
            }
        }
    } catch (error) {
        res.json({ success: "false", message: "an error has just occured.... try again later" });
    }
};

const userInfor = async (req) => {
    const id = req.id.user;
    const user = await userModel.findByPk(id);
    return user;
};

const getSpecificUser = async (req, res) => {
    try {
        const user = await userInfor(req);
        res.json({ success: "true", message: "successfully fetched the user", user: user });
    } catch (error) {
        res.json({ success: "false", message: "an error has just accured" });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await userInfor(req);
        await user.update(req.body);
        res.json({ success: "true", message: `successfully updated ${user.name}` });
    } catch (error) {
        res.json({ success: "false", message: "an error has occured" });
    }
}

const removeUser = async (req, res) => {
    try {
        const user = await userInfor(req);
        user.destroy();
        res.json({ success: "true", message: `successfully remove the account ${user.name} from the system` });
    } catch (error) {
        res.json({ success: "false", message: "an error just occured" });
    }
}


module.exports = {
    test,
    allUsers,
    signUp,
    signIn,
    getSpecificUser,
    verifyToken,
    updateUser,
    removeUser,
}
