import React from "react";
import styles from "./users.module.css"
import userPhoto from "./../../assets/images/user.png"
import {NavLink} from "react-router-dom";
import {usersAPI} from "../../api/api";

export type UsersType = {
    id: number
    photos: { small: string; large: string }
    followed: boolean
    name: string
    status: string
}

export type UsersPropsType = {
    users: Array<UsersType>
    unFollow: (id: number) => void
    follow: (id: number) => void
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (pages: number) => void
    toggleFollowingInProgress(isFetching: boolean, userId: number): void
    followingInProgress: Array<number>
}

export let Users = (props: UsersPropsType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return <div>
        <div>
            {pages.map(p => {
                return <span key={p} onClick={() => props.onPageChanged(p)}
                             className={props.currentPage === p ? styles.selectedPages : ""}
                >{p}</span>
            })}
        </div>
        {
            props.users.map((u: UsersType) => {
                    return <div key={u.id}>
               <span>
                   <div>
                       <NavLink to={"/profile/" + u.id}>
                       <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userAvatar}
                            alt={"ava"}/>
                       </NavLink>
                   </div>
                   <div>
                       {u.followed ?
                           <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                               props.toggleFollowingInProgress(true, u.id)
                               usersAPI.deleteUsers(u.id)
                                   .then(data => {
                                           if (data.resultCode === 0) {
                                               props.unFollow(u.id)
                                           }
                                           props.toggleFollowingInProgress(false, u.id)
                                       }
                                   )

                           }}>Unfollow</button>
                           : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                               props.toggleFollowingInProgress(true, u.id)
                               usersAPI.postUsers(u.id)
                                   .then(data => {
                                           if (data.resultCode === 0) {
                                               props.follow(u.id)
                                           }
                                           props.toggleFollowingInProgress(false, u.id)
                                       }
                                   )
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
}
