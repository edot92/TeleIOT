<template>
  <div>
    <h2>
      Users
    </h2>
    <v-layout wrap row>
      <v-flex xs12>
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
        dialogAdd: false,
        headers: [
          // email: '',
          //     namaLengkap: '',
          //     alamat: '',
          //     noTelp: '',
          //     userTele: ''

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
          },
          {
            text: 'Username Telegram ',
            align: 'center',
            sortable: true,
            value: 'userTele'
          },
          {
            text: 'Role',
            align: 'center',
            sortable: true,
            value: 'role'
          }
        ],
        items: [
          // {
          //   value: false,
          //   name: 'Frozen Yogurt',
          //   calories: 159,
          //   fat: 6.0,
          //   carbs: 24,
          //   protein: 4.0,
          //   iron: '1%'
          // }
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