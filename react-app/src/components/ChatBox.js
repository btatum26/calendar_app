import axios from 'axios'
import { useState, useEffect } from 'react'

import "./ChatBox.css"

function ChatBox(props) {

    const prompt = "I will present you with an assignment description, give me a time estimation of how "
        + "long the assignment will take. I want an upper bound, a lower bound, and the units of time req"
        + "uired to complete the assignment give me the responce in json format that contains two integer"
        + " attributes: high and low and one attribut that has a unit of time: units. Follow the template"
        + " {\"high\": ,\"low\": ,\"units\": } Do not write anything except for the JSON Do not complete "
        + "the assignment."

    useEffect(() => {
        setMessage("loading...")
        setEstimations([])
    }, [props.assignment])

    const [message, setMessage] = useState("")
    const [estimations, setEstimations] = useState([])

    const handler = axios.create({
        responseType: 'stream',
        baseURL: 'http://localhost:11434/api'
    })

    // this function will update the time estimation of the current assignment description
    // this will be affected by any dialog that happens with the user
    function updateTimeEstimation() {
        const parser = new DOMParser()
        const descriptionText = parser.parseFromString(props.assignment.description, "text/html").body.textContent
        const messages = [{ 
                "role": "system",
                "content": prompt
        }]
        estimations.forEach((item) => {
            messages.push(item)
        })
        messages.push({
                "role": "user",
                "content": descriptionText
        })
        console.log(messages)

        if (props.assignment !== null) {
            setMessage("loading...")
            handler.post('/chat',
                {
                    "model": "llama3.2",
                    "stream": false,
                    "messages": messages
                },
            ).then(res => {
                messages.push(JSON.parse(res.data).message)
                setMessage(JSON.parse(res.data).message.content)
            })
        } else {
            setMessage("No assignment selected")
        }
    }

    function lowerEstimation() {
        const newEstimations = JSON.parse(JSON.stringify(estimations))
        newEstimations.push({
            "role": "user",
            "content": "The estimation of: " + message + " is too high for this assignment please return a lower estimation"
        })
        setEstimations(newEstimations)
    }

    function raiseEstimation() {
        const newEstimations = JSON.parse(JSON.stringify(estimations))
        newEstimations.push({
            "role": "user",
            "content": "The estimation of: " + message + " is too low for this assignment please return a higher estimation"
        })
        setEstimations(newEstimations)
    }

    return (
    <div className='chatbox-container'>
        <button onClick={updateTimeEstimation}>Generate Time estimation</button>
        <div>Time to complete assignment: {message}</div>
        <button onClick={lowerEstimation}>Estimation Too High</button>
        <button onClick={raiseEstimation}>Estimation Too Low</button>
    </div>)
    
}

export default ChatBox