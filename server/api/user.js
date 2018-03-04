// var bcrypt = require('bcrypt')
const jwt = require('../../helper/jwt')
const PelangganModel = require('../../models/pelanggan')
let logger = require('logat')
const log = console.log
// const router = Router()
var express = require('express')
var router = express.Router()

router.get('/userdaftar/:username/:password', function (req, res) {})

router.get('/login/:username/:password', function (req, res) {
  let username = req.params.username
  let response = {
    error: true,
    payload: {
      user: {
        username: '',
        id: '',
        role: ''
      },
      jwt: ''
    },
    msg: 'get login'
  }
  // let password = req.params.password
  let cekPetugas = new Promise((resolve, reject) => {
    global.db.Petugas.findAll({
      where: {
        username: username
      }
    })
      .then(value => {
        console.log(value)
        if (value.length > 0) {
          jwt
            .generateJwt(value[0].dataValues.username, value[0].dataValues.id)
            .then(token => {
              response.error = false
              response.payload.user = {
                username: value[0].dataValues.username,
                id: value[0].dataValues.id,
                role: 'petugas'
              }
              response.payload.jwt = token
              response.msg = 'berhasil login sebagai Petugas'

              resolve(true)
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          resolve(false)
        }
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
  let cekPelanggan = new Promise((resolve, reject) => {
    global.db.Pelanggan.findAll({
      where: {
        username: username
      }
    })
      .then(value => {
        console.log(value)
        if (value.length > 0) {
          jwt
            .generateJwt(value[0].dataValues.username, value[0].dataValues.id)
            .then(token => {
              response.error = false
              response.payload.user = {
                username: value[0].dataValues.username,
                id: value[0].dataValues.id,
                role: 'pelanggan'
              }
              response.payload.jwt = token
              response.msg = 'berhasil login sebagai Pelanggan'
              resolve(true)
            })
            .catch(err => reject(err))
        } else {
          resolve(false)
        }
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
  cekPetugas
    .then(value => {
      if (value === false) {
        return cekPelanggan
      } else {
        return new Promise(function (resolve, reject) {
          resolve(true)
        })
      }
    })
    .then(value => {
      if (value === true) {
        res.send(response)
        res.end()
      } else {
        response.error = true
        response.payload.user = []
        response.msg = 'username tidak terdaftar'
        res.send(response)
        res.end()
      }
    })
    .catch(err => {
      // logger.info(err)
      try {
        response.error = true
        response.payload.user = []
        response.msg = err
        res.send(response)
        res.end()
      } catch (error) {
        logger.info(error)
      }
    })
})

router.get('/refreshjwt/:username/:jwt', function (req, res) {
  let oldJwt = req.params.jwt
  // let username = req.params.username
  jwt
    .validasiJwt(oldJwt)
    .then(value => {
      res.send(value)
      // try {
      //   jwt.generateJwt(username, value.id)
      // } catch (error) {
      //   log(chalk.red(error))
      // }
    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/petugas/getlist/:offset/:limit/:jwt', function (req, res) {
  let offset = parseInt(req.params.offset)
  let limit = parseInt(req.params.limit)
  let totalItems = 0

  let a = new Promise(function (resolve, reject) {
    global.db.Petugas.count()
      .then(c => {
        resolve(c)
      })
      .catch(err => {
        reject(err)
      })
  })
  let b = new Promise(function (resolve, reject) {
    global.db.Petugas.findAll({
      offset: offset,
      limit: limit
    })
      .then(value => {
        resolve(value)
      })
      .catch(err => {
        reject(err)
      })
  })
  a
    .then(value => {
      totalItems = value
      return b
    })
    .then(value => {
      let resData = {
        error: false,
        payload: {
          user: value,
          total: totalItems
        },
        msg: 'success'
      }
      res.send(resData)
      res.end()
    })
    .catch(err => {
      console.log(err.message())
      let resData = {
        error: true,
        msg: 'error db'
      }
      res.send(resData)
      res.end()
    })
})
router.post('/petugas/addnew/:jwt', function (req, res) {
  let tokenString = req.params.jwt
  let paramBody = req.body
  console.log(chalk.green(paramBody))
  let a = new Promise(function (resolve, reject) {
    global.db.Petugas.create(paramBody)
      .then(value => {
        // you can now access the newly created task via the variable task
        resolve(value)
      })
      .catch(err => {
        reject(err)
      })
  })
  jwt
    .validasiJwt(tokenString)
    .then(value => {
      return a
    })
    .then(value => {
      let resData = {
        error: false,
        msg: 'berhasil mendaftarkan  user'
      }
      res.send(resData)
      res.end()
    })
    .catch(err => {
      let resData = {
        error: true,
        msg: 'gagal mendaftarkan  user ,' + err.errors[0].message,
        errMsg: err
      }
      res.send(resData)
      res.end()
    })
})
/** *****pelanggan  */
router.get('/pelanggan/getlist/:offset/:limit/:jwt', function (req, res) {
  let offset = parseInt(req.params.offset)
  let limit = parseInt(req.params.limit)
  let tokenString = req.params.jwt
  jwt
    .validasiJwt(tokenString)
    .then(value => {
      return PelangganModel.getPagination(offset, limit)
    })
    .then(value => {
      let resData = {
        error: false,
        payload: {
          value
        },
        msg: 'berhasil'
      }
      res.send(resData)
      res.end()
    })
    .catch(err => {
      let resData = {
        error: true,
        msg: 'gagal ,' + err,
        errMsg: err
      }
      res.send(resData)
      res.end()
    })
})
module.exports = router
