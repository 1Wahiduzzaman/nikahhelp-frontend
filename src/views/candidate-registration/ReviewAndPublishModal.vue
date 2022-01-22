<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5">
        Review and publish
        </v-card-title>

        <v-card-text>
         Are you sure, you want to suubmit the form for review and publish?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="warning" @click="cancel"> Cancel </v-btn>
          <v-btn color="primary" @click="save"> Yes </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["dialog"],
  data() {
    return { note: null };
  },
  computed: {
    dialogFlag: function () {
      return this.dialog;
    },
  },
  methods: {
    save() {
      this.$emit("save", true);
    },
    cancel() {
      this.$emit("cancel", false);
    },
  },
};
</script>