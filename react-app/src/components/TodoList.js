import './TodoList.css'

// takes the assignment list and creates a list of all the relevent assignments
function renderAssignments(assignments, setAssignment) {
    const assignmentList = []
    assignments.forEach(assignment => {
        assignmentList.push(
            <div className="assignment-container" onClick={setAssignment}>
                <div>Name: {assignment.name}</div>
                <div>Id: {assignment.id}</div>
                <div>Due Date: {assignment.due_at}</div>
            </div>
        )
    });
    return assignmentList;
}

function TodoList(props) {
    return(
        <div className='assignment-list'>
            {renderAssignments(props.assignments, props.setAssignment)}
        </div>
    )
}

export default TodoList