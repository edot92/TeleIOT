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
                        <v-toolbar-title>Settings</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn dark flat @click.native="dialog = false">Save</v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    <div>
                        konten add device
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
          widgets: false
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