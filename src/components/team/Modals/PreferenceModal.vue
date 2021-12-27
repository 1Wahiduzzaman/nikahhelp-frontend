<template>
  <div>
    <!-- <a-button type="primary" @click="showModal">
      Open Modal with async logic
    </a-button> -->
    <!-- <a-modal
      title="Title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>{{ ModalText }}</p>
    </a-modal> -->

    <a-modal
      destroyOnClose
      :visible="showModalProp"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      class="preference"
      @cancel="handleCancel"
    >
      <h6 slot="title">Team Preferences</h6>
      <span style="font-size: 14px; font-weight: bold">
        Change team password?
      </span>
      <span style="font-size: 12px"
        >It's a good idea to use a strong password that you are not using
        elsewhere</span
      >
      <br />
      <br />

      <div class="justify-content-end">
        <div class="d-flex mobile-column justify-content-end">
          <span
            class="align-bottom"
            >Present</span
          >
          <div class="input-w">
            <a-input-password
              placeholder="Enter Team Password"
              v-model="old_password"
            />
          </div>
        </div>
      </div>

      <div class="justify-content-end mt-2">
        <div class="d-flex mobile-column justify-content-end">
          <span
            class="align-bottom"
            >New</span
          >
          <div class="input-w">
            <a-input-password
              placeholder="Enter Team Password"
              v-model="new_password"
            />
          </div>
        </div>
      </div>
      <div class="justify-content-end mt-2">
        <div class="d-flex mobile-column justify-content-end">
          <span
            class="align-bottom"
            >Re-type New</span
          >
          <div class="input-w">
            <a-input-password
              placeholder="Enter Team Password"
              v-model="re_password"
            />
          </div>
        </div>
      </div>

      <a-divider />

      <div class="d-flex justify-content-start">
        <span style="font-size: 14px; font-weight: bold; padding-right: 20px">
          Change team Visibility
        </span>
        <div>
          <a-switch
            :default-checked="teamVisibility"
            @change="onChangeTeamVisibility"
          />
        </div>
      </div>
      <div>
        <span style="font-size: 12px"
          >Turning off this team visibility will disable this team and remove
          candidate profile from search & suggetions.</span
        >
        <span style="font-size: 12px"
          >This team candidate can't join to other team as candidate.</span
        >
        <span style="font-size: 12px"
          >Some information may still be visible to others, such as team members
          name in other messagelist and message team members sent.</span
        >
      </div>
      <div></div>
    </a-modal>
  </div>
</template>

<script>
  export default {
    name: 'PreferenceModal',
    props: ['showModalProp', 'teamVisibility'],
    data() {
      return {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,

        old_password: '',
        new_password: '',
        re_password: '',

        computed_teamVisibility: this.teamVisibility,
      };
    },
    methods: {
      onChangeTeamVisibility(checked) {
        console.log(checked);
        this.computed_teamVisibility = checked;
      },
      handleOk(e) {
        console.log('Clicked Ok');
        if (this.new_password == this.re_password) {
          console.log('emitting');
          this.$emit('handleOk', {
            old_password: this.old_password,
            new_password: this.new_password,
            team_visiblity: this.computed_teamVisibility,
          });
        }
        this.old_password = '';
        this.new_password = '';
        this.re_password = '';
      },
      handleCancel(e) {
        console.log('Clicked cancel button');
        this.$emit('handleCancel');
      },
    },
  };
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.mobile-column {
  width: 100%;
  margin-left: -2px;
  @media (min-width: 360px) {
    width: 90%;
  }
  @media (min-width: 410px) {
    width: 80%;
  }
  @media (min-width: 576px) {
    width: 70%;
  }
}
.align-bottom {
  font-size: 12px;
  padding-top: 5px;
  padding-right: 4px;
  @media (min-width: 768px) {
    font-size: 14px;
    padding-right: 10px;
  }
}
.input-w {
  width: 196px;
  @media (min-width: 768px) {
    width: 200px;
  }
}
</style>
