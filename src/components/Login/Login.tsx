import React from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {loginFormSchema} from "../form/formValidation/loginFormSchema";

interface Values {
    email: string
    password: string
    rememberMe: boolean
}

interface Errors {
    email?: string
}

const Login = () => (
    <div>
        <h1>Login</h1>
        <Formik
            initialValues={{email: "", password: "", rememberMe: false}}
            validate={values => {
                const errors: Errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                return errors;
            }}
            onSubmit={(values: Values) => {
                console.log(values)
            }}
            validationSchema={loginFormSchema}>
            {() => (
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

                    <button type={'submit'}>Log in</button>
                </Form>
            )}
        </Formik>
    </div>
);

export default Login