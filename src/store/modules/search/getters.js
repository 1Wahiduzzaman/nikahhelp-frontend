export default {
    getProfiles: state => state.profiles,
    getProfileCount: state => state.profiles.length,
    getTotalResult: state => state.totalResult,
    getLoadingStatus: state => state.isLoading,
    getSearchStatus: state => state.isSearched,
    getQueryArr: state => state.queryArr,
    getComponentName: state => state.component,
    getSelectedProfileInfo: state => state.selectedProfile
};
