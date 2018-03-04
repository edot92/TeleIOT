const db = require('./index')
module.exports = {
  version: '1.0',

  addNew: function (paramDevice, paramPelanggan) {
    let b
    let a = new Promise(function (resolve, reject) {
      db.Pelanggan.create(paramPelanggan)
        .then(res => {
          console.log(res)
          paramDevice.pelangganId = res.dataValues.id
          b = new Promise(function (resolve, reject) {
            db.Device.create(paramDevice)
              .then(res => {
                resolve()
              })
              .catch(err => {
                reject(err)
              })
          })
          resolve(true)
        })
        .catch(err => {
          reject(err)
        })
    })
    return new Promise((resolve, reject) => {
      a
        .then(res => {
          return b
        })
        .then(res => {
          //   db.Device.save()
          //   db.Pelanggan.save()
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })

    // ...
  },
  getPagination: function (offset, limit) {
    return new Promise((resolve, reject) => {
      db.Device.findAndCountAll({
        limit: limit,
        offset: offset
      })
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
