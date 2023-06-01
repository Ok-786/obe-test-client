import React, { useEffect, useState } from 'react'
import Navbar from '../../components/learner/NavBar/Navbar'
import Courses from '../../components/learner/Courses/Courses'
import { axiosGetAllProducts } from '../../utils/apis';
import ChatBot from './ChatBot/ChatBot';
import { useQuery } from '@apollo/client';
import { REGISTERED_COURSES } from '../../gql/gqlQueries';

function Enrolled({ search }) {
    const [category, setCategory] = useState('all');
    const user = JSON.parse(localStorage.getItem('user'));
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const { loading, error, data, refetch } = useQuery(REGISTERED_COURSES, {
        notifyOnNetworkStatusChange: true, // Enable the loading state
        context: {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem("auth_token"))}`
            }
        }
    });

    console.log("data", data)

    useEffect(() => {
        refetch();
    }, [refetch])


    return (
        <>
            <Navbar />
            {/* <ChatBot /> */}
            <Courses title={"Enrolled Courses"} search={search} category={category} loading={loading} data={data?.registeredCourses} />

        </>
    )
}

export default Enrolled