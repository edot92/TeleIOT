var fs = require('fs')
var keypair = require('keypair')
var dir = __dirname
var pair = keypair({
  bits: 2048, // size for the private key in bits. Default: 2048
  e: 65537 // public exponent to use. Default: 65537
})
console.log(chalk.red(process.cwd()))
fs.writeFile(process.cwd() + '/keys/private.key', pair.private, function (err) {
  if (err) {
    return console.error(err)
  }
  console.log('RSA private key file generated')
})

fs.writeFile(process.cwd() + '/keys/public.pem', pair.public, function (err) {
  if (err) {
    return console.error(err)
  }
  console.log('RSA public key file generated')
})
