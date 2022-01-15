import {connect} from "react-redux";
import {followAC, setUsersAC, unFollowAC} from "../../redux/users-reducer";
import {UsersType} from "./Users";
import UsersC from "./UsersC";

let mapStateToProps = (state: { usersPage: { users: UsersType[]; }; } ) => {
    return {
        users: state.usersPage.users
    }
}

let mapDispatchToProps = (dispatch: (arg0: { type: string; userId?: number; users?: UsersType[]; }) => void) => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unFollow: (userId: number) => {
            dispatch(unFollowAC(userId))
        },
        setUsers: (users: UsersType[]) => {
            dispatch(setUsersAC(users))
        }
    }
}
export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersC)