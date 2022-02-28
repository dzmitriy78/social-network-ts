import {UsersType} from "../components/Users/Users";
import {usersAPI} from "../api/api";

export const toggleFetching = (isFetching: boolean) => ({type: "TOGGLE_IS_FETCHING", isFetching});
export const follow = (userId: number) => ({type: "FOLLOW", userId});
export const unFollow = (userId: number) => ({type: "UNFOLLOW", userId});
export const setUsers = (users: Array<UsersType>) => ({type: "SET_USERS", users});
export const setCurrentPage = (currentPage: number) => ({type: "SET_CURRENT_PAGE", currentPage});
export const setTotalUsersCount = (totalCount: number) => ({type: "SET_TOTAL_USERS_COUNT", count: totalCount});
export const toggleFollowingInProgress = (isFetching: boolean, userId: number) => ({
    type: "TOGGLE_FOLLOWING_IN_PROGRESS",
    isFetching,
    userId
});
/*type AC = ReturnType<typeof followAC> | ReturnType<typeof unFollowAC> | ReturnType<typeof setUsersAC>*/

let initialState = {
    users: [] as UsersType[],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

const usersReducer = (state = initialState, action: {
    type: string;
    userId: number;
    users: Array<UsersType>;
    currentPage: number;
    count: number;
    isFetching: boolean
}) => {
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
        case "TOGGLE_FOLLOWING_IN_PROGRESS":
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}

export const getUsers = (currentPage: number, pageSize: number) => {
    return (dispatch: (arg0: { type: string; isFetching?: boolean; users?: UsersType[]; count?: number; }) => void) => {
        dispatch(toggleFetching(true))
        usersAPI.getUsers(currentPage, pageSize)
            .then(data => {
                    dispatch(toggleFetching(false));
                    dispatch(setUsers(data.items));
                    dispatch(setTotalUsersCount(data.totalCount));
                }
            )
    }
}
export const following = (userId: number) => {
    return (dispatch: (arg0: { type: string; isFetching?: boolean; userId: number; }) => void) => {
        dispatch(toggleFollowingInProgress(true, userId))
        usersAPI.followUser(userId)
            .then(data => {
                    if (data.resultCode === 0) {
                        dispatch(follow(userId))
                    }
                    dispatch(toggleFollowingInProgress(false, userId))
                }
            )
    }
}
export const unfollowing = (userId: number) => {
    return (dispatch: (arg0: { type: string; isFetching?: boolean; userId: number; }) => void) => {
        dispatch(toggleFollowingInProgress(true, userId))
        usersAPI.unfollowUser(userId)
            .then(data => {
                    if (data.resultCode === 0) {
                        dispatch(unFollow(userId))
                    }
                    dispatch(toggleFollowingInProgress(false, userId))
                }
            )
    }
}


export default usersReducer;
