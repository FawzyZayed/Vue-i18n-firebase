<template>
  <div>
    <!-- <b-form-group label="Selection mode:" label-cols-md="4">
      <b-form-select v-model="selectMode" :options="modes" class="mb-3"></b-form-select>
    </b-form-group> -->
    <!-- <b-table responsive striped hover
      selectable
      @row-selected="onRowSelected"
      :select-mode="selectMode"
      :items="items" :fields="fields" show-empty>
      </b-table> -->
      <b-container class="bv-example-row my-5">
        <b-row class="justify-content-md-center">
          <b-col col lg="12">
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
                    <b-button v-b-modal="'modal-multi-'+index" variant="primary">edit</b-button>
                    <button @click="deleteItem(index, item.id)" class="btn btn-danger mx-1">delete</button>
                    <b-modal :id="'modal-multi-'+index"  size="lg" :title="'edit user id : '+item.id" @ok="onSubmit(item)" ok-title="submit">
                      <b-form>
                        <b-form-group
                          id="input-group-1"
                          label="Email address:"
                          label-for="input-1"
                          :class="{ 'form-group--error' : $v.form.email.$error }"
                        >
                          <b-form-input
                            id="input-1"
                            v-model="item.email"
                            type="email"
                            @blur="$v.form.email.$touch()"
                            required
                            placeholder="Enter email"
                          ></b-form-input>
                        </b-form-group>

                        <b-form-group
                          id="input-group-2"
                          label="Your Name:"
                          :class="{ 'form-group--error' : $v.form.name.$error }"
                          label-for="input-2">
                          <b-form-input
                            id="input-2"
                            v-model="item.name"
                            @blur="$v.form.name.$touch()"
                            required
                            placeholder="Enter name"
                          ></b-form-input>
                        </b-form-group>
                        <b-form-group
                          id="input-group-3"
                          label="Your age:"
                          :class="{ 'form-group--error' : $v.form.age.$error }"
                          description="age between 20 / 30"
                          label-for="input-2">
                          <b-form-input
                            id="input-3"
                            v-model="item.age"
                            type="number"
                            @blur="$v.form.age.$touch()"
                            required
                            placeholder="Enter age"
                          ></b-form-input>
                        </b-form-group>
                      </b-form>
                    </b-modal>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-col>
        </b-row>
      </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { validationMixin } from 'vuelidate'
import { required, minLength, between, email } from 'vuelidate/lib/validators'
import axios from 'axios'

@Component({
  mixins: [validationMixin],
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(4)
      },
      email: {
        required,
        email
      },
      age: {
        required,
        between: between(20, 30)
      }
    }
  }
})

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
  public form = {
    email: '',
    name: '',
    age: ''
  }
  private beforeCreate () {
    this.axios.get('https://vue-users.firebaseio.com/userTable.json').then(response => {
      // console.log(response.data)
      const data = response.data
      for (let key in data) {
        const userTable = data[key]
        userTable.id = key
        this.items.push(userTable)
      }
    })
  }
  onSubmit (evt: any) {
    console.log(evt.id)
    axios.put(`https://vue-users.firebaseio.com/userTable/${evt.id}.json`, {
      name: evt.name,
      email: evt.email,
      age: evt.age
    })
      .then(res => console.log(res))
      .catch(error => console.log(error))
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
