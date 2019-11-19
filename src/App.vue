<template>
  <div id="app">
    <div id="nav">
      <b-navbar toggleable="lg" type="light" variant="light">
        <b-navbar-brand href="#">NavBar</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item>
              <router-link :to="{ name: 'home' }">Home</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link :to="{ name: 'about' }">About</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link :to="{ name: 'additem' }">Add Item</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link :to="{ name: 'showlist' }">Show List</router-link>
            </b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav>
            <!-- <b-nav-form>
              <b-form-input
                size="sm"
                class="mr-sm-2"
                placeholder="Search"
              ></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit"
                >Search</b-button
              >
            </b-nav-form> -->

            <b-nav-item-dropdown :text="$t('mylang')" right>
              <b-dropdown-item
                v-for="(lang, i) in langs"
                :key="`Lang${i}`"
                @click="pushLangLink(lang)"
                :class="{ 'lang-current': lang === currentlang }"
                >{{ lang }}</b-dropdown-item
              >
            </b-nav-item-dropdown>

            <!-- <b-nav-item-dropdown right>
              <template v-slot:button-content>
                <em>User</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown> -->
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import I18n from './i18n'

@Component
export default class App extends Vue {
  public currentlang: string = I18n.locale
  public langs: string[] = ['ar', 'en']

  pushLangLink (local: string) {
    this.$i18n.locale = local
    this.currentlang = local
    let body = document.getElementsByTagName('body')[0]

    this.$router.push({
      params: { lang: this.$i18n.locale }
    })
    if (this.currentlang === 'ar') {
      body.classList.add('rtl')
    } else {
      body.classList.remove('rtl')
    }
  }
  created () {
    if (this.currentlang === 'ar') {
      let body = document.getElementsByTagName('body')[0]
      body.classList.add('rtl')
    }
  }
}
</script>

<style lang="scss">
body{
  &.rtl{
    direction: rtl
  }
}
.lang-current {
  display: none;
}

</style>
