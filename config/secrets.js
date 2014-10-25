// This is where we store Twitter and Facebook credentials

module.exports = {

  db: process.env.MONGODB|| 'mongodb://localhost:27017/test',

  sessionSecret: process.env.SESSION_SECRET || 'Your Session Secret goes here',

  twitter: {
  consumerKey: process.env.TWITTER_KEY || 'TeMMcBZiE61uQRY6zF2lDDX2m',
  consumerSecret: process.env.TWITTER_SECRET  || 'bB1UWpMM5wEIBakC4bBcRGXkEAjKDfNhwe48LjxNlvspmVaQi6',
  callbackURL: 'http://127.0.0.1:8080/auth/twitter/callback',
  passReqToCallback: true
  },

  facebook: {
  clientID: process.env.FACEBOOK_ID || '754220301289665',
  clientSecret: process.env.FACEBOOK_SECRET || '41860e58c256a3d7ad8267d3c1939a4a',
  callbackURL: '/auth/facebook/callback',
  passReqToCallback: true
  }
}
