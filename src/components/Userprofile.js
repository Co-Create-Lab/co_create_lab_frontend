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

export default function Userprofile({ user, setUser }) {
  const [userProjects, setUserProjects] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get(`/users/profile/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axiosClient
      .get(`/projects/myprojects/${id}`)
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
      <div className="w-100 userprofile">
        <div className="container col-md-5 col-sm-12 mt-4 text-center">
          <h5 className="blueText">Welcome, {user.username}</h5>
        </div>
        <div className="container col-md-5 col-sm-12 mt-2">
          <div className="card mb-3 shadow-sm" style={{ maxwidth: 40 }}>
            <div className="row g-0">
              <div className="col-2 d-flex justify-content-center mt-3">
                <Stack direction="row" className="">
                  {user.username && (
                    <Avatar alt="username" {...stringAvatar(user.username)} />
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
                    {user.username}
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
                    {user.email}
                  </h5>
                  {/* <p className="card-text text-start bg-light">
                  <small className="text-muted bg-light">hi</small>
                </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-sm-12 bg-light mx-auto py-2 rounded-3">
          <div className="d-flex justify-content-between align-items-center bg-light border-bottom ">
            {userProjects !== "" && (
              <h5 className="bg-light blueText ms-3">MY PROJECTS</h5>
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
                <button className="btn signupbutton py-1 me-3" type="button">
                  ADD PROJECT
                </button>
              </Link>
            </h5>
          </div>
          {userProjects.map((project) => {
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
