<template>
  <div class="pa-4">
    <div>
      <v-alert v-model="errorAlert" border="top" color="red lighten-2" dark>
        {{ errorMessage }}
      </v-alert>
    </div>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Register</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field v-model="first_name" label="First name" required>
              </v-text-field>
              <v-text-field v-model="last_name" label="Last name" required>
              </v-text-field>
              <v-text-field v-model="email" label="Email" type="email" required>
              </v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
              >
              </v-text-field>
              <v-text-field
                v-model="password_confirmation"
                label="Password confirmation"
                type="password"
                required
              >
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="pa-4"
            ><v-spacer></v-spacer
            ><v-btn
              :disabled="checkPassword"
              class="blue white--text"
              depressed
              @click="register"
              >register</v-btn
            ></v-card-actions
          >
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Api from "../../Api/Api";

export default {
  data: () => ({
    first_name: "",
    last_name: "",
    email: "",
    is_recruiter: false,
    password: "",
    password_confirmation: "",
    errorAlert: false,
    errorMessage: "",
  }),
  computed: {
    checkPassword: function () {
      if (this.password != this.password_confirmation) return true;
      else return false;
    },
  },
  methods: {
    register() {
      if (!this.is_recruiter) this.is_recruiter = false;

      Api.post("/register", {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        is_recruiter: this.is_recruiter,
        password: this.password,
        password_confirmation: this.password_confirmation,
      })
        .then(() => {
          window.location.href = "/login";
        })
        .catch(() => {
          this.errorAlert = true;
          this.errorMessage = "Email is taken"
          setTimeout(() => {
            this.errorAlert = false
          }, 3000);
        });
    },
  },
};
</script>

<style>
</style>