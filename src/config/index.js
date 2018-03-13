module.exports = {
  port: 3000,
  appName: 'node js is awesome',
  secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret'
}
