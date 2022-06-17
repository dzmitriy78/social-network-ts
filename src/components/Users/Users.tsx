import React from "react";
import styles from "./users.module.css"
import usePagination from "../hooks/usePagination";
import {User} from "./User";

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

export let Users: React.FC<UsersPropsType> = (props) => {
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
    const goPage = () => {
        let num: any = prompt("Переход на страницу...")
        setPage(Math.ceil(num / 10))
        props.onPageChanged(num)
    }
    return (<div>
        <div>

            {(
                <div className={styles.pagination}>
                    <p className={styles.text}>
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
                        .map((p, i) => {
                            return <span key={i} onClick={() => {
                                props.onPageChanged(p)
                            }} className={props.currentPage === p ? styles.selectedPage : styles.page}>{p}</span>
                        })}

                    <button
                        onClick={nextPage}
                        className={page === totalPages ? styles.page && styles.disabled : styles.page}
                    >
                        &rarr;
                    </button>
                    <button className={styles.btn} onClick={goPage}>
                        Go to
                    </button>
                </div>
            )}
        </div>
        {
            props.users.map((u, i) =>
                <User key={i}
                      user={u}
                      isAuth={props.isAuth}
                      following={props.following}
                      followingInProgress={props.followingInProgress}
                      unfollowing={props.unfollowing}
                />)
        }


    </div>)
}
