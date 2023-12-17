
const Sequelize = require("sequelize");
require("dotenv").config();
const db_name = process.env.DATABASE_NAME
const db_user = process.env.DATABASE_USER
const db_password = process.env.DATABASE_PASSWORD
const db_host = process.env.DATABASE_HOST

const sequelize = new Sequelize(db_name, db_user, db_password, {
    dialect: "mysql",
    host: db_host,
});

module.exports = sequelize
