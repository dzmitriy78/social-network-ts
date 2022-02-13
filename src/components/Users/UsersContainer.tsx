import {connect} from "react-redux";
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleFetching,
    toggleFollowingInProgress,
    unFollow
} from "../../redux/users-reducer";
import {Users, UsersType} from "./Users";
import React from "react";
import Preloader from "../common/Preloader/Preloader";
import {usersAPI} from "../../api/api";

export type UsersContainerPropsType = {
    currentPage: number
    setUsers: (items: UsersType[]) => void
    setTotalUsersCount: (totalCount: number) => void
    setCurrentPage(numberPage: number): void
    users: Array<UsersType>
    unFollow: (id: number) => void
    follow: (id: number) => void
    pageSize: number
    totalUsersCount: number
    isFetching: boolean
    toggleFetching(isFetching: boolean): void
    toggleFollowingInProgress(isFetching: boolean, userId: number): void
    followingInProgress: Array<number>
}

class UsersContainer extends React.Component<UsersContainerPropsType, UsersType> {
    componentDidMount() {
        this.props.toggleFetching(true);
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
            .then(data => {
                    this.props.toggleFetching(false);
                    this.props.setUsers(data.items);
                    this.props.setTotalUsersCount(data.totalCount);
                }
            )
    }

    onPageChanged = (numberPage: number) => {
        this.props.toggleFetching(true);
        this.props.setCurrentPage(numberPage)
        usersAPI.getUsers(numberPage, this.props.pageSize)
            .then(data => {
                    this.props.toggleFetching(false);
                    this.props.setUsers(data.items)
                }
            )
    }

    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                users={this.props.users}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                follow={this.props.follow}
                unFollow={this.props.unFollow}
                pageSize={this.props.pageSize}
                followingInProgress={this.props.followingInProgress}
                toggleFollowingInProgress={this.props.toggleFollowingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state: {
    usersPage: {
        users: UsersType[],
        pageSize: number,
        totalUsersCount: number,
        currentPage: number;
        isFetching: boolean;
        followingInProgress: []
    };
}) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

export default connect(mapStateToProps, {
    follow,
    unFollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleFetching,
    toggleFollowingInProgress
})(UsersContainer)