<template>
    <div>

        <v-layout wrap row>
            <v-flex xs12>
                <h2>
                    Device Admin
                </h2>
                <v-btn small color="primary" @click="onDialogAdd()">
                    <v-icon>
                        add
                    </v-icon>
                </v-btn>
            </v-flex>
            <v-divider></v-divider>
            <v-flex xs12>
                <v-data-table :headers="headers" :items="items">
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.name }}</td>
                        <td class="text-xs-right">{{ props.item.calories }}</td>
                        <td class="text-xs-right">{{ props.item.fat }}</td>
                        <td class="text-xs-right">{{ props.item.carbs }}</td>
                        <td class="text-xs-right">{{ props.item.protein }}</td>
                        <td class="text-xs-right">{{ props.item.iron }}</td>
                        <td>
                            <v-btn color="info">
                                <v-icon>
                                    edit
                                </v-icon>

                            </v-btn>
                            <v-btn color="error">
                                <v-icon>
                                    remove
                                </v-icon>
                            </v-btn>
                        </td>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
        <div v-if="dialogAdd==true">
            <add :show="dialogAdd">

            </add>
        </div>

    </div>
</template>

<script>
    import add from './add.vue'
    export default {
      components: {
        add
      },
      layout: 'layout',
      data () {
        return {
          dialogAdd: false,
          headers: [
            {
              text: 'Unique Token',
              align: 'center',
              sortable: true,
              value: 'uniqueToken'
            },
            {
              text: 'Id Telegram',
              align: 'center',
              sortable: true,
              value: 'user'
            }
          ],
          items: [
          ]
        }
      },
      methods: {
        onDialogAdd () {
          this.dialogAdd = false
          const thisV = this
          setTimeout(() => {
            thisV.dialogAdd = true
          }, 200)
        }
      },
      mounted () {
        // console.log(this.moment)
      }
    }
</script>