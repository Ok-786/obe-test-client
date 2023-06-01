import { Button, Rating, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/learner/NavBar/Navbar';
import Categories from '../../components/learner/Categories/Categories'
import Courses from '../../components/learner/Courses/Courses'
import Slideshow from '../../components/learner/SlideShow/SlideShow';
import ChatBot from './ChatBot/ChatBot';
import { useQuery } from '@apollo/client';
import { OFFERED_COURSES } from '../../gql/gqlQueries';

export default function Home({ search }) {
    const [category, setCategory] = useState('all');
    const { loading, error, data, refetch } = useQuery(OFFERED_COURSES, {
        notifyOnNetworkStatusChange: true, // Enable the loading state
        context: {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem("auth_token"))}`
            }
        }
    });

    useEffect(() => {
        refetch();
    }, [refetch])

    console.log('data', JSON.parse(localStorage.getItem("auth_token")))
    console.log(data)


    return (
        <div>
            <Navbar />
            <Slideshow />
            <Categories setCategory={setCategory} />
            {data && <Courses refetchCourses={refetch} title={"Offered Courses"} search={search} category={category} loading={loading} data={data.offeredCourses} />}
            {/* nMzX8eB3rlG0PvAOsGsN */}
        </div>
    )
}
