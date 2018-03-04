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
                        <v-text-field box label="Username :" v-model="form.username" persistent-hint></v-text-field>
                        <v-text-field box label="Email :" v-model="form.email" persistent-hint></v-text-field>
                        <v-text-field box label="Nama Lengkap :" v-model="form.namaLengkap" persistent-hint></v-text-field>
                        <v-text-field box label="Alamat :" v-model="form.alamat" persistent-hint></v-text-field>
                        <v-text-field box label="No Telp :" v-model="form.noTelp" persistent-hint></v-text-field>
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
            username: '',
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