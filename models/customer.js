module.exports = function(sequelize, DataTypes){
    var Customer = sequelize.define("Customer", {
        customer_name:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [1,50]
            }
        },
        items_eaten:{
            type: DataTypes.INTEGER,
            allowNull:false,
            defaultValue:0
        }        
    });   
    Customer.associate = function(models){
        Customer.hasMany(models.Snack,{
            onDelete: "cascade"
        })
    }; 
    return Customer;
}

