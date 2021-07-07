import { GET_FRIENDS } from "./constants"

export const GetFriends = (data) => {
    return (dispatch) => {
        dispatch({
            type: GET_FRIENDS,
            payload: data
        })
    }
}