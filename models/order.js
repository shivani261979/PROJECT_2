//Creating Order model
module.exports = function (sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
        // order_id: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     validate: {
        //         min: 1
        //     }
        // },
        med_id: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        category: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        med_price: DataTypes.DECIMAL(10, 2),
        status: {
            type: DataTypes.STRING,
            value: ['order placed', 'driver assigned', 'picked up', 'on the way', 'delivered']
        },
        // CustomerID: DataTypes.INTEGER,
        // DriverID: DataTypes.INTEGER,
        // PharmacyID: DataTypes.STRING,
    }, {
        // freezeTableName: true
    });
    Order.associate = function (models) {
        Order.belongsTo(models.Customer, {
            foreignKey: { allowNull: true }
        });
        Order.belongsTo(models.Driver, {
            foreignKey: { allowNull: true }
        });
        Order.belongsTo(models.Pharmacy, {
            foreignKey: { allowNull: true }
        });
    };
    return Order;
};