export default function ({ store, redirect, error }) {
  // console.log(store.state.User)
  // if (store.state.User.jwt) {
  //   // return redirect('/login')
  // }
  store.dispatch('User/isAuth').then(value => {
    if (value === true) {
    } else {
      return redirect('/login')
    }
  })
}
