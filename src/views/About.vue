<template>
  <div class="about">
    <h1>{{ $t('message') }}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HelloI18n extends Vue {
}
</script>
