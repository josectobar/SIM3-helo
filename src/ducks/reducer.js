
const initialState = {
    username: ``,
    password: ``,
    profile_pic: ``,
    id: ``
}

const UPDATE_USER = 'UPDATE_USER'

export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export default function reducer (state=initialState, action){
    const {type, payload } = action
    switch (type) {
        case UPDATE_USER:
            const { username, profile_pic, id} = payload
            return {...state, username, profile_pic, id }
        default:
        return state
    }
}
