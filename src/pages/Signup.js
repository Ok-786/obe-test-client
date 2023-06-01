import React, { useEffect, useState } from 'react'
import styles from './Signup.module.css';

import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { toast } from "react-toastify";

import GoogleIcon from '@mui/icons-material/Google';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import { useNavigate } from 'react-router-dom';
import { axiosSignup } from '../utils/apis';
import { useLazyQuery, useMutation } from '@apollo/client';
import { CREATE_USER } from '../gql/gqlQueries';

function Signup() {
    const navigate = useNavigate();
    const [registerUser, { loading, error, data }] = useMutation(CREATE_USER);
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const changeCredentials = (e) => {
        setCredentials((prevCredentials) => {
            return {
                ...prevCredentials,
                [e.target.name]: e.target.value
            }
        })
    }

    const registerLearner = async (e) => {
        try {
            e.preventDefault();

            if (credentials.confirmPassword !== credentials.password) {
                alert("Passwords don't match. Please try again")
            }

            registerUser({ variables: { email: credentials.email, password: credentials.password } });
        } catch (err) {
            console.log(err.response.data)
            toast.error(err.response.data.message)
        }
    }

    useEffect(() => {
        data && toast.success("Learner registered successfully!")
        error && toast.success(error.message)
    }, [data, error])


    return (
        <div >
            <div className={styles['background']}>
                <div className={styles['shape']}></div>
                <div className={styles['shape']}></div>
            </div>
            <form onSubmit={registerLearner}>
                <h3>Register Here</h3>

                <label for="email">Username</label>
                <TextField type="text" placeholder="Enter Email" id="email" name="email" variant='outlined' fullWidth color='primary' InputProps={{
                    style: {
                        color: 'black',
                        border: '1px solid  grey',
                    }
                }}
                    onChange={changeCredentials}
                    value={credentials.email}
                />

                <label for="password">Password</label>
                <TextField type="password" placeholder="Password" id="password" name="password" variant='outlined' fullWidth color='primary' InputProps={{
                    style: {
                        color: 'black',
                        border: '1px solid  grey',
                    }
                }}
                    onChange={changeCredentials}
                    value={credentials.password}
                />

                <label for="confirm-password">Confirm Password</label>
                <TextField type="password" placeholder="Confirm Password" id="confirm-password" name="confirmPassword" variant='outlined' fullWidth color='primary' InputProps={{
                    style: {
                        color: 'black',
                        border: '1px solid  grey',
                    }
                }}
                    onChange={changeCredentials}
                    value={credentials.confirmPassword}
                />

                <Button type="submit" variant='contained' color='primary' size='large' sx={{ mt: 8 }}>Sign up</Button>
                <div className={styles['social']}>
                    <Button variant='contained' color="error" sx={{ color: 'white', mr: 1 }} >  </Button>
                    <Button variant='contained' color="error" sx={{ color: 'white', ml: 1 }}> </Button>
                </div>

                <div className={styles['signin-label']}>
                    <h5>Already have an account? <span style={{ color: 'red', cursor: 'pointer' }} onClick={() => navigate('/login')}>&nbsp;login</span></h5>
                </div>
            </form>
        </div>
    )
}

export default Signup