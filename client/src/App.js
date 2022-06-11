import Content from "./components/content";
import Navbar from "./components/navbar";
import css from "./App.css"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import StudentDetails from "./components/studentDetails";
import CreateStudent from "./components/StudentCreate";

function App() {
  return (
    <Router>
    <div>
        <Navbar></Navbar>
        <Routes>
          <Route path="/create" element={<CreateStudent></CreateStudent>}></Route>
          <Route path="/list" element={<Content></Content>}></Route>
          <Route path="/" element={<div><h1>Welcome Page. Please Select list to view student or click create new to create students</h1></div>}></Route>
          <Route path="/students/:id" element = {<StudentDetails></StudentDetails>}></Route>
        </Routes>
    </div>
    </Router>
  );
}

export default App;

// New Component - StudentDetails Component
// Configure routes for this new Component
// Link or navigation to this details page when I click the student 
// Add code for your student details
// I need go get data for individual - Earlier Student List - Now we need Single student data
// I need to somehow have a way of passing the student id so that I can retrieve
// Clean up and I need to move delete functional to the details page
