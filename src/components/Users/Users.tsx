import React from "react";
import styles from "./users.module.css"
import userPhoto from "./../../assets/images/user.png"
import {NavLink} from "react-router-dom";

export type UsersType = {
    id: number
    photos: { small: string; large: string }
    followed: boolean
    name: string
    status: string
}

export type UsersPropsType = {
    users: Array<UsersType>
    unfollowing: (userId: number) => void
    following: (userId: number) => void
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (pages: number) => void
    followingInProgress: Array<number>
}

export let Users = (props: UsersPropsType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return <div >
        <div className={styles.pageWrapper}>
            {pages.map(p => {
                return <span key={p} onClick={() => {
                    props.onPageChanged(p)
                }} className={props.currentPage === p ? styles.selectedPage : styles.page}>{p}</span>
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
                   <div className={styles.follow}>
                       {u.followed ?
                           <button className={styles.btn} disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                               props.unfollowing(u.id)
                           }}>Unfollow</button>
                           : <button className={styles.btn} disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                               props.following(u.id)
                           }}>Follow</button>}
                   </div>
               </span>
                        <span>
                                <div className={styles.usersName}>{u.name}</div>
                                <div className={styles.usersDescr}>{u.status}</div>
                            </span>
                        <span>
                                <div className={styles.usersDescr}>{"u.location.city"}</div>
                                <div className={styles.usersDescr}>{"u.location.country"}</div>
                            </span>
                    </div>
                }
            )
        }
    </div>
}
