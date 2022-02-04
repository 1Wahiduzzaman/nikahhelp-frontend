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
      <p style="font-size: 14px">
        Have you tranfered Owner Admin Role to Anyone else?
      </p>
      <p style="font-size: 14px">Are you a owner admin?</p>
      <p style="font-size: 14px">You cant revert back this change</p>
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
