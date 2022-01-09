import {UsersType} from "../components/Users/Users";

const follow = "FOLLOW";
const unFollow = "UNFOLLOW";
const setUsers = "SET_USERS";
export const followAC = (userId: number) => ({type: follow, userId});
export const unFollowAC = (userId: number) => ({type: unFollow, userId});
export const setUsersAC = (users: Array<UsersType>) => ({type: setUsers, users})

/*type AC = ReturnType<typeof followAC> | ReturnType<typeof unFollowAC> | ReturnType<typeof setUsersAC>*/

let initialState = {
    users: []
}

const usersReducer = (state = initialState, action: { type: string; userId: string; users: Array<UsersType> }) => {

    switch (action.type) {
        case "FOLLOW":
        case "UNFOLLOW":
            return {
                ...state,
                users: state.users.map(u => {

                    // @ts-ignore
                    return u.id === action.userId ? {...u, followed: !u.followed} : u
                }),
            }
        case "SET_USERS":
            // @ts-ignore
            return {
                ...state, users: [...state.users, ...action.users]
            }
        default:
            return state;
    }
}
export default usersReducer;
