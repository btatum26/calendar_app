import './App.css';
import React, { useEffect, useState, useRef } from 'react'
import TodoList from './components/TodoList.js';
import ChatBox from './components/ChatBox.js'
import TimeEstimator from './components/TimeEstimator.js';
import Sidebar from './components/Sidebar.js'
import axios from 'axios'
import DOMParserReact from 'dom-parser-react'


function App() {

  const [assignments, setAssignments] = useState([])  
  const [courses, setCourses] = useState([])
  const [assignment, setAssignment] = useState(null)
  const [course, setCourse] = useState(null)
  const [isResizing, setIsResizing] = useState(false)
  const [width, setWidth] = useState(0)

  // gets the assignements from canvas
  useEffect(() => {
    axios.get('http://localhost:3000/api/courses/200091/assignments?per_page=50').then(res => {
      setAssignments(res.data)
    })
  }, [])

  useEffect(() => {
    if (course !== null) {
      axios.get('http://localhost:3000/api/courses/' + course.id + '/assignments?per_page=50').then(res => {
        setAssignments(res.data)
        console.log(res.data)
      })
    }
  }, [course])
  
  // refrence to the resizer
  const ref = useRef(null);
  
  // sets the width of the sidebar
  function resize(e) {
    if (isResizing) {
      setWidth(window.innerWidth - e.clientX)
    }
  }
  
  // starts resizing
  function startResizing() {
    setIsResizing(true)
  }
  
  // stop resizing
  function stopResizing(e) {
    setIsResizing(false)
  }

  function handleSetAssignment(assignment) {
    setAssignment(assignment)
  }

  function DELETEME() {
    if(assignment !== null) {
      return(<>
        <div>Name: {assignment.name}</div>
        <div>Id: {assignment.id}</div>
        <div>Due Date: {assignment.due_at}</div>
        <div>
          <div>Description:</div>
          <DOMParserReact source={assignment.description} />
        </div>
      </>)
    }
  }

  function dropDown() {
    return (
      <>
        <button class="dropbtn">Dropdown 
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
          { courses.map((course) => {
            return (<button onClick={setCourse(course)}>{course.name}</button>)
          })}
        </div>
      </>
    )
  }

  return (
    <div className="App" onMouseUp={stopResizing} onMouseMove={resize}>
      {dropDown}
      <TodoList assignments={assignments} handleSetAssignment={handleSetAssignment}/>
      <div className="assignment-viewer">
            <div className='resizer'
                onMouseDown={startResizing}
                onMouseUp={stopResizing}>
            </div>
            <div className='assignment-info'
                style={{ width: width }}
                ref={ref}>
                  {DELETEME()}
                  <ChatBox assignment={assignment}/>
                  <TimeEstimator assignment={assignment}/>
            </div>
        </div>
    </div>
  );
}

export default App;
