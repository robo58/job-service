<template>
  <div class="pa-4">
    <div v-if="success" class="text-center">
      <h4 class="green--text">Skills added</h4>
    </div>
    <v-card class="mx-auto" max-width="600px">
      <v-card-title>Edit job</v-card-title>
      <v-card-text>
        <v-text-field v-model="job.title" label="Title"></v-text-field>
        <v-textarea v-model="job.description" label="Description"></v-textarea>
        <v-select
          :items="allSkills.data"
          item-value="id"
          item-text="name"
          multiple
          v-model="selectedSkills"
        ></v-select>
        <div class="text-right">
          <v-btn @click="addSkills()" depressed small class="blue white--text"
            >Add skills</v-btn
          >
        </div>
      </v-card-text>
      <v-card-actions class="pa-4">
        <v-btn @click="$router.back()" depressed text>cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="editJob()" depressed class="blue white--text"
          >edit</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Api from "../../Api/Api";

export default {
  data: () => ({
    job: {
      title: "",
      description: "",
    },
    selectedSkills: [],
    success: false,
  }),
  created() {
    this.fetchJob();
    this.fetchSkills();
  },
  computed: { ...mapGetters(["allSkills"]) },
  methods: {
    ...mapActions(["updateJob", "fetchSkills"]),
    fetchJob() {
      let id = this.$route.params.id;

      Api.get(`/jobs/${id}?include=skills`)
        .then((response) => {
          console.log(response);
          this.job = response.data.data;
          this.selectedSkills = response.data.data.skills;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editJob() {
      this.updateJob(this.job)
        .then(() => {
          this.$router.push({ name: "Jobs" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addSkills() {
      Api.patch(`/jobs/${this.job.id}/skills/sync`, {
        resources: this.selectedSkills,
      })
        .then(() => {
          this.success = true;
          this.fetchJob();
          setTimeout(() => {
            this.success = false;
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>