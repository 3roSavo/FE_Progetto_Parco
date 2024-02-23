const initialState = {
    currentUser: {},
    currentHike: {},
    searchOrDetailVisible: true,
    hikeList: null,
    previousPath: ""
}


const mainReducer = (state = initialState, action) => {

    switch (action.type) {

        case "CURRENT_USER":
            return {
                ...state,
                currentUser: action.payload
            };
        case "CURRENT_HIKE":
            return {
                ...state,
                currentHike: action.payload
            };
        case "SEARCH_OR_DEATAIL_VISIBLE":
            return {
                ...state,
                searchOrDetailVisible: action.payload
            };
        case "HIKE_LIST":
            return {
                ...state,
                hikeList: action.payload
            };
        case "PREVIOUS_PATH":
            return {
                ...state,
                previousPath: action.payload
            }

        default: return state
    }

}
export default mainReducer