// This is where we store Twitter and Facebook credentials

module.exports = {
  twitter: {
  consumerKey: process.env.TWITTER_KEY || 'TeMMcBZiE61uQRY6zF2lDDX2m',
  consumerSecret: process.env.TWITTER_SECRET  || 'bB1UWpMM5wEIBakC4bBcRGXkEAjKDfNhwe48LjxNlvspmVaQi6',
  callbackURL: '/auth/twitter/callback',
  passReqToCallback: true
  },

  facebook: {
  clientID: process.env.FACEBOOK_ID || '754220301289665',
  clientSecret: process.env.FACEBOOK_SECRET || '41860e58c256a3d7ad8267d3c1939a4a',
  callbackURL: '/auth/facebook/callback',
  passReqToCallback: true
  }
}
