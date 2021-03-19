const { Sequelize, DataTypes, Model } = require('sequelize');
var sequelize = require('./Model');
const User = require('./User');
class Post extends Model {};

Post.init({
    // Model attributes are defined here
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true
        },content: {
        type: Sequelize.STRING(255), 
        allowNull: false,
    },
    title: {
        type: Sequelize.STRING(255), 
        allowNull: false,
    },
    description:{
        type: Sequelize.TEXT('long'), 
        allowNull: true
    },
    content: {
        type: Sequelize.TEXT('long'), 
        allowNull: false,
    },
    location: {
        type: Sequelize.STRING(255), 
        allowNull: true
    },
    published: {
        type: Sequelize.BOOLEAN,
        allowNull:true
    }
      },{
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Post', // We need to choose the model name
    tableName: 'posts'
  });
  
  // the defined model is the class itself
  console.log("Post : "+ (Post === sequelize.models.Post)); // true
  sequelize.models.Post;
  module.exports = Post;