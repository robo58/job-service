<template>
  <nav>
    <!-- Nav -->
    <v-app-bar app flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase">
        <span>job</span>
        <span class="font-weight-bold">service</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- Dropdown menu -->
      <div class="d-none d-md-flex mx-2">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="grey" text v-bind="attrs" v-on="on">
              <v-icon left>mdi-chevron-down</v-icon>menu
            </v-btn>
          </template>
          <links />
        </v-menu>
      </div>

      <span
        v-if="user"
        style="cursor: pointer"
        @click="$router.push({ name: 'Profile', params: { id: user.id } })"
        class="blue-grey darken-4 white--text d-none d-sm-flex py-1 px-2 rounded"
        >{{ user.email }}</span
      >

      <!-- Logout -->
      <div v-if="user">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn @click="logout" icon v-bind="attrs" v-on="on">
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </template>
          <span class="red--text">Logout</span>
        </v-tooltip>
      </div>
    </v-app-bar>

    <!-- Sidebar -->
    <v-navigation-drawer app v-model="drawer" class="blue-grey darken-4">
      <v-row class="mb-4">
        <v-col class="text-center">
          <span class="overline">job service</span>
        </v-col>
      </v-row>

      <!-- List of actions -->
      <links />
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Api from "../Api/Api";
import Links from "./Links.vue";
import { mapGetters } from "vuex";

export default {
  components: { Links },
  data: () => ({
    drawer: false,
  }),
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    logout() {
      Api.post("/logout")
        .then((response) => {
          console.log(response);
          localStorage.removeItem("api_token");
          this.$store.dispatch("user", null);
          window.location.href = "/login";
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>