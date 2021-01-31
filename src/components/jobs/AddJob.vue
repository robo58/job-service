<template>
  <v-card>
    <v-card-title>Crate job</v-card-title>
    <v-card-text>
      <v-text-field v-model="job.title" label="Title"></v-text-field>
      <v-textarea v-model="job.description" label="Description"></v-textarea>
    </v-card-text>
    <v-card-actions class="pa-4">
      <v-btn @click="$emit('closeDialog')" depressed text>cancel</v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="submitJob" depressed class="blue white--text"
        >create</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// import Api from "../../Api/Api";

export default {
  data: () => ({
    job: {
      title: "",
      description: "",
      employee_id: null,
      recruiter_id: null,
      in_progress: false,
      finished: false,
    },
  }),
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapActions(["addJob"]),
    submitJob() {
      this.job.recruiter_id = this.user.id;

      this.addJob(this.job)
        .then(() => {
          this.$emit("jobCreated");
        })
        .catch(() => {
          this.$emit("error");
        });
    },
  },
};
</script>

<style>
</style>