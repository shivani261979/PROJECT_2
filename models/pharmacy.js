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
        state: DataTypes.STRING,
        zipcode: DataTypes.STRING,
        phone: DataTypes.STRING,
    }, {
        // freezeTableName: true,
    });
    Pharmacy.associate = function (models) {
        Pharmacy.hasMany(models.Customer, {
            onDelete: "cascade"

        });
        Pharmacy.hasMany(models.Order, {
            onDelete: "cascade"
        });

    };
    return Pharmacy;
};