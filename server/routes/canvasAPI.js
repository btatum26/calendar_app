const axios = require('axios');
const express = require('express');

const URL = 'https://canvas.vt.edu:443/api/v1/'
const api = axios.create({
    baseURL: URL,
    headers: {
        "Accept": "application/json",
    }
});

/*
Pulls all courses avalible for the student 
*/
getCourses = async (req, res) => {
    await api.get('/courses')
        .then(response => {
            return res.status(200)
                .json(response.data)
        })
        .catch(error => console.log(error.data))
}

/*
Pulls all assignments
*/
getAssignmentsByCourse = async (req, res) => {
    await api.get('/courses/' + req.params.courseID + "/assignments")
        .then(response => {
            return res.status(200)
                .json(response.data)
        })
        .catch(error => console.log(error.data))
}


// routes all needed info
const router = express.Router()
router.get('/courses', getCourses)
router.get('/courses/:courseID/assignments', getAssignmentsByCourse)

module.exports = router