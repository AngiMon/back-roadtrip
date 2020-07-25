const { Sequelize, DataTypes, Model } = require('sequelize');
var sequelize = require('./Model');

class User extends Model {}

User.init({
  // Model attributes are defined here
        id: {
            type: Sequelize.INTEGER, 
            autoIncrement: true, 
            primaryKey: true
            },
        name: {
            type: Sequelize.STRING(255), 
            allowNull: false 
        },
        email: {
            type: Sequelize.STRING(255), 
            allowNull: false, 
            unique: true
        },
        role: {
            type: Sequelize.ARRAY(Sequelize.STRING), 
            allowNull: false
        }
    },{
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User', // We need to choose the model name
  tableName: 'users'
});

// the defined model is the class itself
console.log(User === sequelize.models.User); // true

module.exports = User;