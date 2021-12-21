export default {
    setProfiles: (state, payload) => state.profiles = payload,
    setComponent: (state, name) => state.component = name,
    pushQuery: (state, value) => state.queryArr.push(value),
    setSelectedProfileInfo: (state, payload) => state.selectedProfile = payload
}