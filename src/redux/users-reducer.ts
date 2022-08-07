import {UsersType} from "../components/Users/Users"
import {usersAPI} from "../api/api"
import {Dispatch} from "redux"
import {ThunkAction} from "redux-thunk"
import {AppStateType} from "./store"

const TOGGLE_IS_FETCHING = "usersReducer/TOGGLE-IS-FETCHING"
const FOLLOW = "usersReducer/FOLLOW"
const UNFOLLOW = "usersReducer/UNFOLLOW"
const SET_USERS = "usersReducer/SET-USERS"
const SET_CURRENT_PAGE = "usersReducer/SET-CURRENT-PAGE"
const SET_TOTAL_USERS_COUNT = "usersReducer/SET-TOTAL-USERS-COUNT"
const TOGGLE_FOLLOWING_IN_PROGRESS = "usersReducer/TOGGLE-FOLLOWING-IN-PROGRESS"

export const toggleFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching}) as const
export const follow = (userId: number) => ({type: FOLLOW, userId}) as const
export const unFollow = (userId: number) => ({type: UNFOLLOW, userId}) as const
export const setUsers = (users: Array<UsersType>) => ({type: SET_USERS, users}) as const
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage}) as const
export const setTotalUsersCount = (totalCount: number) => ({type: SET_TOTAL_USERS_COUNT, totalCount}) as const
export const toggleFollowingInProgress = (isFetching: boolean, userId: number) => ({
    type: TOGGLE_FOLLOWING_IN_PROGRESS, isFetching, userId
}) as const

let initialState = {
    users: [] as UsersType[],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

const usersReducer = (state: initialStateType = initialState, action: UsersActionType): initialStateType => {
    switch (action.type) {
        case FOLLOW:
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map((u) => {
                    return u.id === action.userId ? {...u, followed: !u.followed} : u
                }),
            }
        case SET_USERS:
            return {
                ...state, users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state, totalUsersCount: action.totalCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case TOGGLE_FOLLOWING_IN_PROGRESS:
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

export const getUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(toggleFetching(true))
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(toggleFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount))
    }
}
export const following = (userId: number) => {
    return (dispatch: DispatchType, getState: GetStateType) => {
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
export const unfollowing = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleFollowingInProgress(true, userId))
        let data = await usersAPI.unfollowUser(userId)
        if (data.resultCode === 0) {
            dispatch(unFollow(userId))
        }
        dispatch(toggleFollowingInProgress(false, userId))
    }
}

export default usersReducer

type initialStateType = {
    users: UsersType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}

type UsersActionType =
    ToggleFetchingAT
    | FollowAT
    | SetUsersAT
    | SetCurrentPageAT
    | SetTotalUsersCountAT
    | ToggleFollowingInProgressAT

type ToggleFetchingAT = ReturnType<typeof toggleFetching>
type FollowAT = ReturnType<typeof follow> | ReturnType<typeof unFollow>
type SetUsersAT = ReturnType<typeof setUsers>
type SetCurrentPageAT = ReturnType<typeof setCurrentPage>
type SetTotalUsersCountAT = ReturnType<typeof setTotalUsersCount>
type ToggleFollowingInProgressAT = ReturnType<typeof toggleFollowingInProgress>

type DispatchType = Dispatch<UsersActionType>
type GetStateType = () => AppStateType
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, UsersActionType>
