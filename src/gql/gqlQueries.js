import { gql } from "@apollo/client";

export const PERFORM_LOGIN = gql`
    query PerformLogin($email: String! $password: String!){
        login(userInput: {email: $email password: $password}) {
            user {
                email
                id
            }
            token
            role
        }
    }
    `;

export const PERFORM_RECOMMENDATION = gql`
    query PerformRecommendation($category: String! $courseDescription: String!){
        jobRecommendation(category: $category courseDescription: $courseDescription) {
            title
        }
    }
    `;

export const LOGIN_CREDENTIALS = gql`
      query Credentials {
        credentials {
            token
            user
        }
      }
    `;


export const OFFERED_COURSES = gql`
      query OfferedCourses{
        offeredCourses {
            offeredCoursesId
            batchId
            resourcePersonId
            semesterId
            courseId
            courseTitle
            batchName
            semesterName
            courseRegistrationId
            learnerId
            offeredCourses
            password
            id
            email
            name
            designation
            category
            courseCode
            courseCredits
            courseRating
            courseDescription
            isAccepted
        }
}
`;


export const OBE = gql`
      query Obe{
        obe {
            assesmentAttemptId
            learnerId
            assesmentActivityId
            type
            assessmentId
            courseId
            resourcePersonId
            courseTitle
            email
            password
            designation
            weightage
            marks
            category
            courseCode
            courseCredits
            courseRating
            courseDescription
            batchName
            semesterName
        }
}
`;


export const filterObeCourse = gql`
      query FilterObeCourse($title: String!){
        filterObeCourse(title: $title) {
            assesmentAttemptId
            learnerId
            assesmentActivityId
            type
            assessmentId
            assessmentType
            courseId
            resourcePersonId
            courseTitle
            email
            password
            designation
            weightage
            marks
            category
            courseCode
            courseCredits
            courseRating
            courseDescription
            batchName
            semesterName
        }
}
`;


export const OBETitle = gql`
      query CoursesTitle{
        coursesTitle 
}
`;



export const REGISTERED_COURSES = gql`
      query RegisteredCourses{
        registeredCourses {
            offeredCoursesId
            batchId
            resourcePersonId
            semesterId
            courseId
            courseTitle
            batchName
            semesterName
            courseRegistrationId
        }
}
`;


export const COURSE_DETAIL = gql`
      query CourseDetail($id: String!){
        course(id: $id) {
            offeredCoursesId
            batchId
            resourcePersonId
            semesterId
            courseId
            courseTitle
            batchName
            semesterName
            courseRegistrationId
            learnerId
            offeredCourses
            password
            id
            email
            designation
            category
            courseCode
            courseCredits
            courseRating
            courseDescription
        }
    }
`;


export const GET_LEARNERS = gql`
      query Learners{
        learners {
            id
            name
            batchId
            semesterId
            section
            email
        }
    }
`;


export const GET_RESOURCE_PERSONS = gql`
      query ResourcePersons{
        resourcePersons {
            id
            name
            designation
            email
            password
        }
    }
`;


export const REGISTER_COURSE = gql`
      mutation RegisterCourse($courseId: String!){
        registerCourse(courseId: $courseId) {
            courseregistration_id
            learner_id
            course_id
        }
    }
`;


export const CREATE_USER = gql`
      mutation CreateUser($email: String! $password: String!){
        createUser(userInput: {email:$email password: $password}) {
            id
            email
        }
    }
`;

export const SCRAP_COURSES = gql`
      query ScrapCourses($courseType: String!){
        scrapCourses(courseType: $courseType) {
            title
            description
            rating
            author
            link
            image
        }
    }
`;

export const COURSE_APPROVE = gql`
    mutation CourseApprove($courseId: String) {
        courseApprove(courseId: $courseId)
    }
`;