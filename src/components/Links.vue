<template>
  <v-list>
    <v-list-item v-if="user" to="/jobs">
      <v-list-item-title>
        <v-icon left>mdi-office-building</v-icon>
        Jobs
      </v-list-item-title>
    </v-list-item>
    <v-list-item v-if="user && user.id === 3" to="/admin-panel">
      <v-list-item-title>
        <v-icon left>mdi-account-key</v-icon>
        Admin panel
      </v-list-item-title>
    </v-list-item>
    <v-list-item v-if="!user" to="/login">
      <v-list-item-title>
        <v-icon left>mdi-account</v-icon>
        Login
      </v-list-item-title>
    </v-list-item>
    <v-list-item v-if="!user" to="/register">
      <v-list-item-title>
        <v-icon left>mdi-account-circle</v-icon>
        Register
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>

<style>
</style>