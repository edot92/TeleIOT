<template>
  <div>
    <h2>
      Users Pelanggan
    </h2>
    <v-layout wrap row>
      <v-flex xs12>
        <!-- <v-btn small color="primary" @click="onDialogAdd()">
          <v-icon>
            add
          </v-icon>
        </v-btn> -->
        <v-btn small color="primary" @click="getlist()">
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
            <td class="text-xs-center">{{props.item.username}}</td>
            <td class="text-xs-center">{{props.item.email}}</td>
            <td class="text-xs-center">{{props.item.namaLengkap}}</td>
            <td class="text-xs-center">{{props.item.alamat}}</td>
            <td class="text-xs-center">{{props.item.noTelp}}</td>
          </template>
        </v-data-table>
      </v-flex>
      <div v-if="dialogAdd==true">
        <add :show="dialogAdd">

        </add>
      </div>

    </v-layout>
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
        indexNo: [],
        headers: [
          {
            text: 'No ',
            align: 'center',
            sortable: true,
            value: 'no'
          },
          {
            text: 'Username ',
            align: 'center',
            sortable: true,
            value: 'username'
          },
          {
            text: 'Email ',
            align: 'center',
            sortable: true,
            value: 'email'
          },
          {
            text: 'Nama Lengkap ',
            align: 'center',
            sortable: true,
            value: 'namaLengkap'
          },
          {
            text: 'Alamat ',
            align: 'center',
            sortable: true,
            value: 'alamat'
          },
          {
            text: 'No Telp ',
            align: 'center',
            sortable: true,
            value: 'noTelp'
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
    mounted () {
      this.getlist()
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
        thisV.$store.dispatch('User/httpPelangganGetList', {
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
    }
  }
</script>