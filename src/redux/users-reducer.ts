import {UsersType} from "../components/Users/Users";

const follow = "FOLLOW";
const unFollow = "UNFOLLOW";
const setUsers = "SET_USERS";
const setCurrentPage = "SET_CURRENT_PAGE";
const toggleFetching = "TOGGLE_IS_FETCHING";
const setTotalUsersCount = "SET_TOTAL_USERS_COUNT";
export const toggleFetchingAC = (isFetching: boolean) => ({type: toggleFetching, isFetching});
export const followAC = (userId: number) => ({type: follow, userId});
export const unFollowAC = (userId: number) => ({type: unFollow, userId});
export const setUsersAC = (users: Array<UsersType>) => ({type: setUsers, users});
export const setCurrentPageAC = (currentPage: number) => ({type: setCurrentPage, currentPage});
export const setTotalUsersCountAC = (totalCount: number) => ({type: setTotalUsersCount, count: totalCount});
/*type AC = ReturnType<typeof followAC> | ReturnType<typeof unFollowAC> | ReturnType<typeof setUsersAC>*/

let initialState = {
    users: [] as UsersType[],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true
}

const usersReducer = (state = initialState, action: { type: string; userId: number; users: Array<UsersType>; currentPage: number; count: number; isFetching: boolean }) => {

    switch (action.type) {
        case "FOLLOW":
        case "UNFOLLOW":
            return {
                ...state,
                users: state.users.map((u) => {
                    return u.id === action.userId ? {...u, followed: !u.followed} : u
                }),
            }
        case "SET_USERS":
            return {
                ...state, users: action.users
            }
        case "SET_CURRENT_PAGE":
            return {
                ...state, currentPage: action.currentPage
            }
        case "SET_TOTAL_USERS_COUNT":
            return {
                ...state, totalUsersCount: action.count
            }
        case "TOGGLE_IS_FETCHING":
            return {
                ...state, isFetching: action.isFetching
            }
        default:
            return state;
    }
}
export default usersReducer;
