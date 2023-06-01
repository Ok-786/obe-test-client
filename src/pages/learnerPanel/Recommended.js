import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import Courses from '../../components/learner/Courses/Courses'
import Navbar from '../../components/learner/NavBar/Navbar'
import { SCRAP_COURSES } from '../../gql/gqlQueries';

function Recommended({ search }) {
    const courseType = JSON.parse(localStorage.getItem('courseType'));
    const [category, setCategory] = useState('all');
    const user = JSON.parse(localStorage.getItem('user'));
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const { loading, error, data, refetch } = useQuery(SCRAP_COURSES, {
        // notifyOnNetworkStatusChange: true, // Enable the loading state
        context: {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem("auth_token"))}`
            }
        },
        variables: {
            courseType: courseType ? courseType : "programming"
        }
    });

    console.log("data", data)

    useEffect(() => {
        refetch();
    }, [refetch])

    console.log('llllllllll2222')
    console.log(courseType)

    // courseType
    return (
        <>
            <Navbar />
            <div className="bar">
                <span className="bar_content">
                    Based on your results we found that you have weak concepts in {courseType} based courses hence we recommend you the above courses to improve your understanding and gain more grades after upcoming your weakness
                </span>
            </div>
            <Courses title={"Recommended Courses"} search={search} category={category} loading={loading} data={data?.scrapCourses} />

        </>
    )
}

export default Recommended