<template>
  <div class="main-container">
    <MainHeader />

    <a-layout
      id="layout"
      style="background-color: #fff"
      :style="{ overflow: 'auto', height: 'calc(100vh - 80px)' }"
    >
      <a-layout-sider
        :style="{ overflow: 'hidden auto', height: 'calc(100vh - 80px)' }"
        class="bg-white shadow-default"
        v-model="collapsed"
        :trigger="null"
        collapsible
        :collapsedWidth="28"
        width="250"
        breakpoint="sm"
        @breakpoint="responsiveToggle"
      >
        <Sidebar
          :collapsed="collapsed"
          @collapseSideBar="collapsed = !collapsed"
        >
          <!-- <template v-slot:search>
            <SimpleSearch />
          </template> -->
        </Sidebar>
      </a-layout-sider>
      <a-layout>
        <a-layout-content>
          <slot></slot>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <ModalContainer
      :modalKey="'manageTeamRedirect'"
      :width="'wide'"
      :fullscreen="false"
      :hideOverlay="false"
    >
      <ManageTeamRedirect />
    </ModalContainer>
  </div>
</template>

<script>
import Sidebar from "@/components/dashboard/layout/Sidebar.vue";
import ModalContainer from "@/plugins/modal/modal-container";
import ManageTeamRedirect from "@/views/design/ManageTeamRedirect.vue";
import { createModalMixin, openModalRoute } from "@/plugins/modal/modal.mixin";
export default {
  name: "Layout",
  components: {
    Sidebar,
    ModalContainer,
    ManageTeamRedirect,
  },
  created() {

  },
  data() {
    return {
      collapsed: false,
      activeTeamId: null,
    };
  },
  mixins: [createModalMixin("manageTeamRedirect")],
  computed: {
    
  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/base/_variables.scss";
.main-container {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

</style>