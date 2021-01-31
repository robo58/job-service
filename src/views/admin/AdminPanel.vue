<template>
  <div class="pa-4">
    <div class="text-center">
      <h1>Admin panel</h1>

      <v-row>
        <v-col class="pa-4" cols="12" lg="6">
          <v-card>
            <v-card-title>Crate skill</v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field v-model="skill.name" label="Name"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="pa-4">
              <v-spacer></v-spacer>
              <v-btn @click="createSkill()" depressed class="blue white--text"
                >create</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col class="pa-4" cols="12" lg="6">
          <v-card>
            <v-card-title>Skills</v-card-title>
            <v-card-text>
              <v-data-table
                :headers="skills"
                :items="allSkills.data"
                :items-per-page="5"
              >
                <template v-slot:[`item.actions`]="{ item }">
                  <v-btn
                    small
                    depressed
                    class="red white--text"
                    @click="deleteSkill(item.id)"
                    >delete</v-btn
                  >
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    skill: {
      name: "",
    },
    skills: [
      {
        text: "ID",
        value: "id",
      },
      {
        text: "Name",
        value: "name",
      },
      {
        text: "Actions",
        value: "actions",
      },
    ],
  }),
  methods: {
    ...mapActions(["fetchSkills", "addSkill", "deleteSkill"]),
    createSkill() {
      this.addSkill(this.skill)
        .then(() => {
          this.fetchSkills();
          this.skill.name = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    ...mapGetters(["allSkills"]),
  },
  created() {
    this.fetchSkills();
  },
};
</script>

<style>
</style>