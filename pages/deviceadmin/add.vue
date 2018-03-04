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
                        <v-toolbar-title>Add new device</v-toolbar-title>
                    </v-toolbar>
                    <div>
                        <br>
                        <v-layout>
                            <v-flex xs2>

                            </v-flex>
                            <v-flex xs6>
                                <v-card>
                                    <v-card-text>
                                        <v-text-field disabled box label="Unique Token :" v-model="uniqueToken" persistent-hint></v-text-field>
                                        <v-text-field disabled box label="username :" v-model="username" persistent-hint></v-text-field>
                                        <v-text-field disabled box label="password :" v-model="password" persistent-hint></v-text-field>
                                        <div style="
                                               position: relative;
                                               align-items: center;
                                               align-content: center;
                                               ">
                                            <v-btn block color="primary" @click="addnew">
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
          uniqueToken: '',
          username: '',
          password: '',
          dialog: false,
          notifications: false,
          sound: true,
          widgets: false,
          listUser: ['tes1', 'tes2']
        }
      },
      watch: {
        show (param) {
          this.dialog = param
        }
      },
      mounted () {
        this.generateRandom()
      },
      methods: {
        generateRandom () {
          this.uniqueToken = this.$moment().format('x') +
                    Math.random().toString(36).substring(7)

          let tempuserAndPas = ''
          tempuserAndPas = this.$moment().format('DDMM') + Math.random().toString(36).substring(10) + this.$moment().format('hhmmss')
          this.username = tempuserAndPas
          this.password = tempuserAndPas
          this.dialog = this.show
        },
        addnew () {
          const thisV = this
          if (thisV.uniqueToken === '' || thisV.username === '') {
            swal('', 'harap isi parameter', 'warning')
            return
          }
          let param = {
            uniquetoken: thisV.uniqueToken,
            userandpass: thisV.username
          }
          thisV.$store.dispatch('Device/httpDeviceAddnew', param).then(res => {
            if (res.error === false) {
              thisV.generateRandom()
              swal('', res.msg, 'success')
              thisV.dialog = false
            } else {
              swal('', res.msg, 'error')
            }
          }).catch((err) => {
            thisV.generateRandom()
            console.error(err)
            swal('', err, 'error')
          })
        }
      }
    }
</script>