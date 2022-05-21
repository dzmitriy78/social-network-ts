import {UsersType} from "../components/Users/Users";
import {usersAPI} from "../api/api";

export const toggleFetching = (isFetching: boolean): ToggleFetchingAT => ({type: "TOGGLE_IS_FETCHING", isFetching});
export const follow = (userId: number): FollowAT => ({type: "FOLLOW", userId});
export const unFollow = (userId: number): FollowAT => ({type: "UNFOLLOW", userId});
export const setUsers = (users: Array<UsersType>): SetUsersAT => ({type: "SET_USERS", users});
export const setCurrentPage = (currentPage: number): SetCurrentPageAT => ({type: "SET_CURRENT_PAGE", currentPage});
export const setTotalUsersCount = (totalCount: number): SetTotalUsersCountAT => ({
    type: "SET_TOTAL_USERS_COUNT",
    totalCount
});
export const toggleFollowingInProgress = (isFetching: boolean, userId: number): ToggleFollowingInProgressAT => ({
    type: "TOGGLE_FOLLOWING_IN_PROGRESS",
    isFetching,
    userId
})

/*type AC = ReturnType<typeof followAC> | ReturnType<typeof unFollowAC> | ReturnType<typeof setUsersAC>*/

type initialStateType = {
    users: UsersType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}

type UserActionType =
    ToggleFetchingAT
    | FollowAT
    | SetUsersAT
    | SetCurrentPageAT
    | SetTotalUsersCountAT
    | ToggleFollowingInProgressAT

type ToggleFetchingAT = {
    type: "TOGGLE_IS_FETCHING"
    isFetching: boolean
}
type FollowAT = {
    type: "FOLLOW" | "UNFOLLOW"
    userId: number
}
type SetUsersAT = {
    type: "SET_USERS"
    users: Array<UsersType>
}
type SetCurrentPageAT = {
    type: "SET_CURRENT_PAGE"
    currentPage: number
}
type SetTotalUsersCountAT = {
    type: "SET_TOTAL_USERS_COUNT"
    totalCount: number
}
type ToggleFollowingInProgressAT = {
    type: "TOGGLE_FOLLOWING_IN_PROGRESS",
    isFetching: boolean
    userId: number
}

let initialState = {
    users: [] as UsersType[],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

const usersReducer = (state: initialStateType = initialState, action: UserActionType): initialStateType => {
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
                ...state, totalUsersCount: action.totalCount
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
    return (dispatch: (arg0: { type: "TOGGLE_IS_FETCHING" | "SET_USERS" | "SET_TOTAL_USERS_COUNT"; isFetching?: boolean; users?: UsersType[]; totalCount?: number; }) => void) => {
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
    return (dispatch: (arg0: { type: "TOGGLE_FOLLOWING_IN_PROGRESS" | "FOLLOW" | "UNFOLLOW"; isFetching?: boolean; userId: number; }) => void) => {
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
    return (dispatch: (arg0: { type: "TOGGLE_FOLLOWING_IN_PROGRESS" | "FOLLOW" | "UNFOLLOW"; isFetching?: boolean; userId: number; }) => void) => {
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
