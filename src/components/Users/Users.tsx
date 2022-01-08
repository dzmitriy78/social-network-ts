import React from "react";
import styles from "./users.module.css"

let Users = (props: any) => {
    if (props.users.length === 0) {
        props.setUsers([
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
            }])
    }
    return (
        <div>
            {
                props.users.map((u: any) => {
                    return <div key={u.id}>
               <span>
                   <div>
                       <img src={u.avatar} className={styles.userAvatar} alt={""}/>
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
                            <div>{u.location.city}</div>
                            <div>{u.location.country}</div>
                    </span>
                        </div>
                    }
                )
            }
        </div>

    )
}
export default Users;