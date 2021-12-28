export default {
    setProfiles: (state, payload) => state.profiles = payload,
    setComponent: (state, name) => state.component = name,
    setTotalResult: (state, value) => state.totalResult = value,
    setLoading: (state, value) => state.isLoading = value,    
    pushQuery: (state, value) => state.queryArr.push(value),
    setSelectedProfileInfo: (state, payload) => state.selectedProfile = payload
}