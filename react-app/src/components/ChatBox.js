import axios from 'axios'
import { useState, useEffect } from 'react'


function ChatBox(props) {

    useEffect(() => {
        handleSetMessage("loading...")
        updateTimeEstimation()
        setConversation([])
    }, [props.assignment])

    const [message, setMessage] = useState("")
    const [conversation, setConversation] = useState([])
    const [chatRequest, setChatRequest] = useState("")
    const [chatResponce, setChatResponce] = useState("")
    const [hasEstimation, setHasEstimation] = useState(false)

    const handler = axios.create({
        responseType: 'stream',
        baseURL: 'http://localhost:11434/api'
    })

    // this function will update the time estimation of the current assignment description
    // this will be affected by any dialog that happens with the user
    function updateTimeEstimation() {
        const messages = conversation
        console.log(conversation)
        if (props.assignment !== null) {
            handleSetMessage("loading...")
            setChatResponce("Please let the time estimation complete before asking for recomendations")
            messages.push({ "role": "user", "content": "Give me a time estimation of how long the following assignment. the beginning of the assignment will be marked with \"--PROMPT START\" and the end will be marked with \"--PROMT END\" respond only with a number range and a unit. \n--PROMPT START\n" + props.assignment.description + "--PROMPT END"})
            handler.post('/chat',
                {
                    "model": "llama3.2",
                    "stream": false,
                    "messages": messages
                },
            ).then(res => {
                messages.push(JSON.parse(res.data).message)
                setMessage(JSON.parse(res.data).message.content)
                setChatRequest("ask the model anything")
                setChatResponce("")          
                setHasEstimation(true)
            })
        } else {
            handleSetMessage("No assignment selected")
            setHasEstimation(false)
        }
        console.log(messages)
        setConversation(messages)
    }

    function queryModel() {
        const messages = conversation
        console.log(conversation)
        if (props.assignment == null) {
            handleSetMessage("No assignment selected") 
            setChatResponce("No assignment selected")           
        } else if (!hasEstimation) {
            setChatResponce("Please let the time estimation complete before asking for recomendations")          
        } else {
            setChatResponce("loading...")
            messages.push({role: 'user', content: chatRequest})
            handler.post('/chat',
                {
                    "model": "llama3.2",
                    "stream": false,
                    "messages": messages
                },
            ).then(res => {
                messages.push(JSON.parse(res.data).message)
                setChatResponce(JSON.parse(res.data).message.content)
            })
        }
        console.log(messages)
        setConversation(messages)
    }

    function handleSetMessage(message) {
        setMessage(message)
    }

    function handleSetChatRequest(e) {
        setChatRequest(e.target.value)
    }

    return (
    <div className='chatbox-container'>
        <button onClick={updateTimeEstimation}>Generate Time estimation</button>
        <div>Time to complete assignment: {message}</div>
        <input className='chat-input' onChange={handleSetChatRequest}></input>
        <button onClick={queryModel}>Ask the Model!</button>
        <div>{chatResponce}</div>
    </div>)
    
}

export default ChatBox