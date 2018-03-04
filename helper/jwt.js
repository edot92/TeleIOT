const jwt = require('jsonwebtoken')
const fs = require('fs')
var cert = fs.readFileSync(process.cwd() + '/keys/private.key')
var certPublic = fs.readFileSync(process.cwd() + '/keys/public.pem') // get public key
module.exports = {
  generateJwt: function (username, id) {
    if (id) {
    } else {
      id = 'ini_tes_id'
    }
    if (username) {
    } else {
      username = 'ini_username'
    }
    return new Promise((resolve, reject) => {
      jwt.sign(
        {
          username: username,
          dataid: id,
          exp: Math.floor(Date.now() / 1000) + 60 * 60
        },
        cert,
        { algorithm: 'RS256' },
        function (err, token) {
          if (err) {
            reject(err)
          } else {
            resolve(token)
          }
        }
      )
    })
  },
  /**
   * @function validasiJwt
   * @param {String} tokenString , string dari token
   */
  validasiJwt: function (tokenString) {
    return new Promise((resolve, reject) => {
      jwt.verify(tokenString, certPublic, function (err, decoded) {
        if (err) {
          reject(err)
        } else {
          // var decoded2 = jwt.decode(tokenString, { complete: true })
          resolve(decoded)
        }
      })
    })
  }
}
