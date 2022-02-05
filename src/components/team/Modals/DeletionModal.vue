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
      :visible="showModalProp"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <h6 slot="title">Please Read Before Deleting Your Team</h6>
      <p class="fs-14">
        Please note if you delete your team you will not be able to get it back.
      </p>
      <p class="fs-14">
        If you delete your team while you are still subscribed, regrettably no refund will be issued as per MatrimonyAssist terms and conditions.
      </p>
      <p class="fs-14">
        Any team you are connected with will be informed that you have deleted the team.
      </p>
      <p class="fs-14">
        All your team members will be informed that you deleted the team and they will no longer be able to access your team.
      </p>
      <p style="margin-bottom: 5px" class="font-weight-bold">Enter Password</p>
      <a-input-password
        placeholder="Enter Team Password"
        v-model="passwordTeam"
      />

      <p class="font-weight-bold" style="margin-top: 10px; margin-bottom: 5px">
        Please Describe Reason for Deletion
      </p>
      <a-textarea
        placeholder="Reason Type"
        v-model="deletionReasonType"
        :auto-size="{ minRows: 1, maxRows: 1 }"
      />
      <a-textarea
        style="margin-top: 12px"
        placeholder="Reason Detail"
        :auto-size="{ minRows: 2, maxRows: 6 }"
        v-model="deletionReasonDetail"
      />

      <template slot="footer">
        <a-button key="back" @click="handleCancel">
          Cancel
        </a-button>
        <a-button key="submit" type="primary" :loading="deleteTeamLoading" @click="handleOk">
          Ok
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
  export default {
    name: 'DeletionModal',
    props: ['showModalProp', 'deleteTeamLoading'],
    data() {
      return {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,

        passwordTeam: '',
        deletionReasonType: '',
        deletionReasonDetail: '',
      };
    },
    methods: {
      handleOk(e) {
        console.log('Clicked Ok');
        this.$emit('handleOk', {
          passwordTeam: this.passwordTeam,
          deletionReasonType: this.deletionReasonType,
          deletionReasonDetail: this.deletionReasonDetail,
        });
        this.passwordTeam = '';
      },
      handleCancel(e) {
        console.log('Clicked cancel button');
        this.$emit('handleCancel');
      },
    },
  };
</script>
