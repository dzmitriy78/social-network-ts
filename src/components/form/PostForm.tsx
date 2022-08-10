import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import classes from "./PostForm.module.css"
import {postFormSchema} from "./formValidation/loginFormSchema";

const PostForm: React.FC<PostFormProps> = ({callback}) => {
    return (
        <div>
            <Formik
                initialValues={{text: ""}}
                validate={values => {
                    const errors: Errors = {};
                    if (!values.text) {
                        errors.text = 'Enter your message'
                    }
                    return errors;
                }}
                onSubmit={(values, actions) => {
                    callback(values)
                    actions.resetForm({values: {text: ""}})
                }}
                validationSchema={postFormSchema}
            >
                {() => (
                    <Form>
                        <div>`
                            <Field component={'textarea'}
                                   name={'text'}
                                   placeholder={'write a message'}/>
                        </div>
                        <div className={classes.errorMessage}>
                            <ErrorMessage name="text" component="div"/>
                        </div>
                        <button style={{cursor:"pointer"}} type={'submit'}>Add post</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default PostForm;

export interface FormikValues {
    text: string
}

interface Errors {
    text?: string
}

interface PostFormProps {
    callback: (values: FormikValues) => void
}
