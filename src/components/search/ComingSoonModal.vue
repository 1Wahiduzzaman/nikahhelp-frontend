<template>
  <div class="dialog-container">
    <v-dialog v-model="dialog" :width="500">
      <v-card>
        <div class="p-5">
          <div>
            <img src="/assets/images/coming-soon.svg" alt="" />
          </div>
          <div>
            <p style="color: #6158a7" class="text-h5 mt-10">
              Advanced search coming soon
            </p>
            <ButtonComponent
              @onClickButton="closeDialog"
              title="close"
              :isBlock="false"
            />
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ButtonComponent from "@/components/atom/ButtonComponent";
export default {
  components: {
    ButtonComponent,
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
  },
  props: {
    dialog: {
      default: false,
    },
  },
};
</script>