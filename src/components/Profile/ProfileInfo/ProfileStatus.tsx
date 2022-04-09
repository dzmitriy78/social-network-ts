import React, {useEffect, useState} from 'react';

interface ProfileStatusPropsType {
    status: string

    updateStatus(status: string): void
}

const ProfileStatus = (props: ProfileStatusPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState<string>(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e: { currentTarget: { value: React.SetStateAction<string>; }; }) => {
        setStatus(e.currentTarget.value)
    }


    return (
        <div>
            {!editMode
                ? <div>
                    <span onDoubleClick={activateEditMode}>{props.status || "no status"}</span>
                </div>
                : <div>
                    <input
                        onChange={onStatusChange}
                        autoFocus={true}
                        onBlur={deactivateEditMode}
                        value={status}/>
                </div>
            }
        </div>
    );
};

export default ProfileStatus;