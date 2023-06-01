import React, { useEffect, useState } from 'react'
import styles from './Signin.module.css';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useApolloClient, useLazyQuery } from "@apollo/client";
import { LOGIN_CREDENTIALS, PERFORM_LOGIN } from '../gql/gqlQueries';


function Signin() {
    const client = useApolloClient();
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    // const { loading, error, data, refetch } = useQuery(PERFORM_LOGIN, {
    //     variables: { email: credentials.email, password: credentials.password},
    //     skip: !credentials.email && !credentials.password, // Skip the query if userId is empty
    //     notifyOnNetworkStatusChange: true, // Enable the loading state
    // });
    const [getUser, { loading, error, data }] = useLazyQuery(PERFORM_LOGIN);
    const navigate = useNavigate();


    const changeCredentials = (e) => {
        setCredentials((prevCredentials) => {
            return {
                ...prevCredentials,
                [e.target.name]: e.target.value
            }
        })
    }

    const loginHandler = (e) => {
        e.preventDefault();
        getUser({ variables: { email: credentials.email, password: credentials.password } });
    }

    useEffect(() => {
        if (data) {
            client.writeQuery({
                query: LOGIN_CREDENTIALS,
                data: {
                    credentials: {
                        token: data.login.token,
                        user: { ...data.login.user, role: data.login.role },
                        __typename: 'Credentials',
                    },
                },
            });
            console.log(data.login)
            data.login.role == 'resource_person' && window.location.replace('http://127.0.0.1:8000/');
            if (data.login.role == 'resource_person') return;
            localStorage.setItem('auth_token', JSON.stringify(data.login.token));
            localStorage.setItem('user', JSON.stringify({ ...data.login.user, role: data.login.role }));

            data.login.role === 'learner' ? navigate('/home') : navigate('/dashboard')
        } else if (error) {
            toast.error(error.message);
        }
    }, [data, error, navigate, client])

    return (
        <div >
            <div className={styles['background']}>
                <div className={styles['shape']}></div>
                <div className={styles['shape']}></div>
            </div>
            <form onSubmit={loginHandler}>
                <h3>Login Here</h3>

                <label htmlFor="email">Username</label>
                <TextField type="text" placeholder="Enter Email" id="email" name="email" variant='outlined' fullWidth color='primary' InputProps={{
                    style: {
                        color: 'black',
                        border: '1px solid  grey',
                    }
                }}
                    onChange={changeCredentials}
                    value={credentials.email}
                />

                <label htmlFor="password">Password</label>
                <TextField type="password" placeholder="Password" id="password" name="password" variant='outlined' fullWidth color='primary' InputProps={{
                    style: {
                        color: 'black',
                        border: '1px solid  grey',
                    }
                }}
                    onChange={changeCredentials}
                    value={credentials.password}
                />

                <Button type='submit' variant='contained' color='primary' size='large' sx={{ mt: 8 }}>Log In</Button>
                <div className={styles['social']}>
                    <Button variant='contained' color="error" sx={{ color: 'white', mr: 1 }} > </Button>
                    <Button variant='contained' color="error" sx={{ color: 'white', ml: 1 }}></Button>
                </div>

                <div className={styles['signin-label']}>
                    <h5>Don't have an account? <span style={{ color: 'red', cursor: 'pointer' }} onClick={() => navigate('/register')}>&nbsp;register</span></h5>
                </div>
            </form>
        </div>
    )
}

export default Signin