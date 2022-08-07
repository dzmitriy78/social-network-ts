import React from "react";
import classes from "../Profile/ProfileInfo/ProfileInfo.module.css";
import {useFormik} from "formik";
import {ProfileType} from "../Profile/ProfileContainer";

const ProfileDataEditingForm: React.FC<ProfileDataEditingForm> = ({profile, saveProfile, error}) => {

    const formik = useFormik({
        initialValues: {
            fullName: profile.fullName,
            lookingForAJob: profile.lookingForAJob,
            lookingForAJobDescription: profile.lookingForAJobDescription,
            aboutMe: profile.aboutMe,
            contacts: profile.contacts || ""
        },
        onSubmit: (values) => {
            saveProfile(values)
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <div style={{color: "darkorange", fontSize: "20px"}}>{error}</div>
            <div className={classes.description}>
                <label htmlFor={'fullName'}><b>fullName: </b></label>
                <input className={classes.contactsEdit} type='text'
                       {...formik.getFieldProps("fullName")}
                />
            </div>
            <div className={classes.description}>
                <label htmlFor={'lookingForAJob'}> <b>Looking for a job: </b></label>
                <input className={classes.contactsEdit} type={'checkbox'} defaultChecked={profile.lookingForAJob}
                       {...formik.getFieldProps("lookingForAJob")}
                />
            </div>
            <div className={classes.description}>
                <label htmlFor={'lookingForAJobDescription'}> <b>My professional skills: </b></label>
                <input className={classes.contactsEdit} type='text'
                       {...formik.getFieldProps("lookingForAJobDescription")}
                />
            </div>
            <div className={classes.description}>
                <label htmlFor={'aboutMe'}><b>AboutMe: </b></label>
                <textarea className={classes.contactsEdit} {...formik.getFieldProps("aboutMe")}
                />
            </div>
            <div className={classes.description}>
                <label htmlFor={'contacts'}><b>Contacts</b></label>: {Object.keys(profile.contacts)
                .map((key, i) => {
                    return <div key={i}>
                        <b>{key}: <input className={classes.contactsEdit} type='text'
                                         {...formik.getFieldProps("contacts." + key)}/>
                        </b>
                    </div>

                })}
            </div>

            <button className={classes.btn} type={'submit'}>Send</button>
        </form>
    )
}
export default ProfileDataEditingForm

type ValuesType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    contacts: {
        facebook: string
        github: string
        instagram: string
        mainLink: string
        twitter: string
        vk: string
        website: string
        youtube: string
    }
}

type ProfileDataEditingForm = {
    error: string
    profile: ProfileType
    saveProfile(values: ValuesType): void
}