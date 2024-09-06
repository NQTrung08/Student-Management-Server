

// lv1
const dev = {
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || 'studentManagement',
  }
}

const pro = {
  db: {
    host: process.env.PRO_DB_HOST || 'localhost',
    port: process.env.PRO_DB_PORT || 27017,
    name: process.env.PRO_DB_NAME || 'studentManagement',
    url: process.env.MONGO_URL_ONLINE
  }
}

const config = { dev, pro };
const env = process.env.NODE_ENV || 'dev';

console.log(config[env], env);

module.exports = config[env];