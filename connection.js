const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// Setting parameters
const connectionParameters = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.set('strictQuery', true);

// Connecting to the database
let connection;
if (process.env.ENVIRONMENT == 'dev') {
    connection = mongoose
        .connect(process.env.MONGODB_URI_DEV, connectionParameters)
        .then(() => {
            console.log(`Connected to database`);
        })
        .catch((error) => {
            console.log(error);
        });
} else if (process.env.ENVIRONMENT == 'prod') {
    connection = mongoose
        .connect(process.env.MONGODB_URI_PROD, connectionParameters)
        .then(() => {
            console.log(`Connected to database`);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = connection;
