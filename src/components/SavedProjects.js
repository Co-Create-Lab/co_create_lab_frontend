import React from "react";
import { BiZoomIn } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
export default function SavedProjects({
  saved,
  savedProjects,
  setSavedProjects,
}) {
  const handleDeleteProject = (id) => {
    axiosClient.post(`/users/remove`, { projectId: id }).then(() => {
      const updatedProjects = savedProjects.filter(
        (project) => project._id !== id
      );
      setSavedProjects(updatedProjects);
    });
  };
  return (
    <>
      <div className="container-fluid p-0 mb-3 bg-light">
        <div className="row d-flex align-items-center justify-content-end col-12 col-md-11 mx-auto bg-light rounded fs-5 py-2 shadow-sm">
          <div className="col-12 col-md-10 fs-5 blueText bg-light p-0">
            <Link
              to={`/projects/${saved._id}`}
              className="overview-title bg-light"
            >
              {saved.project_name}
            </Link>
          </div>
          <div className="bg-light col-12 col-md-2 p-0">
            <div className="d-flex bg-light justify-content-around">
              <div className="bg-light">
                <BiZoomIn
                  className="bg-light"
                  size={18}
                  style={{ backgroundColor: "white" }}
                />{" "}
              </div>
              <div className="bg-light">
                <MdDelete
                  size={19}
                  style={{ backgroundColor: "white" }}
                  fill={"dark-red"}
                  className="deleteIcon bg-light"
                  onClick={(e) => {
                    const message = `Remove project "${saved.project_name}" from the bookmark list?`;
                    if (window.confirm(message)) handleDeleteProject(saved._id);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
