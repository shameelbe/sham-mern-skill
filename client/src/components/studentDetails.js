import { useNavigate, useParams } from "react-router-dom";
import useGetRequest from "./useGetRequest";

const StudentDetails = () =>
{
    // UseParams
    const { id } = useParams();
    const {data: student, isLoading, erroMessage} = useGetRequest('http://localhost:4000/students/'+id);
    const navigate = useNavigate();

    const deleteStudent = () => {
        fetch('http://localhost:4000/students/' + student._id, {
            method: 'DELETE'
        }).then(() => {
            navigate('/list');
        });
    }

    return (
        <div className="student-details" style={{"padding" : "20px"}}>
            <br></br>
            {isLoading && <div>Loading... Please wait</div>}
            {erroMessage && <div style={{"color" : "red"}}>{erroMessage}</div>}
            { student && (
                <article>
                    <h2>{student.firstName} {student.lastName}</h2>
                    <p>Enrolled to {student.course}</p>
                    <br></br>
                    <button onClick={deleteStudent} style={{"color":"red"}}>Delete</button>
                </article>
            )}
        </div>
    );

};

export default StudentDetails;

// Delete FUnctionailty
// Create Button on my UI for delete
// Delete Handler - method - onclick - delete my student
// Delete a student - send back end request - DELETE HTTP
// Navigate back to the List page

