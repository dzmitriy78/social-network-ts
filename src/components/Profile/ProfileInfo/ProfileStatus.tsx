import React, {useEffect, useState} from 'react';
import classes from "./ProfileInfo.module.css"

interface ProfileStatusPropsType {
    status: string

    updateStatus(status: string): void

    isOwner: boolean
    isAuth: boolean
}

const ProfileStatus: React.FC<ProfileStatusPropsType> = ({
                                                             updateStatus,
                                                             status,
                                                             isOwner,
                                                             isAuth
                                                         }) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [newStatus, setNewStatus] = useState<string>(status)

    useEffect(() => {
        if (status) {
            setNewStatus(status)
        } else {
            setNewStatus("")
        }
    }, [status])

    const activateEditMode = () => {
        if (isAuth && isOwner)
            setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        updateStatus(newStatus)
    }

    const onStatusChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setNewStatus(e.currentTarget.value)
    }

    return (
        <div className={classes.status}>
            {!editMode
                ? <div>
                    <span className={classes.statusTitle} title={"double click to change"}
                          onDoubleClick={activateEditMode}>
                        {status || "no Status"}
                    </span>
                </div>
                : <div>
                    <input
                        onChange={onStatusChange}
                        autoFocus={true}
                        onBlur={deactivateEditMode}
                        value={newStatus}/>
                </div>
            }
        </div>
    );
};

export default ProfileStatus;