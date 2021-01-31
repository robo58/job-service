<template>
  <v-card>
    <v-card-title>Leave review</v-card-title>
    <v-card-text>
      <v-textarea v-model="description"></v-textarea>
      <v-select v-model="rating" label="Rating" :items="grades"></v-select>
    </v-card-text>
    <v-card-actions class="pa-4">
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!rating || !description"
        @click="createReview()"
        depressed
        class="blue white--text"
        >Submit</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import Api from "../../Api/Api";

export default {
  props: {
    employee_id: Number,
    recruiter_id: Number,
  },
  data: () => ({
    rating: null,
    description: "",
    grades: [1, 2, 3, 4, 5],
  }),
  methods: {
    createReview() {
      Api.post(`/reviews`, {
        user_id: this.employee_id,
        reviewer_id: this.recruiter_id,
        rating: this.rating,
        description: this.description,
      })
        .then(() => {
          this.$emit("closeDialog");
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