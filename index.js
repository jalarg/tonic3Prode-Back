require("dotenv").config();
const validateRequiredEnvs = require('./utils/environments');


const requiredEnvs = ['PORT', 'MONGO_URI'];
validateRequiredEnvs(requiredEnvs);



