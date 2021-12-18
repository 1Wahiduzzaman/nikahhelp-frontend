import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      profiles: [],
      queryArr: ['male', 'dhaka', '20-30 Yrs']
    };
  },
  mutations,
  actions,
  getters,
};
