import axios from 'axios'
import { useState, useEffect, useCallback } from 'react'

import "./TimeEstimator.css"

function TimeEstimator(props) {
    
    const prompt = "I will present you with an assignment description, give me a time estimation of how "
    + "long the assignment will take. I want an upper bound, a lower bound, and the units of time req"
    + "uired to complete the assignment give me the responce in json format that contains two integer"
    + " attributes: high and low and one attribut that has a unit of time: units. Follow the template"
    + " {\"high\": ,\"low\": ,\"units\": } Do not write anything except for the JSON Do not complete "
    + "the assignment."

    const responseFormat = {
        "type": "object",
        "properties": {
            "high": {
                "type": "integer"
            },
            "low": {
                "type": "integer"
            },
            "units": {
                "type": "string"
            }
        },
        "required": [
            "high",
            "low",
            "units"
        ]
    }
    
    useEffect(() => {
        updateTimeEstimation()
    }, [props.assignment])
    
    const [message, setMessage] = useState("")
    const [estimation, setEstimation] = useState({})
    const [history, setHistory] = useState([])
    
    const handler = axios.create({
        responseType: 'stream',
        baseURL: 'http://localhost:11434/api'
    })
    
    // this function will update the time estimation of the current assignment description
    // this will be affected by any dialog that happens with the user
    const updateTimeEstimation = () => {
        const parser = new DOMParser()
        const descriptionText = parser.parseFromString(props.assignment.description, "text/html").body.textContent

        // preps the algorithm for the rquest
        const messages = [{ 
            "role": "system",
            "content": prompt
        }]
        history.forEach((item) => {
            messages.push(item)
        })
        messages.push({
            "role": "user",
            "content": descriptionText
        })

        if (props.assignment !== null) {
            setMessage("loading...")
            handler.post('/chat', {
                "model": "llama3.2",
                "stream": false,
                "messages": messages,
                "format": responseFormat
            }).then(res => {
                console.log(JSON.parse(JSON.parse(res.data).message.content).status = "updated")
                setEstimation(JSON.parse(JSON.parse(res.data).message.content))
            })
        } else {
            setEstimation({
                status: "no-assignment",
                low: "",
                high: ""
            })
        }
    }
    
    function lowerEstimation() {
        const newHistory = JSON.parse(JSON.stringify(history))
        newHistory.push({
            "role": "user",
            "content": "The estimation of: " + message + " is too high for this assignment please return a lower estimation"
        })
        setHistory(newHistory)
    }
    
    function raiseEstimation() {
        const newHistory = JSON.parse(JSON.stringify(history))
        newHistory.push({
            "role": "user",
            "content": "The estimation of: " + message + " is too low for this assignment please return a higher estimation"
        })
        setHistory(newHistory)
    }

    return (
        <div className='time-estimatior-container'>
            <button onClick={lowerEstimation} className='reduce-estimation-button'>-</button>
            <div className='display'>
                <input value={estimation.low}></input>
                -
                <input value={estimation.high}></input>
            </div>
            <button onClick={raiseEstimation} className='increase-estimation-button'>+</button>
            <button onClick={updateTimeEstimation}>Regenerate</button>
        </div>)
}

export default TimeEstimator