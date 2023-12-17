
const Sequelize = require("sequelize");
const sequelize = require("../dbConfigs/db");

const siteSchema = sequelize.define("sites", {
    _id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    profile: {
        type: Sequelize.STRING,
        allowNull: true
    },
});

sequelize.sync()
    .then((results) => {
        console.log('successfully connected to db and created the table')
    }).catch((error) => {
        console.log(error)
    })

module.exports = siteSchema;
