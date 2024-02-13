const initialState = {
    currentUser: {}
}


const mainReducer = (state = initialState, action) => {

    switch (action.type) {

        case "CURRENT_USER":
            return {
                ...state,
                currentUser: action.payload
            }

        default: return state
    }

}
export default mainReducer