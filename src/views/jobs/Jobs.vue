<template>
  <div class="pa-4">
    <div class="text-right">
      <v-btn @click="dialog = true" depressed class="blue white--text"
        ><v-icon left>mdi-plus</v-icon>Job</v-btn
      >
    </div>

    <v-row>
      <v-col cols="12" sm="6" md="3" lg="2"
        ><v-select
          :items="allSkills.data"
          label="Filter by skill"
          item-value="id"
          item-text="name"
          v-model="selectedSkillId"
        ></v-select>
        <v-btn depressed class="blue white--text" @click="removeFilters()"
          >Remove filters</v-btn
        >
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="job in allJobs.data.filter(
          (job) => !job.in_progress && !job.finished
        )"
        :key="job.id"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card v-if="job.recruiter">
          <v-card-title class="blue-grey darken-4 white--text">{{
            job.title
          }}</v-card-title>
          <v-card-text class="pa-4">
            <p>{{ job.description.slice(0, 40) }}</p>
            <p v-if="job.skills && job.skills.length == 0">
              <b>No skills added yet</b>
            </p>
            <p v-else>
              Skills:
              <b v-for="skill in job.skills" :key="skill.id"
                >{{ skill.name }} /</b
              >
            </p>

            <div v-if="job.recruiter" class="text-right">
              <div>
                Crated by:
                <b
                  style="cursor: pointer"
                  @click="
                    $router.push({
                      name: 'Profile',
                      params: { id: job.recruiter_id },
                    })
                  "
                >
                  {{ job.recruiter.first_name }}
                  {{ job.recruiter.last_name }}
                </b>
              </div>
            </div>
          </v-card-text>
          <v-card-actions class="pa-4">
            <v-btn
              v-if="job.recruiter.id === user.id || user.id === 3"
              @click="deleteJob(job.id)"
              text
              small
              depressed
              >delete</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn
              v-if="job.recruiter.id === user.id"
              @click="$router.push({ name: 'EditJob', params: { id: job.id } })"
              depressed
              small
              class="orange"
              >edit</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn
              @click="$router.push({ name: 'ShowJob', params: { id: job.id } })"
              depressed
              small
              class="blue white--text"
              >details</v-btn
            ></v-card-actions
          >
        </v-card>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="allJobs.meta.last_page"
      ></v-pagination>
    </div>

    <v-dialog v-model="dialog" width="600">
      <add-job
        :job="job"
        @jobCreated="jobCreated()"
        @closeDialog="dialog = false"
      />
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Api from "../../Api/Api";
import AddJob from "../../components/jobs/AddJob.vue";

export default {
  components: {
    AddJob,
  },
  data: () => ({
    job: {
      recruiter: {},
      skills: ["No skills added"],
    },
    dialog: false,
    selectedSkillId: null,
    page: 1,
  }),
  watch: {
    page: function () {
      this.fetchJobs(this.page);
    },
    selectedSkillId: function () {
      if (this.selectedSkillId) {
        Api.get(`/skills/${this.selectedSkillId}/jobs?include=recruiter,skills`)
          .then((response) => {
            this.allJobs.data = response.data.data;
            this.allJobs.meta = response.data.meta;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  methods: {
    ...mapActions(["fetchJobs", "fetchSkills", "deleteJob"]),
    removeFilters() {
      this.selectedSkillId = null;
      this.fetchJobs(this.page);
    },
    jobCreated() {
      this.dialog = false;
      this.fetchJobs(this.page);
    },
  },
  computed: {
    ...mapGetters(["user", "allJobs", "allSkills"]),
  },
  created() {
    this.fetchJobs(this.page);
    this.fetchSkills();
  },
};
</script>

<style>
</style>