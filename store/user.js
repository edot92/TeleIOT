import axios from '../plugins/axios'

export default {
  namespaced: true,
  state: {
    jwt: '',
    user: {
      role: '',
      username: '',
      id: ''
    }
  },
  mutations: {
    init (state, data) {
      state.jwt = data.jwt
      state.user.role = data.user.role
      state.user.username = data.user.username
      state.user.id = data.user.id
    },
    setJwt (state, data) {
      state.jwt = data
    },
    setUser (state, { user, jwt }) {
      state.user = user
      state.jwt = jwt
    }
  },
  actions: {
    setJwt ({ commit }, { user, jwt }) {
      return new Promise(function (resolve, reject) {
        commit('setJwt', { user, jwt })
        resolve()
      })
    },
    setUser ({ commit }, data) {
      return new Promise(function (resolve, reject) {
        commit('setUser', data)
        resolve()
      })
    },
    isAuth () {
      const thisV = this
      return new Promise(function (resolve, reject) {
        if (thisV.state.User.jwt) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    },
    httpLogin ({ commit }, { username, password }) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'get',
          url: '/api/user/login/' + username + '/' + password
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
    /** ******** petugas ****************/
    httpPetugasGetList ({ commit }, { offset, limit }) {
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
              '/api/user/petugas/getlist/' +
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
    },
    httpPetugasAddNew ({ commit }, data) {
      let jwt = this.state.User.jwt
      const thisV = this
      return new Promise(function (resolve, reject) {
        if (jwt === undefined || jwt === '' || !!jwt === false) {
          var error = 'jwt not vaild'
          reject(error)
        } else {
          axios({
            method: 'post',
            url: '/api/user/petugas/addnew/' + thisV.state.User.jwt,
            data: data
          })
            .then(value => {
              resolve(value.data)
            })
            .catch(err => {
              reject(err)
            })
        }
      })
    },
    /** ********pelanggan ****************/
    httpPelangganGetList ({ commit }, { offset, limit }) {
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
              '/api/user/pelanggan/getlist/' +
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
