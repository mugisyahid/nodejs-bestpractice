module.exports = {
  port: 3000,
  appName: 'node js is awesome',
  mongo: {
    url: 'mongodb://localhost',
    collection: 'awesomecollection'
  },
  secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret'
}
