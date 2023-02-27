import { Helmet } from "react-helmet";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { BiZoomIn } from "react-icons/bi";
import { useState } from "react";
import axiosClient from "../axiosClient";
import { Link } from "react-router-dom";
import EditProject from "./EditProject";

export default function Userdetails({
  project,
  userProjects,
  setUserProjects,
}) {
  const [show, setShow] = useState(false);
  const [isClickedEdit, setIsClickedEdit] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
  const deleteProject = (id, e) => {
    axiosClient.delete(`projects/${id}`).then((res) => {
      const deletedProject = userProjects.filter((pro) => pro._id !== id);
      setUserProjects(deletedProject);
    });
  };

  const handleEditPage = () => {
    setIsClickedEdit(!isClickedEdit);
  };

  return (
    <>
      <div className="container mx-auto border-bottom m-2 bg-light ">
        <div className="row mx-auto">
          <div className="col-10 bg-light p-0">{project.project_name}</div>
          <div className="bg-light col-2 p-0">
            <div className="d-flex bg-light justify-content-around">
              <div className="bg-light">
                <Link to={`/projects/${project._id}`}>
                  <BiZoomIn
                    onClick={handleShow}
                    className="bg-light"
                    size={19}
                    style={{ backgroundColor: "white" }}
                  />
                </Link>
              </div>
              <div className="bg-light">
                <FiEdit
                  className="bg-light"
                  size={18}
                  style={{ backgroundColor: "white" }}
                  onClick={handleEditPage}
                />
              </div>
              <div className="bg-light">
                <MdDelete
                  onClick={(e) => {
                    if (
                      window.confirm(
                        `Delete this project "${project.project_name}"?`
                      )
                    )
                      deleteProject(project._id, e);
                  }}
                  size={19}
                  style={{ backgroundColor: "white" }}
                  fill={"dark-red"}
                  className="deleteIcon bg-light"
                />{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container ">
        {isClickedEdit && (
          <EditProject
            project={project}
            isClickedEdit={isClickedEdit}
            setIsClickedEdit={setIsClickedEdit}
          />
        )}
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Contact a creator|CoCreateLab</title>
        <link rel="canonical" href="/user/contact" />
      </Helmet>
    </>
  );
}
