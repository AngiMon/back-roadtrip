const { Sequelize, DataTypes, Model } = require('sequelize');
var sequelize = require('./Model');
const Post = require('./Post');

class User extends Model {}

User.init({
  // Model attributes are defined here
        id: {
            type: Sequelize.INTEGER, 
            autoIncrement: true, 
            primaryKey: true
            },
        username: {
            type: Sequelize.STRING(255), 
            allowNull: false,
            unique: true
        },
        lastname: {
            type: Sequelize.STRING(255), 
            allowNull: false 
        },
        firstname: {
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
        },
        password: {
            type: Sequelize.STRING(255),
            allowNull: false
        }
    },{
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User', // We need to choose the model name
  tableName: 'users'
});

User.hasMany(Post, {
    foreignKey: 'author'
  });
Post.belongsTo(User, {
    foreignKey: 'author'
  });

// the defined model is the class itself
console.log(User === sequelize.models.User); // true

module.exports = User;