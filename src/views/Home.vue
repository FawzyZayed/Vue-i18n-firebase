<template>
  <div class="home">

    <img alt="Vue logo" src="../assets/logo.png">
    <app-hello-world msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue'

@Component({
  components: {
    appHelloWorld: HelloWorld
  }
})
export default class Home extends Vue {

}
</script>
