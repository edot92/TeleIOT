const jwt = require('../../helper/jwt')
const DeviceModel = require('../../models/devices')
let logger = require('logat')
const log = console.log
// const router = Router()
var express = require('express')
var router = express.Router()
// router.get('/auth/addnew/:uniquetoken/:randomusernamepass/:jwt', function (
//   req,
//   res
// ) {
//   let tokenString = req.params.jwt
//   const uniquetoken = req.params.uniquetoken
//   const randomusernamepass = req.params.randomusernamepass
//   let paramUserSave = {
//     username: randomusernamepass,
//     namaLengkap: '',
//     email: '',
//     password: randomusernamepass,
//     alamat: '',
//     noTelp: '',
//     idTele: ''
//   }
//   let paramDeviceSave = {
//     uniqueToken: uniquetoken,
//     pelangganId: null
//   }
//   jwt
//     .validasiJwt(tokenString)
//     .then(value => {
//       return DeviceModel.addNew(paramDeviceSave, paramUserSave)
//     })
//     .then(value => {
//       let resData = {
//         error: false,
//         msg: 'berhasil mendaftarkan  Device dan user baru'
//       }
//       res.send(resData)
//       res.end()
//     })
//     .catch(err => {
//       let resData = {
//         error: true,
//         msg: 'gagal mendaftarkan Device ,' + err,
//         errMsg: err
//       }
//       res.send(resData)
//       res.end()
//     })
// })
router.get('/auth/addnew/:uniquetoken/:randomusernamepass/:jwt', function (
  req,
  res
) {
  let tokenString = req.params.jwt
  const uniquetoken = req.params.uniquetoken
  const randomusernamepass = req.params.randomusernamepass
  let paramUserSave = {
    username: randomusernamepass,
    namaLengkap: '',
    email: '',
    password: randomusernamepass,
    alamat: '',
    noTelp: '',
    idTele: ''
  }
  let paramDeviceSave = {
    uniqueToken: uniquetoken,
    pelangganId: null
  }
  jwt
    .validasiJwt(tokenString)
    .then(value => {
      return DeviceModel.addNew(paramDeviceSave, paramUserSave)
    })
    .then(value => {
      let resData = {
        error: false,
        msg: 'berhasil mendaftarkan  Device dan user baru'
      }
      res.send(resData)
      res.end()
    })
    .catch(err => {
      let resData = {
        error: true,
        msg: 'gagal mendaftarkan Device ,' + err,
        errMsg: err
      }
      res.send(resData)
      res.end()
    })
})
router.get('/auth/getlist/:offset/:limit/:jwt', function (req, res) {
  let offset = parseInt(req.params.offset)
  let limit = parseInt(req.params.limit)
  let tokenString = req.params.jwt
  jwt
    .validasiJwt(tokenString)
    .then(value => {
      return DeviceModel.getPagination(offset, limit)
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
