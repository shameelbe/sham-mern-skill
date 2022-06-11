import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateStudent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [course, setCourse] = useState('python');
    const navigate = useNavigate();

    const createStudent = (e) => {
        e.preventDefault();
        const student = {firstName: firstName, lastName: lastName, course: course };

        fetch('http://localhost:4000/students/', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(student)
            }
        ).then(() => {
            // navigate to my list
            navigate("/list");
        });
    }

    return (
        <div className="create">
            <h2>Add a new Student</h2>
            <form onSubmit={createStudent}>
                <label>First Name</label>
                <input
                    type="text" 
                    required 
                    value={firstName}
                    onChange = {(e) => setFirstName(e.target.value)}>
                </input>
                <label>Last Name</label>
                <input
                    type="text"
                    required
                    value={lastName}
                    onChange = {(e) => setLastName(e.target.value)}
                >
                </input>
                <label>Course</label>
                <select value={course}
                onChange={(e) => setCourse(e.target.value)}>
                    <option value="python">PYTHON</option>
                    <option value="java">JAVA</option>
                    <option value="mern">MERN</option>
                    <option value="sql">SQL</option>
                </select>
                <button style={{"backgroundColor" : "blue"}}>Add Student</button>
            </form>
        </div>
    );
}

export default CreateStudent;

// HTML form - JSX
// Input Fields - FIrst name, last name, course etc
// Add or create button when clicked will add a student for us
// click add or create - form submit 
// on my form submit - should send a API request add a student - POST request
// Once student is added, route or navigate back to the list page
// use state properties - save or store your input fields that you collect from users
// routing purposed we are gonna use our react-router-dom
