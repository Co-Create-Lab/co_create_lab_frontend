import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import dateFormat, { masks } from "dateformat";
import { Link } from "react-router-dom";
import Filterprojects from "./Filterprojects";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import axiosClient from "../axiosClient";

export default function Allprojects() {
  const { projects, setProjects } = useContext(AuthContext);
  const [views, setViews] = useState("");

  // const handleView = async () => {
  //   try {
  //     axiosClient.put(`/projects/views/`).then((res) => {
  //       console.log(res.data);
  //       setViews(res.data);
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      <div className=" container-fluid mx-auto">
        <div className="row mt-2">
          <div className="col-sm-3 pe-lg-5 ms-4">
            <Filterprojects setProjects={setProjects} />
          </div>
          <div className="col-sm-8">
            {projects?.map((project) => {
              return (
                <div
                  key={project._id}
                  className="bg-light projectoverview shadow-sm container"
                >
                  <div className="row bg-light">
                    <h3 className="bg-light blueText col-sm-9">
                      {project.project_name}
                    </h3>

                    <div className="col-sm-2 bg-light mt-2">
                      <Link to={`/projects/${project._id}`}>
                        <button
                          onClick={() => {
                            try {
                              axiosClient
                                .post(`/projects/view`, {
                                  id: project._id,
                                })
                                .then((res) => {
                                  setViews(res.data);
                                });
                            } catch (error) {
                              console.error(error);
                            }
                          }}
                          className="btn detailsbutton bg-light"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="bi bi-zoom-in projectoverviewicon bg-light"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                            />
                            <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z" />
                            <path
                              fillRule="evenodd"
                              d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z"
                            />
                          </svg>
                          Details
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="container">
                    <div className="row bg-light">
                      <div className="bg-light col-sm-6">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="bi bi-pencil-square projectoverviewicon bg-light"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fillRule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>
                        {dateFormat(project.createdAt, "d. mmmm yyyy")}
                      </div>
                      {project.start_date.toLowerCase() === "open" && (
                        <div className="col-sm-6 bg-light">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="bi bi-calendar2-plus projectoverviewicon bg-light"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                            <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4zM8 8a.5.5 0 0 1 .5.5V10H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V11H6a.5.5 0 0 1 0-1h1.5V8.5A.5.5 0 0 1 8 8z" />
                          </svg>
                          open
                        </div>
                      )}
                      {project.start_date.toLowerCase() !== "open" && (
                        <div className="col-sm-6 bg-light">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="bi bi-calendar2-plus projectoverviewicon bg-light"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                            <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4zM8 8a.5.5 0 0 1 .5.5V10H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V11H6a.5.5 0 0 1 0-1h1.5V8.5A.5.5 0 0 1 8 8z" />
                          </svg>
                          {dateFormat(project.start_date, "d. mmmm yyyy")}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="container">
                    <div className="row projectdetails_row bg-light">
                      <div className="col-sm-6 bg-light">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="bi bi-geo-alt-fill projectoverviewicon bg-light"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                        </svg>
                        {project.location}
                      </div>
                      <div className="col-sm-4 bg-light">
                        <div className="allprojects_categories bg-light">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="bi bi-tags-fill projectoverviewicon bg-light"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                            <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z" />
                          </svg>

                          {project.categories.length === 1 && (
                            <div className="bg-light">
                              {}
                              {project.categories[0]}
                            </div>
                          )}
                          {project.categories.length === 2 && (
                            <div className="bg-light">
                              {}
                              {project.categories[0]}, {project.categories[1]}
                            </div>
                          )}
                          {project.categories.length >= 3 && (
                            <div className="bg-light">
                              {}
                              {project.categories[0]}, {project.categories[1]},{" "}
                              {project.categories[2]}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6 bg-light"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Projects|CoCreateLab</title>
        <link rel="canonical" href="/projects" />
      </Helmet>
    </>
  );
}
