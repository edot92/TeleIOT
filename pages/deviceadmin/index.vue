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
                <v-btn small color="info" @click="getlist()">
                    <v-icon>
                        refresh
                    </v-icon>
                </v-btn>
            </v-flex>
            <v-divider></v-divider>
            <v-flex xs12>
                <v-data-table :headers="headers" :items="items" :search="search" :pagination.sync="pagination" :total-items="totalItems"
                    :loading="loading">
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-center">{{props.item.index}}</td>
                        <td class="text-xs-center">{{ props.item.uniqueToken }}</td>
                        <td class="text-xs-center">
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
          search: '',
          totalItems: 0,
          items: [],
          loading: false,
          pagination: {},
          dialogAdd: false,
          headers: [
            {
              text: 'No',
              align: 'center',
              sortable: true,
              value: 'no'
            },
            {
              text: 'Unique Token',
              align: 'center',
              sortable: true,
              value: 'uniqueToken'
            },
            {
              text: 'Action',
              align: 'center',
              sortable: true,
              value: ''
            }
          ]

        }
      },
      watch: {
        pagination: {
          handler () {
            this.getlist()
          }
        }
      },
      methods: {
        onDialogAdd () {
          this.dialogAdd = false
          const thisV = this
          setTimeout(() => {
            thisV.dialogAdd = true
          }, 200)
        },
        getlist () {
          const thisV = this
          let limit = thisV.pagination.rowsPerPage
          let offset = thisV.pagination.page * limit - limit
          thisV.$store.dispatch('Device/httpDeviceGetList', {
            offset: offset,
            limit: limit
          }).then(value => {
            if (value.error === false) {
              if (value.payload.value.count <= thisV.pagination.rowsPerPage) {
                value.payload.value.count = thisV.pagination.rowsPerPage
              }
              thisV.totalItems = value.payload.value.count
              thisV.items = []
              thisV.items = value.payload.value.rows
              thisV.indexNo = []
              let count = offset + 1
              thisV.items.forEach(element => {
                element.index = count
                count++
              })
              console.log(thisV.items)
            } else {
              swal('Info', value.msg, 'error')
            }
            console.log(value)
          }).catch((err) => {
            console.error(err)
          })
        }
      },
      mounted () {
        // console.log(this.moment)
      }
    }
</script>