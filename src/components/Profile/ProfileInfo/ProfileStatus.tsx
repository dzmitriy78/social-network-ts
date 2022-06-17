import React, {ChangeEvent, useEffect, useState} from 'react';

interface ProfileStatusPropsType {
    status: string
    updateStatus(status: string): void
}

const ProfileStatus: React.FC<ProfileStatusPropsType> = ({updateStatus, status}) => {
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
                    <span onDoubleClick={activateEditMode}>{status || "no Status"}</span>
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