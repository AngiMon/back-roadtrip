const { Sequelize, DataTypes, Model } = require('sequelize');
var sequelize = require('./Model');

class Post extends Model {};

Post.init({
    // Model attributes are defined here
          id: {
              type: Sequelize.INTEGER, 
              autoIncrement: true, 
              primaryKey: true
              },
          author: {
              type: Sequelize.STRING(255), 
              allowNull: false 
          },
          content: {
              type: Sequelize.STRING(255), 
              allowNull: false,
          },
          location: {
              type: Sequelize.STRING(255), 
              allowNull: true
          }
      },{
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Post', // We need to choose the model name
    tableName: 'posts'
  });
  
  // the defined model is the class itself
  console.log(Post === sequelize.models.Post); // true
  
  module.exports = Post;