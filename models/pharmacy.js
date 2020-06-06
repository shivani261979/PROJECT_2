// Creating Pharmacy model
module.exports = function (sequelize, DataTypes) {
    var Pharmacy = sequelize.define("Pharmacy", {
        name: {
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
        phone: DataTypes.STRING
    });
    Pharmacy.id = function (models) {
        Pharmacy.hasMany(models.Customer, {});
    };
    Pharmacy.id = function (models) {
        Pharmacy.hasMany(models.Order, {});
    };
    return Pharmacy;
};