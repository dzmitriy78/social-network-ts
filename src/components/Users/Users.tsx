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
}

let Users = (props: UsersPropsType) => {
    if (props.users.length === 0) {
        axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
                props.setUsers(response.data.items)
            }
        )
    }
    /* [
     {
         id: 1,
         avatar: "https://author.today/content/2020/02/27/6b61e91ea7f64ddb975f57fa36a38814.jpg",
         followed: true,
         fullName: "Dzmitriy",
         status: "Boss",
         location: {city: "Baranovichi", country: "Belarus"}
     },
     {
         id: 2,
         avatar: "https://cspromogame.ru//storage/upload_images/avatars/1299.jpg",
         followed: true,
         fullName: "Yarik",
         status: "Admin",
         location: {city: "Baranovichi", country: "Belarus"}
     },
     {
         id: 3,
         avatar: "https://i.imgur.com/mDcyZHZ.png",
         followed: false,
         fullName: "Anyuta",
         status: "User",
         location: {city: "Minsk", country: "Belarus"},
     }]*/
    return (
        <div>
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
export default Users;