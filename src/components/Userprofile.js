import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient";
import { IoMdMail } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import Userdetails from "./Userdetails";
import { BiArrowBack } from "react-icons/bi";
import { Avatar } from "@mui/material";
import Stack from "@mui/material/Stack";
import { FiArrowRight } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import Sidebar from "./sidebar";
import Projectdetail from "./Projectdetail";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import { red } from "@mui/material/colors";

export default function Userprofile() {
  const { user, loading } = useContext(AuthContext);
  const [userProjects, setUserProjects] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get(`/projects/myprojects/${user._id}`)
      .then((response) => {
        setUserProjects(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const goBack = () => {
    navigate("/projects");
  };

  // AVATAR
  function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        height: 50,
        width: 50,
        fontSize: "2rem",
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }
  return (
    <>
      <div className="container-fluid userProfile">
        <div className="mt-5 ms-3">
          <Tab.Container
            id="left-tabs-example"
            defaultActiveKey="first"
            className="my-class"
          >
            <Row>
              <Col sm={2}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link
                      className="nav-link"
                      eventKey="first"
                      style={{ backgroundColor: "", color: "#112b3c" }}
                    >
                      Profile
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="second"
                      style={{ backgroundColor: "", color: "#112b3c" }}
                      // style={{ backgroundColor: 'red', color: 'white' }}
                    >
                      Your Projects
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="third"
                      style={{ color: "#112b3c" }}
                      //style={{ backgroundColor: "red", color: "white" }}
                    >
                      Saved Projects
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={8}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <div className="row d-flex align-items-start border border-danger tabsHeight p-3">
                      <div className="col-2 d-flex justify-content-center align-items-center">
                        <Stack direction="row" className="">
                          {user?.username && (
                            <Avatar
                              alt="username"
                              {...stringAvatar(user?.username)}
                            />
                          )}
                        </Stack>
                      </div>
                      <div className="col-10">
                        <div className="card-body ">
                          <h5 className="card-title text-start">
                            {" "}
                            <span className="">
                              {" "}
                              <FaUserCircle size={15} className="me-1" />
                            </span>{" "}
                            {user?.username}
                          </h5>
                          <h5
                            className="card-text text-start mb-1"
                            onClick={() =>
                              (window.location = "mailto:yourmail@domain.com")
                            }
                          >
                            {" "}
                            <span className="">
                              <IoMdMail size={15} className="me-1" />
                            </span>{" "}
                            {user?.email}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    {" "}
                    <div className="tabsHeight border border-danger">
                      <div className="d-flex justify-content-between align-items-start bg-light border-bottom  p-3 ">
                        {userProjects !== "" && (
                          <h5 className="bg-light blueText ms-3">
                            YOUR PROJECTS
                          </h5>
                        )}
                        {userProjects === "" && (
                          <h5 className="bg-light blueText ">
                            Would you like to add a new project?{" "}
                            <span className="bg-light ps-1">
                              {" "}
                              <FiArrowRight className="bg-light" />
                            </span>
                          </h5>
                        )}
                        <h5 className="bg-light">
                          {" "}
                          <Link to="/createproject" className="bg-light">
                            <button
                              className="btn signupbutton py-1"
                              type="button"
                            >
                              ADD PROJECT
                            </button>
                          </Link>
                        </h5>
                      </div>
                      {userProjects?.map((project) => {
                        return (
                          <Userdetails
                            key={project._id}
                            project={project}
                            userProjects={userProjects}
                            setUserProjects={setUserProjects}
                          />
                        );
                      })}
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <div className="tabsHeight border border-info">
                      hi Bookmarks
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>

        <div className="container col-md-5 col-sm-12 ">
          <button
            className="backBtn text-start p-0 my-4"
            type="button"
            onClick={goBack}
          >
            <BiArrowBack size={16} className="me-1" />
            Back to overview
          </button>
        </div>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Your Profile|CoCreateLab</title>
        <link rel="canonical" href="/user/" />
      </Helmet>
    </>
  );
}
