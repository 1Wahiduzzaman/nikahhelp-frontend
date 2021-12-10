<template>
  <div class="panel-container">
    <div class="panel-content">
      <div class="content">
        <img
          class="mr-3"
          src="@/assets/icon/person-fill-secondary.svg"
          alt="icon"
        />
        <a-button
          shape="round"
          type="primary"
          style="float: right"
          class="mt-3"
        >
          Active Users
        </a-button>
      </div>
    </div>
    <div class="panel-content">
      <div class="content">
        <img
          class="mr-3"
          src="@/assets/icon/person-fill-secondary.svg"
          alt="icon"
        />
        <a-button
          shape="round"
          type="primary"
          style="float: right"
          class="mt-3"
        >
          Deleted Users
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.panel-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  position: relative;
  height: 100%;
  overflow: hidden;
  .panel-content {
    display: flex;
    border: 1px solid #ddd;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 10px 30px #fff;
    margin: 10px 5px 0px 10px;
    opacity: 1; //padding: 0px 20px;
    width: 100%;
    overflow: auto;
    flex-direction: column;
    @media (min-width: 320px) and (max-width: 480px) {
      width: 100%;
    }
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      img {
        width: 100px;
      }
      .ant-btn {
        width: 150px;
        height: 35px;
      }
    }
  }
}
</style>