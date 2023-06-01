import React, { useEffect, useLayoutEffect } from 'react'
import { Navigate, Route, Routes as Switch, BrowserRouter } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'


import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/learnerPanel/Home';
import Dashboard from './pages/adminPanel/Dashboard';
import Enrolled from './pages/learnerPanel/Enrolled';
import ObeSheet from './pages/learnerPanel/ObeSheet';
import { useApolloClient, useQuery } from '@apollo/client';
import { LOGIN_CREDENTIALS } from './gql/gqlQueries';
import ChatBot from './pages/learnerPanel/ChatBot/ChatBot';
import Recommended from './pages/learnerPanel/Recommended';
import JobRecommendation from './pages/learnerPanel/JobRecommendation';


function Routes() {
    const client = useApolloClient();
    const { data } = useQuery(LOGIN_CREDENTIALS, { fetchPolicy: 'cache-only' });
    const auth = JSON.parse(localStorage.getItem('auth_token'));
    const user = JSON.parse(localStorage.getItem('user'));


    useLayoutEffect(() => {
        auth && user && client.writeQuery({
            query: LOGIN_CREDENTIALS,
            data: {
                credentials: {
                    token: auth,
                    user: user,
                    __typename: 'Credentials',
                },
            },
        });
    }, [client, user, auth])

    // useEffect(() => {
    //     // Redirect to login page if authentication state changes
    //     if (!data && !auth) {
    //         window.location.href = '/login';
    //     }
    // }, [data, auth]);

    // if (!data && !auth) {
    //     return <Navigate to="/login" />;
    // }


    return (
        <>
            <ChatBot />
            <BrowserRouter>
                <Switch>
                    {(!auth) && <>
                        {console.log('aa')}
                        <Route path='/login' element={<Signin />} exact />
                        <Route path='/register' element={<Signup />} exact />
                        <Route path="/" element={<Navigate to="/login" />} />
                    </>}
                    {(auth) && <>
                        {(user.role === 'admin') ?
                            <>
                                {console.log('aab')}
                                <Route path='/dashboard' element={<Dashboard />} exact />
                                <Route path="/" element={<Navigate to="/dashboard" />} />
                            </>
                            :
                            <>
                                {console.log('aac')}
                                <Route path='/home' element={<Home />} exact />
                                <Route path='/enrolled' element={<Enrolled />} exact />
                                <Route path='/recommended' element={<Recommended />} exact />
                                <Route path='/job-recommendation' element={<JobRecommendation />} exact />
                                <Route path='/obe-sheet' element={<ObeSheet />} exact />
                                <Route path="/" element={<Navigate to="/home" />} />
                            </>
                        }
                    </>}
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default Routes

