<template>
  <div>
    <b-container class="bv-example-row">
      <b-row class="justify-content-md-center my-5">
        <b-col md="6">
        <b-form @submit="onSubmit">
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
            :class="{ 'form-group--error' : $v.form.email.$error }"
          >
            <b-form-input
              id="input-1"
              v-model="form.email"
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
              v-model="form.name"
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
              v-model="form.age"
              type="number"
              @blur="$v.form.age.$touch()"
              required
              placeholder="Enter age"
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
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
export default class tableAdd extends Vue {
  public form = {
    email: '',
    name: '',
    age: ''
  }

  onSubmit (evt: any) {
    evt.preventDefault()
    axios.post('https://vue-users.firebaseio.com/userTable.json', {
      email: this.form.email,
      name: this.form.name,
      age: this.form.age
    })
      .then(res => console.log(res))
      .catch(error => console.log(error))
  }
}
</script>

<style lang="scss" scoped>
.form-group--error{
  color: red;
  input,textarea{
    border: 1px solid red;
    color: red;
    &:focus{
      box-shadow: 0 0 0 0.2rem rgba(255, 0, 0, 0.25);
    }
    &::placeholder{
      color: red;
    }
  }
}
</style>
