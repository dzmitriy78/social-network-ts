import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {loginFormSchema} from "../form/formValidation/loginFormSchema";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";

interface Values {
    email: string
    password: string
    rememberMe: boolean
}

interface Errors {
    email?: string
}

interface LoginPropsType {
    isAuth: boolean

    login(email: string, password: string, rememberMe: boolean, setStatus: (status: string) => void): void
}

const Login = (props: LoginPropsType) => {
    if (props.isAuth) {
        return <Navigate replace to="/profile"/>
    }
    return (
        <div>
            <h1>Login</h1>
            <Formik
                initialValues={{email: "", password: "", rememberMe: false}}
                validate={values => {
                    const errors: Errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit={(values: Values, {setStatus}) => {
                    props.login(values.email, values.password, values.rememberMe, setStatus)
                }}
                validationSchema={loginFormSchema}>
                {({status}) => (
                    <Form>
                        <div>
                            <Field type={'text'} name={'email'} placeholder={'e-mail'}/>
                        </div>
                        <div style={{color: "orange"}}>
                            <ErrorMessage name="email" component="div"/>
                        </div>
                        <div>
                            <Field type={'password'} name={'password'} placeholder={'password'}/>
                        </div>
                        <div style={{color: "orange"}}>
                            <ErrorMessage name="password" component="div"/>
                        </div>
                        <div>
                            <Field type={'checkbox'} name={'rememberMe'}/>
                            <label htmlFor={'rememberMe'}> remember me </label>
                        </div>
                        <div style={{color: "orange"}}>{status ? <span>{status}</span> : null}</div>
                        <button type={'submit'}>Log in</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
};

const mapStateToProps = (state: { auth: { isAuth: boolean } }) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login)