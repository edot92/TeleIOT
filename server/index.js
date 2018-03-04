require('dotenv').config()
const chalk = require('chalk')
global.chalk = chalk
const isEnableTele = process.env.TELE_ENABLED || false
const isGenerateKey = process.env.GENERATEKEY_ENABLED || false
if (isEnableTele) {
  require('./telegram')
}
if (isGenerateKey) {
  require('../helper/generatekey')
}
// database
require('../models/index')
const { Nuxt, Builder } = require('nuxt')

const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const StravaStrategy = require('passport-strava').Strategy
var SQLiteStore = require('connect-sqlite3')(session)
var server = express()
// var restapi = require('./api/index')
// server.use(function (req, res, next) {
//   console.log(req.url)
// })

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || '3000'
passport.use(
  new StravaStrategy(
    {
      clientID: '20070',
      clientSecret: '30aa8be4649723167e242710ff20e270571761a8',
      callbackURL: 'http://localhost:3000/auth/strava/callback'
    },
    function (accessToken, refreshToken, profile, done) {
      let user = {
        image: profile._json.profile,
        firstname: profile._json.firstname,
        lastname: profile._json.lastname,
        sex: profile._json.sex,
        id: profile.id
      }

      // Verify or create a user in the database here
      // The user object we are about to return gets passed to the route's controller as `req.user`
      return done(null, user)
    }
  )
)

// For serving static files from public directory
// server.use(express.static('public'));
server.use(cookieParser())
// server.use(bodyParser())
server.use(bodyParser.json()) // support json encoded bodies
server.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies
server.use('/api/user', require('./api/user'))
server.use('/api/device', require('./api/device'))
server.use(
  session({
    store: new SQLiteStore(),
    secret: 'keyboard cat',
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } // 1 week
  })
)
server.use(passport.initialize())
server.use(passport.session())
passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  // You can verify user info with the database if you need to here
  done(null, user)
})

server.get('/auth/strava', passport.authenticate('strava'))

server.get(
  '/auth/strava/callback',
  passport.authenticate('strava', {
    failureRedirect: 'http://localhost:3000',
    successRedirect: 'http://localhost:3000',
    failureFlash: true
  })
)

server.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
server.use(nuxt.render)
// Listen the server
server.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
