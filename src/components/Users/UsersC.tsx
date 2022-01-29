import React from "react";
import styles from "./users.module.css"
import axios from "axios";
import userPhoto from "./../../assets/images/user.png"

export type UsersType = {
    id: number
    photos: { small: string; large: string }
    followed: boolean
    name: string
    status: string
}

export type UsersPropsType = {
    length?: number
    users: Array<UsersType>
    setUsers: (users: UsersType[]) => void
    unFollow: (id: number) => void
    follow: (id: number) => void
    map?(element: (u: UsersType) => JSX.Element): UsersType
    pageSize: number
    totalUsersCount: number
    currentPage: number
    setCurrentPage: (currentPages: number) => void
    setTotalUsersCount: (totalCount: number) => void
}

class UsersC extends React.Component<UsersPropsType, UsersType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                    this.props.setUsers(response.data.items);
                    this.props.setTotalUsersCount(response.data.totalCount);
                }
            )
    }

    onPageChanged = (numberPage: number) => {
        this.props.setCurrentPage(numberPage)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${numberPage}&count=${this.props.pageSize}`)
            .then(response => {
                    this.props.setUsers(response.data.items)
                }
            )
    }

    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
        return (
            <div>
                <div>
                    {pages.map(p => {
                        // @ts-ignore

                        return (
                            <span className={this.props.currentPage === p ? styles.selectedPages : ""}
                                  onClick={() => this.onPageChanged(p)}>{p}</span>
                        )
                    })}

                </div>
                {
                    this.props.users.map((u: UsersType) => {
                            return <div key={u.id}>
               <span>
                   <div>
                       <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userAvatar}
                            alt={"ava"}/>
                   </div>
                   <div>
                       {u.followed ? <button onClick={() => {
                               this.props.unFollow(u.id)
                           }}>Unfollow</button>
                           : <button onClick={() => {
                               this.props.follow(u.id)
                           }}>Follow</button>}
                   </div>
               </span>
                                <span>
                                <div>{u.name}</div>
                                <div>{u.status}</div>
                            </span>
                                <span>
                                <div>{"u.location.city"}</div>
                                <div>{"u.location.country"}</div>
                            </span>
                            </div>
                        }
                    )
                }
            </div>

        )
    }
}

export default UsersC;