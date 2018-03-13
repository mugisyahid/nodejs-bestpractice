module.exports = {
  port: 3000,
  appName: 'node js is awesome',
  mongo: {
    url: 'mongodb://localhost',
    db: 'awesomedb'
  },
  secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret'
}
