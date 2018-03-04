<template>
    <v-app id="inspire">
        <v-content>
            <v-container>
                <nuxt></nuxt>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import vuexstart from './initvuex'
    export default {
      beforeCreate () {
        if (process.browser) {
          const thisV = this
          vuexstart.initVuex(thisV)
        }
      },
      mounted () {

      }
    }
</script>