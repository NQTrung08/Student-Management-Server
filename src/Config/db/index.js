const mongoose = require('mongoose')
require('dotenv').config()

const mongoUrlOnline = process.env.MONGO_URL_ONLINE;
console.log(mongoUrlOnline)
const mongoUrlOffline = process.env.MONGO_URL_OFFLINE;

const mongoUrl = process.env.USE_ONLINE_DB === 'true' ? mongoUrlOnline : mongoUrlOffline;

const connect = () => {
    mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true

    })
        .then(() => console.log('connect db sucess'))
        .catch((err) => console.log('connect err', err))
}

module.exports = connect
