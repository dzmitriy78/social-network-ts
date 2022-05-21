import {connect} from "react-redux";
import {following, getUsers, setCurrentPage, unfollowing} from "../../redux/users-reducer";
import {Users, UsersType} from "./Users";
import React from "react";
import Preloader from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/store";

export type UsersContainerPropsType = {
    currentPage: number
    setCurrentPage(numberPage: number): void
    users: Array<UsersType>
    unfollowing: (userId: number) => void
    following: (userId: number) => void
    pageSize: number
    totalUsersCount: number
    isFetching: boolean
    followingInProgress: Array<number>
    getUsers(currentPage: number, pageSize: number): void
}

class UsersContainer extends React.Component<UsersContainerPropsType, UsersType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (numberPage: number) => {
        this.props.getUsers(numberPage, this.props.pageSize)
        this.props.setCurrentPage(numberPage)
    }

    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                users={this.props.users}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                following={this.props.following}
                unfollowing={this.props.unfollowing}
                pageSize={this.props.pageSize}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

export default compose<React.ComponentType>(
   /* withAuthRedirect,*/
    connect(mapStateToProps, {
        following, unfollowing, setCurrentPage, getUsers
    }))
(UsersContainer)