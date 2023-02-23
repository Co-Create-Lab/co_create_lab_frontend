import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Error from "./components/Error";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Projectdetail from "./components/Projectdetail";
import Allprojects from "./components/Allprojects";
import Userprofile from "./components/Userprofile";
import EditProject from "./components/EditProject";
// import Userdetails from "./components/Userdetails";
import CreateAProject from "./components/CreateAProject";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../src/context/AuthProvider";
import Protected from "./components/Protected";
function App() {
  const [show, setShow] = useState(false);
  const [userA, setUserA] = useState([]);
  const { user, loading, logout } = useContext(AuthContext);
  return (
    <>
      <Header show={show} setShow={setShow} />
      <div className="components">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login show={show} setShow={setShow} />}
          />
          <Route
            path="/signup"
            element={<Signup show={show} setShow={setShow} />}
          />
          <Route path="/projects" element={<Allprojects />} />

          <Route path="/" element={<Protected />}>
            {/* here */}
            <Route path="/profile" element={<Userprofile />} />
            <Route path="/createproject" element={<CreateAProject />} />
            <Route path="/projects/:id" element={<Projectdetail />} />
            <Route path="/editproject/:id" element={<EditProject />} />
            {/* end */}
          </Route>

          {/* <Route path="/usercontact" element={<Userdetails />}></Route> */}
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
