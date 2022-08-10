import {ErrorMessage, Field, Form, Formik} from "formik";
import {loginFormSchema} from "../form/formValidation/loginFormSchema";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import * as React from "react";
import {AppStateType} from "../../redux/store";
import classes from "./Login.module.css"


interface Values {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

interface Errors {
    email?: string
}

interface LoginPropsType {

    isAuth: boolean
    captchaUrl: string | null | undefined;
    login: (email: string, password: string, rememberMe: boolean, captcha: string, setStatus: (status: string) => void) => Promise<void>
}

const Login: React.FC<LoginPropsType> = ({login, isAuth, captchaUrl}) => {

    if (isAuth) {
        return <Navigate replace to="/profile"/>
    }
    return (
        <div className={classes.login}>
            <h1>Log in</h1>
            <h3>Данные тестового аккаунта: </h3>
            <h4>
                Email: free@samuraijs.com<br/>
                Password: free
            </h4>

            <Formik
                initialValues={{email: "", password: "", rememberMe: false, captcha: ""}}
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
                onSubmit={async (values: Values, {setStatus}) => {
                   await login(values.email, values.password, values.rememberMe, values.captcha, setStatus)
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
                        <div>
                            {captchaUrl && <img src={captchaUrl} alt={'captcha'}/>}
                            {captchaUrl && <Field type={'text'} name={'captcha'} placeholder={'insert captcha'}/>}

                        </div>
                        <button className={classes.button} type={'submit'}>Log in</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
};

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {login})(Login)