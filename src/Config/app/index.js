const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 3052,
    url: `http://localhost:${process.env.DEV_APP_PORT}`
  },
}

const pro = {
  app: {
    port: process.env.DEV_APP_PORT || 3052,
    url: process.env.URL_APP
  },
}

const config = { dev, pro };
const env = process.env.NODE_ENV || 'dev';

console.log(config[env], env);

module.exports = config[env];