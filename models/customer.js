// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating Customer model
module.exports = function (sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        lname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        street: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        zipcode: DataTypes.STRING,
        phone: DataTypes.STRING,
        ccard: {
            type: DataTypes.STRING,
            validate: {
                // isCreditCard: true,
            }
        }
    }, {


        //  freezeTableName: true
    });
    // Creating a custom method for our Customer model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    Customer.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    // Hooks are automatic methods that run during various phases of the User Model lifecycle. In this case, before a User is created, we will automatically hash their password
    Customer.addHook("beforeCreate", function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
    Customer.associate = function (models) {
        Customer.belongsTo(models.Pharmacy, {
            foreignKey: {
                allowNull: false
            }
        });
        Customer.hasMany(models.Order, {
            onDelete: "cascade"
        });
    };
    // Customer.id = function (models) {
    //     Customer.hasMany(models.Order, {});
    // };
    return Customer;
};