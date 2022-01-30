import React from "react";
import styles from "./users.module.css"
import userPhoto from "./../../assets/images/user.png"

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

}

export let Users = (props: UsersPropsType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            <div>
                {pages.map(p => {

                    return (
                        <span className={props.currentPage === p ? styles.selectedPages : ""}
                              onClick={() => props.onPageChanged(p)}>{p}</span>
                    )
                })}
            </div>
            {
                props.users.map((u: UsersType) => {
                        return <div key={u.id}>
               <span>
                   <div>
                       <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userAvatar}
                            alt={"ava"}/>
                   </div>
                   <div>
                       {u.followed ? <button onClick={() => {
                               props.unFollow(u.id)
                           }}>Unfollow</button>
                           : <button onClick={() => {
                               props.follow(u.id)
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
