import React, {useState} from 'react';

interface ProfileStatusPropsType {
    status: string
}

const ProfileStatus = (props: ProfileStatusPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
    }

    return (
        <div>
            {!editMode
                ? <div>
                    <span onDoubleClick={activateEditMode}>{props.status}</span>
                </div>
                : <div>
                    <input autoFocus={true} onBlur={deactivateEditMode} defaultValue={props.status}/>
                </div>
            }
        </div>
    );
};

export default ProfileStatus;