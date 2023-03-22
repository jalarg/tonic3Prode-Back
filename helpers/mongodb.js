const mongoose = require('mongoose');
const { mongoURI } = require('../config');

const checkConnection = () => {
  console.log(mongoose.connection.readyState)
  return mongoose.connection.readyState;
};



const connect = async () => {
  try {
    if (!checkConnection()) {
      console.log('Connecting...');
      await mongoose.connect(mongoURI, {
      });
    }
    console.log('Connected successfully');
  } catch (error) {
    console.error(error);
  }
};


const disconnect = async () => {
  await mongoose.connection.close();
  return checkConnection();
};



module.exports = { connect, checkConnection, disconnect };


