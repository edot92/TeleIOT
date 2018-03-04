const db = require('./index')
module.exports = {
  version: '1.0',
  getPagination: function (offset, limit) {
    return new Promise((resolve, reject) => {
      db.Pelanggan.findAndCountAll({
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
