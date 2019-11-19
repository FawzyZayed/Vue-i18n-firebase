<template>
  <div>
    <b-form-group label="Selection mode:" label-cols-md="4">
      <b-form-select v-model="selectMode" :options="modes" class="mb-3"></b-form-select>
    </b-form-group>
    <!-- <b-table responsive striped hover
      selectable
      @row-selected="onRowSelected"
      :select-mode="selectMode"
      :items="items" :fields="fields" show-empty>
      </b-table> -->
      <b-table-simple responsive>
        <b-thead>
          <b-tr>
            <b-th>#</b-th>
            <b-th>name</b-th>
            <b-th>email</b-th>
            <b-th>age</b-th>
            <b-th>actions</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="(item, index) in items" :key="item.id">
            <b-td>{{ item.id }}</b-td>
            <b-td>{{ item.name }}</b-td>
            <b-td>{{ item.email}}</b-td>
            <b-td>{{ item.age}}</b-td>
            <b-td>
              <b-button v-b-modal="'modal-multi-'+index" variant="primary" @click="editItem(index, item.id)">edit</b-button>
              <button @click="deleteItem(index, item.id)" class="btn btn-danger mx-1">delete</button>
              <b-modal :id="'modal-multi-'+index" size="lg" :title="'edit user id : '+item.id">
                {{ item.name }} - {{ item.id }}
              </b-modal>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'

@Component
export default class tableList extends Vue {
  private modes = ['multi', 'single', 'range']
  private selectMode = 'multi'
  private selected = []
  private fields = [
    {
      key: 'id',
      label: '#',
      sortable: true
    },
    {
      key: 'name',
      label: 'User Name',
      sortable: true
    },
    {
      key: 'email',
      label: 'E-mail',
      sortable: true
    },
    {
      key: 'age',
      label: 'User age',
      sortable: true
    }
  ]
  private items: string[] = []

  private beforeCreate () {
    this.axios.get('https://vue-users.firebaseio.com/userTable.json').then(response => {
      // console.log(response.data)
      const data = response.data
      const key: string[] = []
      for (let key in data) {
        const userTable = data[key]
        userTable.id = key
        // console.log(userTable)
        this.items.push(userTable)
      }
    })
  }
  editItem (index: string, id: number) {
    console.log(index)
    // axios.post(`https://vue-users.firebaseio.com/userTable/${id}.json`)
    //   .then(res => console.log(res))
    //   .catch(error => console.log(error))
  }
  deleteItem (index: number, id: string) {
    console.log(index + ' : ' + id)
    axios.delete(`https://vue-users.firebaseio.com/userTable/${id}.json`)
      .then(response => {
        this.items.splice(index, 1)
      })
      .catch(error => console.log(error))
  }
}
</script>
