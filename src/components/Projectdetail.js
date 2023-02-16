import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

export default function Projectdetail () {

const { _id } = useParams();

const [projectdetail, setProjectdetail] = useState([])

useEffect(() => {
    axios
      .get(`http://localhost:8080/projects/${_id}`)
      .then((response) => {
        setProjectdetail(response.data);
        console.log(response.data);

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

    return(
        <>
        <div className="projectdetail">
            <h1>{projectdetail.project_name}</h1>
            <div></div>
        </div>

        <Helmet>
            <meta charSet="utf-8" />
            <title>Project|CoCreateLab</title>
            <link rel="canonical" href="/projects/" />
        </Helmet>
        </>
    )
}