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
        <div class="d-flex justify-content-end" style="width: 70%">
          <span
            class="align-bottom"
            style="padding-top: 5px; padding-right: 10px"
            >Present</span
          >
          <div style="width: 200px">
            <a-input-password
              placeholder="Enter Team Password"
              v-model="old_password"
            />
          </div>
        </div>
      </div>

      <div class="justify-content-end">
        <div class="d-flex justify-content-end" style="width: 70%">
          <span
            class="align-bottom"
            style="padding-top: 5px; padding-right: 10px"
            >New</span
          >
          <div style="width: 200px">
            <a-input-password
              placeholder="Enter Team Password"
              v-model="new_password"
            />
          </div>
        </div>
      </div>
      <div class="justify-content-end">
        <div class="d-flex justify-content-end" style="width: 70%">
          <span
            class="align-bottom"
            style="padding-top: 5px; padding-right: 10px"
            >Re-type New</span
          >
          <div style="width: 200px">
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
