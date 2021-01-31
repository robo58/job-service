<template>
  <v-app id="app">
    <Navbar />
    <v-main class="grey lighten-2">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  components: {
    Navbar,
  },
  data: () => ({}),
};
</script>

<style lang="scss">
* {
  color: grey;
}
</style>