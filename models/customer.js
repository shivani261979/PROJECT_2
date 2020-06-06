// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating Customer model
module.exports = function (sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
        login_email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        user_password: {
            type: DataTypes.STRING,
            allowNull: false
        },
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
        credit_card: DataTypes.STRING,
        pharm_id: DataTypes.STRING,
        pharm_account: DataTypes.STRING,
    });
    // Creating a custom method for our Customer model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    Customer.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    Customer.addHook("beforeCreate", function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
    // Customer.id = function (models) {
    //     Customer.hasMany(models.Order, {});
    // };
    Customer.associate = function (models) {
        Customer.belongsTo(models.Pharmacy, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    Customer.id = function (models) {
        Customer.hasMany(models.Order, {});
    };
    return Customer;
};