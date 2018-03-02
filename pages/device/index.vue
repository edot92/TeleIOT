<template>
    <div>

        <v-layout wrap row>
            <v-flex xs12>
                <h2>
                    Device
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
              text: 'Dessert (100g serving)',
              align: 'center',
              sortable: false,
              value: 'name'
            },
            { text: 'Calories', align: 'center', value: 'calories' },
            { text: 'Fat (g)', align: 'center', value: 'fat' },
            { text: 'Carbs (g)', align: 'center', value: 'carbs' },
            { text: 'Protein (g)', align: 'center', value: 'protein' },
            { text: 'Iron (%)', align: 'center', value: 'iron' },
            { text: 'Action', align: 'center', value: 'Action' }

          ],
          items: [
            {
              value: false,
              name: 'Frozen Yogurt',
              calories: 159,
              fat: 6.0,
              carbs: 24,
              protein: 4.0,
              iron: '1%'
            }

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
      }
    }
</script>