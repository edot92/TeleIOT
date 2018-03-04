<template>

    <div>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay="false">
                <!-- <v-btn color="primary" dark slot="activator">Open Dialog</v-btn> -->
                <v-card>
                    <v-toolbar dark color="primary">
                        <v-btn icon @click.native="dialog = false" dark>
                            <v-icon>close</v-icon>
                        </v-btn>
                        <v-toolbar-title dark>Add User Baru</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <div>
                        <br>
                        <v-layout>
                            <v-flex xs2>

                            </v-flex>
                            <v-flex xs6>
                                <v-card>
                                    <v-card-text>
                                        <v-text-field box label="*Username :" v-model="form.username" persistent-hint></v-text-field>
                                        <v-text-field box label="*Password :" v-model="form.password" persistent-hint></v-text-field>
                                        <v-text-field box label="*Email :" v-model="form.email" persistent-hint></v-text-field>
                                        <v-text-field box label="*Nama Lengkap :" v-model="form.namaLengkap" persistent-hint></v-text-field>
                                        <v-text-field box label="Alamat :" v-model="form.alamat" persistent-hint></v-text-field>
                                        <v-text-field box label="No Telp :" v-model="form.noTelp" persistent-hint></v-text-field>

                                        <div style="
                                       position: relative;
                                       align-items: center;
                                       align-content: center;
                                       ">
                                            <v-btn @click="onSubmit" block color="primary">
                                                Simpan
                                            </v-btn>
                                        </div>
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </div>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>

<script>
    export default {
      props: ['show'],
      data () {
        return {
          dialog: false,
          notifications: false,
          sound: true,
          widgets: false,
          form: {
            username: '',
            email: '',
            namaLengkap: '',
            alamat: '',
            noTelp: ''
          }
        }
      },
      watch: {
        show (param) {
          this.dialog = param
        }
      },
      mounted () {
        this.dialog = this.show
      },
      methods: {
        onSubmit () {
          const thisV = this
          let isValid = true
          Object.keys(thisV.form).forEach(function (key) {
            if (thisV.form[key] === '') {
              isValid = false
            }
          })
          if (isValid === false) {
            swal('Info', 'harap lengkapi form', 'warning')
            return
          }
          thisV.$store.commit('setLoading', true)
          thisV.$store.dispatch('User/httpPetugasAddNew', thisV.form)
            .then((value) => {
              if (value.error === false) {
                swal('', value.msg, 'success')
                thisV.dialog = false
              } else {
                swal('', value.msg, 'error')
              }
            }).catch((err) => {
              console.error(err)
              thisV.$store.commit('setLoading', false)
            })
        }
      }
    }
</script>