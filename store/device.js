import axios from '../plugins/axios'

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    httpDeviceAddnew ({ commit }, { uniquetoken, userandpass }) {
      let jwt = this.state.User.jwt
      return new Promise(function (resolve, reject) {
        axios({
          method: 'get',
          url:
            '/api/device/auth/addnew/' +
            uniquetoken +
            '/' +
            userandpass +
            '/' +
            jwt
        })
          .then(value => {
            // console.log(value)
            resolve(value.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    httpDeviceGetList ({ commit }, { offset, limit }) {
      let jwt = this.state.User.jwt
      const thisV = this
      return new Promise(function (resolve, reject) {
        if (jwt === undefined || jwt === '' || !!jwt === false) {
          var error = 'jwt not vaild'
          reject(error)
        } else {
          axios({
            method: 'get',
            url:
              '/api/device/auth/getlist/' +
              offset +
              '/' +
              limit +
              '/' +
              thisV.state.User.jwt +
              '/'
          })
            .then(value => {
              resolve(value.data)
            })
            .catch(err => {
              reject(err)
            })
        }
      })
    }
  }
}
