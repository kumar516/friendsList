import { GET_FRIENDS } from "../actions/constants";

export default function Reducers(state = {}, action) {
    switch (action.type) {
        case GET_FRIENDS:
            return ({ ...state, friendsList: action.payload })
        default:
            return state;
    }
}