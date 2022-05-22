import React from "react";
import styles from "./users.module.css"
import userPhoto from "./../../assets/images/user.png"
import {NavLink} from "react-router-dom";
import usePagination from "../hooks/usePagination";

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
    isAuth: boolean
}

export let Users: React.FC< UsersPropsType> = (props) => {
    const {
        firstContentIndex,
        lastContentIndex,
        nextPage,
        prevPage,
        page,
        setPage,
        totalPages,
    } = usePagination({
        contentPerPage: 10,
        count: props.totalUsersCount,
    });

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    const goPageBlock = () => {
        let num: any = prompt("Переход на страницу...")
        setPage(num);
    };
    return (<div>
        <div>

            {(
                <div className={styles.pagination}>
                    <p className={styles.text}>
                        Page block:
                        {page}/{totalPages}
                    </p>
                    <button
                        onClick={prevPage}
                        className={page === 1 ? styles.disabled : styles.page}
                    >
                        &larr;
                    </button>

                    {pages
                        .slice(firstContentIndex, lastContentIndex)
                        .map((p,i) => {
                            return <span key={i} onClick={() => {
                                props.onPageChanged(p)
                            }} className={props.currentPage === p ? styles.selectedPage : styles.page}>{p}</span>
                        })}
                    {/*{[...Array(totalPages).keys()].map((el) => (
                            <button
                                onClick={() => setPage(el + 1)}
                                key={el}
                                className={`page ${page === el + 1 ? "active" : ""}`}
                            >
                                {el + 1}
                            </button>
                        ))}*/}

                    <button
                        onClick={nextPage}
                        className={page === totalPages ? styles.page && styles.disabled : styles.page}
                    >
                        &rarr;
                    </button>
                    <button className={styles.btn} onClick={goPageBlock}>
                        Go to
                    </button>
                </div>
            )}
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
                           <button className={styles.btn} disabled={!props.isAuth || props.followingInProgress.some(id => id === u.id)}
                                   onClick={() => {
                                       props.unfollowing(u.id)
                                   }}>Unfollow</button>
                           : <button className={styles.btn} disabled={!props.isAuth || props.followingInProgress.some(id => id === u.id)}
                                     onClick={() => {
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
    </div>)
}
