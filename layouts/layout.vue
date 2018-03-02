<template>
    <div>
        <v-app id="inspire">
            <v-navigation-drawer fixed v-model="drawer" app>
                <v-list dense class=" lighten-4">
                    <template v-for="(item, i) in items">
                        <v-layout row v-if="item.heading" align-center :key="i">
                            <v-flex xs6>
                                <v-subheader v-if="item.heading">
                                    {{ item.heading }}
                                </v-subheader>
                            </v-flex>
                            <v-flex xs6 class="text-xs-right">
                                <v-btn small flat>edit</v-btn>
                            </v-flex>
                        </v-layout>
                        <v-divider dark v-else-if="item.divider" class="my-3" :key="i"></v-divider>
                        <v-list-tile :key="i" v-else @click="gotoUrl(item.url)">
                            <v-list-tile-action>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title class="primary--text">
                                    {{ item.text }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </template>
                </v-list>
            </v-navigation-drawer>
            <v-toolbar color="cyan" dark fixed app>
                <v-toolbar-side-icon @click.stop="drawer=! drawer "></v-toolbar-side-icon>
                <v-toolbar-title>{{judul}}</v-toolbar-title>
            </v-toolbar>
            <v-content>
                <v-container fluid>
                    <nuxt/>
                </v-container>
            </v-content>
            <v-footer color="cyan" app>
                <span class="white--text ">&copy; 2017</span>
            </v-footer>
            <!-- <template>
                <loading :show="show" :label="label">
                </loading>
            </template> -->
        </v-app>
    </div>
</template>

<script>
    export default {
      data: () => ({
        label: 'loading',
        show: true,
        judul: '',
        items: [
          { icon: 'person', text: 'User', url: '/user' },
          { icon: 'settings', text: 'Device Admin', url: '/deviceadmin' },
          { icon: 'settings', text: 'Device', url: '/device' },
          { icon: 'person', text: 'Profile', url: '/profile' },
          { icon: 'lock', text: 'Login', url: '/login' }

          //   { icon: 'touch_app', text: 'Reminders' }
          //   { divider: true },
          //   { heading: 'Labels' },
          //   { icon: 'add', text: 'Create new label' },
          //   { divider: true },
          //   { icon: 'archive', text: 'Archive' },
          //   { icon: 'delete', text: 'Trash' },
          //   { divider: true },
          //   { icon: 'settings', text: 'Settings' },
          //   { icon: 'chat_bubble', text: 'Trash' },
          //   { icon: 'help', text: 'Help' },
          //   { icon: 'phonelink', text: 'App downloads' },
          //   { icon: 'keyboard', text: 'Keyboard shortcuts' }
        ],
        drawer: null
      }),

      props: {
        source: String
      },
      mounted () {
        if (process.browser) {
          const thisV = this
          thisV.judul = thisV.$route.name || 'Aplikasi Telegram IOT'
          setTimeout(() => {
            thisV.show = false
          }, 1000)
        }
      },
      methods: {
        gotoUrl (param) {
          window.location.href = param
        }
      }
    }
</script>