<template>
    <div>
        <v-layout>
            <v-flex xs2>

            </v-flex>
            <v-flex xs6>
                <v-card>
                    <!-- <v-card-title>
                        User Profil
                    </v-card-title> -->
                    <v-card-text>
                        <v-text-field box label="Email :" v-model="email" persistent-hint></v-text-field>
                        <v-text-field box label="Nama Lengkap :" v-model="namaLengkap" persistent-hint></v-text-field>
                        <v-text-field box label="Alamat :" v-model="alamat" persistent-hint></v-text-field>
                        <v-text-field box label="No Telp :" v-model="noTelp" persistent-hint></v-text-field>
                        <v-text-field box label="Username Telegram :" v-model="userTele" persistent-hint></v-text-field>
                        <v-btn color="primary">
                            Ganti password
                        </v-btn>
                        <v-btn dark color="green darken-1">
                            Update
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

    </div>
</template>

<script>
    export default {
      layout: 'layout',
      data () {
        return {
          form: {
            email: '',
            namaLengkap: '',
            alamat: '',
            noTelp: '',
            userTele: ''
          }

        }
      }
    }
</script>