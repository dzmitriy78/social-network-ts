import React from "react";
import styles from "./users.module.css"
import userPhoto from "./../../assets/images/user.png"
import {NavLink} from "react-router-dom";
import {UsersType} from "./Users";

export type UserPropsType = {
    user: UsersType
    isAuth: boolean
    following: (userId: number) => void
    followingInProgress: Array<number>
    unfollowing: (userId: number) => void
}

export const User: React.FC<UserPropsType> = ({user, isAuth, following, followingInProgress, unfollowing}) => {

    return <div>
               <span>
                   <div>
                       <NavLink to={"/profile/" + user.id}>
                       <img src={user.photos.small != null ? user.photos.small : userPhoto}
                            className={styles.userAvatar}
                            alt={"ava"}/>
                       </NavLink>
                   </div>
                   <div className={styles.follow}>
                       {user.followed ?
                           <button className={styles.btn}
                                   disabled={!isAuth || followingInProgress.some((id: number) => id === user.id)}
                                   onClick={() => {
                                       unfollowing(user.id)
                                   }}>Unfollow</button>
                           : <button className={styles.btn}
                                     disabled={!isAuth || followingInProgress.some((id: number) => id === user.id)}
                                     onClick={() => {
                                         following(user.id)
                                     }}>Follow</button>}
                   </div>
               </span>
                            <span>
                                <div className={styles.usersName}>{user.name}</div>
                                <div className={styles.usersDescr}>{user.status}</div>
                            </span>
                            <span>
                                <div className={styles.usersDescr}>{"user.location.city"}</div>
                                <div className={styles.usersDescr}>{"user.location.country"}</div>
                            </span>
    </div>
}