import {connect} from "react-redux";
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleFetching,
    unFollow
} from "../../redux/users-reducer";
import {Users, UsersType} from "./Users";
import React from "react";
import axios from "axios";
import Preloader from "../common/Preloader/Preloader";

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
}

class UsersContainer extends React.Component<UsersContainerPropsType, UsersType> {
    componentDidMount() {
        this.props.toggleFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`, {
            withCredentials: true
        })
            .then(response => {
                    this.props.toggleFetching(false);
                    this.props.setUsers(response.data.items);
                    this.props.setTotalUsersCount(response.data.totalCount);
                }
            )
    }

    onPageChanged = (numberPage: number) => {
        this.props.toggleFetching(true);
        this.props.setCurrentPage(numberPage)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${numberPage}&count=${this.props.pageSize}`, {
            withCredentials: true
        })
            .then(response => {
                    this.props.toggleFetching(false);
                    this.props.setUsers(response.data.items)
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
            />
        </>
    }
}

let mapStateToProps = (state: { usersPage: { users: UsersType[], pageSize: number, totalUsersCount: number, currentPage: number; isFetching: boolean }; }) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}

export default connect(mapStateToProps, {
    follow,
    unFollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleFetching
})(UsersContainer)