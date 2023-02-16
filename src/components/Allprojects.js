import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import axios from 'axios';
import dateFormat, { masks } from "dateformat";


export default function Allprojects () {

const [projects, setProjects] = useState([]);

useEffect(() => {
    axios
      .get("http://localhost:8080/projects")
      .then((response) => {
        setProjects(response.data);
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


    return(
        <>
        <div className="allprojects container-fluid">
            <div className="row">
                <div className="col-4">
                    <div className="allprojectsfilter">

                    </div>
                </div>
                <div className="col-8">
                {projects?.map((project) => {
                    return <div key={project._id} className="projectoverview">
                        <h3>{project.project_name}</h3>
                        <div className="projectoverviewdetails">
                            <div>posted at: {dateFormat(project.createdAt, "d. mmmm yyyy")}</div>
                            <div>location: {project.location}</div>
                            {project.start_date.toLowerCase() === 'open' && (
                            <div> start date: open</div>
                            )}
                            {project.start_date.toLowerCase() !== 'open' && (
                            // <div> start date: {dateFormat(project.start_date, "d. mmmm yyyy")}</div>
                            <div>start date: not set</div>
                            )}
                        </div>
                    </div>
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
    )
}