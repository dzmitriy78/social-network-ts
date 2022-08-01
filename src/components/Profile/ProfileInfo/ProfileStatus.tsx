import React, {ChangeEvent, useEffect, useState} from 'react';

interface ProfileStatusPropsType {
    status: string

    updateStatus(status: string): void

    isOwner: boolean
}

const ProfileStatus: React.FC<ProfileStatusPropsType> = ({updateStatus, status, isOwner}) => {
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
        if (isOwner)
            setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        updateStatus(newStatus)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode
                ? <div>
                    <span onDoubleClick={activateEditMode}
                          style={{color: "azure", fontSize: "24px", fontWeight: "bold"}}>
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