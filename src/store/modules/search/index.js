import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      profiles: [],
      profile: [],
      pagination: {},
      isSearched: false,
      isLoading: false,
      totalResult: 0,
      selectedProfile: {},//profile info 4 r8 sidebar 
      queryArr: ['male', 'dhaka', '20-30 Yrs'],
      component: 'addComponent'
    };
  },
  mutations,
  actions,
  getters,
};
