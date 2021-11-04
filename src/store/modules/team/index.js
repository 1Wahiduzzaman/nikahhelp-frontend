import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state() {
    return {
      team_id: "",
      team_name: "",
      team_description: "",
      team_password: "",
      confirm_password: "",
      team_logo: [],
      create_team_step: 1,
      team_list: [],
      newTeamInfo: null,
      teamInfo: null,
    };
  },
  mutations,
  actions,
  getters,
};
