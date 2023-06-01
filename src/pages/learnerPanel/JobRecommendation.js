import { useQuery } from '@apollo/client';
import { Button } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { PERFORM_RECOMMENDATION } from '../../gql/gqlQueries';



function JobRecommendation() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('Analyzing results...');
    const analysisObject = JSON.parse(localStorage.getItem('analysisObject'))
    const { data } = useQuery(PERFORM_RECOMMENDATION, {
        notifyOnNetworkStatusChange: true, // Enable the loading state
        context: {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem("auth_token"))}`
            }
        },
        variables: {
            category: analysisObject.category,
            courseDescription: analysisObject.courseDescription
        }
    });

    setTimeout(() => {
        setLoading(false)
    }, 6000)

    setTimeout(() => {
        setStatus('Hold on tight...')
    }, 3000)
    setTimeout(() => {
        setStatus('Loading...')
    }, 5000)
    console.log('data')
    console.log(data)






    return (
        <>


            {loading ?
                <div>
                    <div class="loading-screen" style={{ zIndex: -1 }}>
                        <div class="loading">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <h3 style={{ color: 'white', textAlign: 'center', paddingTop: '30%' }}>{status}</h3>
                </div>
                :
                <>
                    <div style={{ textAlign: 'center', marginTop: '20%' }}>
                        <h5>Recommended Job</h5>
                        <h3>
                            <br />
                            <spam style={{ fontWeight: 'bold', fontStyle: 'italic' }}> {data && data.jobRecommendation.title}</spam>
                        </h3>

                        <div style={{ marginTop: '6vh' }}>
                            <Button onClick={() => navigate('/home')} variant='contained' style={{ width: '25vh' }}>Acknowledged</Button>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default JobRecommendation