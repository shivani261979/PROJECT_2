// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating Driver model
module.exports = function (sequelize, DataTypes) {
    var Driver = sequelize.define("Driver", {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        street: DataTypes.STRING,
        city: DataTypes.STRING,
        state_abbr: DataTypes.STRING,
        zipcode: DataTypes.STRING,
        phone: DataTypes.STRING,
        vehile_plate: DataTypes.STRING,
        driver_license: DataTypes.STRING,
    });
    // Creating a custom method for our Driver model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    Driver.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    Driver.addHook("beforeCreate", function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
    Driver.id = function (models) {
        Driver.hasMany(models.Order, {});
    };
    return Driver;
};