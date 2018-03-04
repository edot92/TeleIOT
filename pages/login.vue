<template>

  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip left>
              <v-btn icon small href="https://www.facebook.com/eddot.fu" target="_blank" slot="activator">
                <v-icon small>mdi-info</v-icon>
                <!-- <span>Nama Aplikasi</span> -->
              </v-btn>
              <span>Aplikasi Tele IOT </span>
            </v-tooltip>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="person" name="login" v-model="form.username" label="Login" type="text"></v-text-field>
              <v-text-field prepend-icon="lock" v-model="form.password" name="password" label="Password" id="password" type="password"></v-text-field>
              <!-- <v-select :items="itemSelect" label="Login Sebagai ?" single-line auto prepend-icon="option" hide-details></v-select> -->
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="doLogin">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
  export default {
    layout: 'layoutpolos',
    data: () => ({
      drawer: null,
      itemSelect: [
        'petugas',
        'pengguna'
      ],
      form: {
        username: '',
        password: ''
      }
    }),

    props: {
      source: String
    },
    mounted () {
      this.$store.dispatch('User/isAuth').then(isAuth => {
        if (isAuth) {
          this.$router.push('/')
        } else {

        }
      })
    },
    methods: {
      doLogin () {
        if (this.form.username === '' && this.form.password === '') {
          swal({
            title: 'Informasi',
            text: 'mohon menglengkapi form',
            icon: 'error'
          })
          return
        }
        this.$store.dispatch('User/httpLogin', {
          username: this.form.username,
          password: this.form.password
        }).then((value) => {
          if (value.error === false) {
            swal({
              title: 'Informasi',
              text: value.msg,
              icon: 'success'
            })
            this.$store.dispatch('User/setUser', {
              user: value.payload.user,
              jwt: value.payload.jwt
            }).then(() => {
              this.$router.push('/')
            })
          } else {
            swal({
              title: 'Informasi',
              text: value.msg,
              icon: 'error'
            })
          }
        }).catch((err) => {
          console.error(err)
        })
      }
    }
  }
</script>