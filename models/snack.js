module.exports = function(seqelize, DataTypes){

    var Snack = seqelize.define("Snack",{
        snack_name:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [1,50]
            }
        },
        devoured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        } 
    });
    Snack.associate = function(models){
        Snack.belongsTo(models.Customer,{
            foreignKey:{
                allowNull: true
            }
        })
    }
    return Snack;
};