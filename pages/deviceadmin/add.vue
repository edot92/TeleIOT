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
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn dark flat @click.native="dialog = false">Save</v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    <div>
                        <br>
                        <v-layout>
                            <v-flex xs2>

                            </v-flex>
                            <v-flex xs6>
                                <v-card>
                                    <v-card-text>
                                        <v-text-field box label="Unique Token :" v-model="email" persistent-hint></v-text-field>
                                        <v-select label="Pilih ID telegram" :items="listUser">

                                        </v-select>
                                        <div style="
                                               position: relative;
                                               align-items: center;
                                               align-content: center;
                                               ">
                                            <v-btn block color="primary">
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
          listUser: ['tes1', 'tes2']
        }
      },
      watch: {
        show (param) {
          this.dialog = param
        }
      },
      mounted () {
        this.dialog = this.show
      }
    }
</script>