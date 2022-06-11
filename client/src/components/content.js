import { useState, useEffect } from "react";
import StudentList from "./studentList";
import useGetRequest from "./useGetRequest";

const Content = () => {
    const [searchText, setSearchText] = useState("");

    const deleteHandler = (id) => {
        const list = students.filter(student => student.id != id);
        // setStudents(list);
    };

    const {data: students, isLoading, erroMessage} = useGetRequest('http://localhost:4000/students');

    return (
        <div>
            {isLoading && <div>Loading... Please wait</div>}
            {erroMessage && <div style={{"color" : "red"}}>{erroMessage}</div>}
            {students.length > 0 && <StudentList students={students} header="All Students" deleteHandler={deleteHandler}></StudentList>}
            <br/>
            <label>Search : </label>
            <input
            name='searchText'
            id='searchText'
            type='text'
            value={searchText}
            onChange={e => setSearchText(e.target.value) }
            ></input>
            {searchText && <StudentList students={students.filter((student) => student.course.toLowerCase() === searchText.toLowerCase())} header= {"Search Result - " + searchText} deleteHandler={deleteHandler}></StudentList>}
        </div>
    );
}

export default Content;