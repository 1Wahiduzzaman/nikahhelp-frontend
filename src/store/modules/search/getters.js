export default {
    getProfiles: state => state.profiles,
    getProfileCount: state => state.profiles.length,
    getQueryArr: state => state.queryArr,
    getComponentName: state => state.component,
    getSelectedProfileInfo: state => state.selectedProfile
};
