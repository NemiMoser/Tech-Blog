// testSequelize.js

const { Sequelize } = require('sequelize');
const { User, Post } = require('./models');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});

async function testQueries() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Fetch all users and their associated posts
    const usersWithPosts = await User.findAll({ 
      include: [{
        model: Post,
        as:'posts',
       }],
      });
    console.log(JSON.stringify(usersWithPosts, null, 2));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Call the function to test your queries
testQueries();
