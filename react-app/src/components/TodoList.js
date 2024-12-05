import './TodoList.css'



function TodoList(props) {

    // takes the assignment list and creates a list of all the relevent assignments
    function renderAssignments(assignments, setAssignment) {
        const assignmentList = []
        assignments.forEach(assignment => {
            assignmentList.push(
                <div className="assignment-container" onClick={() => {setAssignment(assignment)}}>
                    <div>Name: {assignment.name}</div>
                    <div>Id: {assignment.id}</div>
                    <div>Due Date: {assignment.due_at}</div>
                </div>
            )
        });
        return assignmentList;
    }



    return(
        <div className='assignment-list'>
            {renderAssignments(props.assignments, props.handleSetAssignment)}
        </div>
    )
}

export default TodoList