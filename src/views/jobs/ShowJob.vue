<template>
  <div class="pa-4">
    <div v-if="!(user.id === job.recruiter_id) && !applied" class="text-center">
      <v-btn @click="applyForJob()" depressed class="green white--text"
        >Apply</v-btn
      >
    </div>
    <div v-if="!(user.id === job.recruiter_id) && applied" class="text-center">
      <h4 class="green--text">Prijavili ste se za ovaj posao</h4>
    </div>
    <div v-if="job.in_progress" class="text-center">
      <h4 class="green--text">
        {{ employee.first_name }} {{ employee.last_name }} -
        {{ employee.email }} was chosen to complete this job.
      </h4>
      <v-btn @click="finishJob()" depressed class="green white--text ma-4"
        >Finish job</v-btn
      >
    </div>
    <div v-if="job.finished" class="text-center">
      <h4 class="mb-4 green--text">
        {{ employee.first_name }} {{ employee.last_name }} -
        <span
          class="green--text"
          style="cursor: pointer"
          @click="
            $router.push({
              name: 'Profile',
              params: { id: employee.id },
            })
          "
          >{{ employee.email }}</span
        >
        completed this job.
      </h4>
    </div>

    <div class="py-4">
      <h1>{{ job.title }}</h1>
      <p>{{ job.description }}</p>
      <v-btn @click="$router.back()" text>back</v-btn>
    </div>

    <div
      v-if="user.id === job.recruiter_id && !job.in_progress && !job.finished"
    >
      <h2>Applications</h2>
      <h4 class="orange--text" v-if="applications.length == 0">
        No applications yet
      </h4>

      <v-row>
        <v-col
          v-for="application in applications"
          :key="application.id"
          cols="12"
          sm="6"
          md="3"
        >
          <v-card>
            <v-card-title class="blue-grey darken-4"
              >{{ application.first_name }}
              {{ application.last_name }}</v-card-title
            >
            <v-card-text class="pa-4">
              <div>
                Email:
                <b
                  style="cursor: pointer"
                  @click="
                    $router.push({
                      name: 'Profile',
                      params: { id: application.id },
                    })
                  "
                  >{{ application.email }}</b
                >
              </div>
              <div>
                Applied:
                <b>{{
                  moment(application.created_at).format("DD.MM.YYYY.")
                }}</b>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="acceptEmployee(application.id)"
                depressed
                class="blue white--text"
                >Accept</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Api from "../../Api/Api";

export default {
  data: () => ({
    job: {
      title: "",
      description: "",
    },
    employee: {},
    applications: [],
    dialog: false,
  }),
  created() {
    this.fetchJob();
    this.fetchApplications();
  },
  computed: {
    ...mapGetters(["user"]),
    applied: function () {
      let applied = false;

      console.log("Checking");
      this.applications.forEach((application) => {
        if (application.id === this.user.id) {
          console.log("True");
          applied = true;
        }
      });
      if (applied) return true;
      else return false;
    },
  },
  methods: {
    fetchJob() {
      let id = this.$route.params.id;

      Api.get(`/jobs/${id}`)
        .then((response) => {
          this.job = response.data.data;

          if (response.data.data.in_progress || response.data.data.finished) {
            Api.get(`/users/${response.data.data.employee_id}`)
              .then((response) => {
                this.employee = response.data.data;
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchApplications() {
      let id = this.$route.params.id;

      Api.get(`/jobs/${id}/applications`)
        .then((response) => {
          this.applications = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    applyForJob() {
      Api.post(`/jobs/${this.job.id}/applications/attach`, {
        resources: [this.user.id],
      })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    acceptEmployee(employeei_id) {
      let job = this.job;

      job.employee_id = employeei_id;
      job.in_progress = true;

      Api.put(`/jobs/${job.id}`, job)
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    finishJob() {
      let job = this.job;

      job.finished = true;
      job.in_progress = false;

      Api.put(`/jobs/${job.id}`, job)
        .then((response) => {
          console.log(response);
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