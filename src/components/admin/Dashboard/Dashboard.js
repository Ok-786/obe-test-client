import { useQuery } from '@apollo/client';
import React from 'react'
import { GET_LEARNERS, GET_RESOURCE_PERSONS, OFFERED_COURSES } from '../../../gql/gqlQueries';
import Card from './Card';

function Dashboard() {
    const { loading: loading1, error: error1, data: data1, refetch: refetch1 } = useQuery(GET_LEARNERS, {
        notifyOnNetworkStatusChange: true, // Enable the loading state
        context: {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem("auth_token"))}`
            }
        }
    });
    const { loading: loading2, error: error2, data: data2, refetch: refetch2 } = useQuery(OFFERED_COURSES, {
        notifyOnNetworkStatusChange: true, // Enable the loading state
        context: {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem("auth_token"))}`
            }
        }
    });

    const { loading: loading3, error: error3, data: data3, refetch: refetch3 } = useQuery(GET_RESOURCE_PERSONS, {
        notifyOnNetworkStatusChange: true, // Enable the loading state
        context: {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem("auth_token"))}`
            }
        }
    });


    return (
        <div>
            <Card data={data1} data3={data3} data2={data2} />
        </div>
    )
}

export default Dashboard