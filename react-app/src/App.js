import './App.css';
import React, { useEffect, useState } from 'react'
import TodoList from './components/TodoList.js';
import axios from 'axios'


function App() {

  const [assignments, setAssignments] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/api/courses/196109/assignments?per_page=50').then(res => {
      setAssignments(res.data)
      console.log(res.data)
    })
  }, [])

  return (
    <div className="App">
      <div>This will be a menue bar</div>
      <TodoList assignments={assignments}/>
      <div className='assignment-viewer'>this will display assignment information</div>
    </div>
  );
}

export default App;
