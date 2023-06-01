import axios from 'axios';


export const url = process.env.NODE_ENV === 'development' && 'http://localhost:8000';

export const axiosSignin = async (formData) => await axios.post(`${url}/api/auth/login`, formData);
export const axiosSignup = async (formData) => await axios.post(`${url}/api/auth/signup`, formData);
export const axiosRegisterCourse = async (formData) => await axios.post(`${url}/api/courses/register`, formData);


export const axiosGetAllUsers = async () => await axios.get(`${url}/api/users/learners`);
export const axiosGetAllResourcePersons = async () => await axios.get(`${url}/api/users/resourcepersons`);
export const axiosGetAllProducts = async () => await axios.get(`${url}/api/courses`);
export const axiosGetDetails = async (id) => await axios.get(`${url}/api/courses/${id}`);
export const getLearnerObeSheet = async (id) => await axios.get(`${url}/api/obe/${id}`);