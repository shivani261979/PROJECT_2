// Creating Order model
module.exports = function (sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
        order_id: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 2
            }
        },
        med_id: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 2
            }
        },
        quantity: DataTypes.INTEGER,
        med_price: DataTypes.DECIMAL(10, 2),
        total_price: DataTypes.DECIMAL(10, 2),
    });
    Order.associate = function (models) {
        Order.belongsTo(models.Customer, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    Order.associate = function (models) {
        Order.belongsTo(models.Driver, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    Order.associate = function (models) {
        Order.belongsTo(models.Pharmacy, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Order;
};