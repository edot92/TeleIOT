export default {
  initVuex (thisV) {
    // cek ls
    let temp = window.sessionStorage.getItem('vuex')
    if (temp) {
      try {
        // get User ls and set User
        let ls = JSON.parse(temp)
        thisV.$store.commit('User/init', ls.User)
      } catch (error) {}
    }
  }
}
