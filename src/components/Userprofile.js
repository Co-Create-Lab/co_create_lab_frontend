import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { BiZoomIn } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { Avatar } from "@mui/material";
import Stack from "@mui/material/Stack";
import axiosClient from "../axiosClient";

export default function Userprofile() {
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axiosClient
      .get(`http://localhost:8080/users/profile/${id}`)
      .then((response) => {
        setUser(response.data);
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
        <div className="container col-md-5 col-sm-12 my-3">
          <div className="card mb-3" style={{ maxwidth: 40 }}>
            <div className="row g-0 rounded-3 bg-light">
              <div className="col-2 d-flex justify-content-center mt-3 bg-light ">
                <Stack direction="row" className=" bg-light">
                  {user.username && (
                    <Avatar alt="username" {...stringAvatar(user.username)} />
                  )}
                </Stack>
              </div>
              <div className="col-9">
                <div className="card-body bg-light">
                  <h5 className="card-title text-start bg-light">
                    {" "}
                    <span className=" bg-light">
                      {" "}
                      <FaUserCircle size={15} className="me-1 bg-light" />
                    </span>{" "}
                    {user.username}
                  </h5>
                  <h5
                    className="card-text text-start bg-light mb-1"
                    onClick={() =>
                      (window.location = "mailto:yourmail@domain.com")
                    }
                  >
                    {" "}
                    <span className="bg-light">
                      <IoMdMail size={15} className="me-1 bg-light" />
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
        <div className="container col-md-5 col-sm-12 text-end m-o">
          <button className="btn loginbutton"> </button>
        </div>
        <div className="col-md-5 col-sm-12 bg-light mx-auto py-2 border rounded-3">
          <div className="d-flex justify-content-between align-items-center bg-light border-bottom mx-2">
            <h5 className="bg-light blueText">MY PROJECTS</h5>
            <h5>
              {" "}
              <Link to="/createproject">
                <button className="btn signupbutton py-1" type="button">
                  ADD PROJECT
                </button>
              </Link>
            </h5>
          </div>
          {/* {projects.map((one) => {
            return (
              <div
                key={one._id}
                className="d-flex justify-content-between border-bottom m-2 bg-light"
              >
                <div className="bg-light">{one.email}</div>
                <div className="bg-light">
                  <BiZoomIn size={19} style={{ backgroundColor: "white" }} />
                  <FiEdit
                    size={18}
                    style={{ backgroundColor: "white" }}
                    className="ms-2"
                  />
                  <MdDelete
                    size={19}
                    style={{ backgroundColor: "white" }}
                    fill={"dark-red"}
                    className="ms-2"
                  />{" "}
                </div>
              </div>
            );
          })} */}
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
