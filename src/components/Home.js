import { categoriesImg, remotePics, newestPics } from '../const'
import { Helmet } from "react-helmet";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CardGroup from "react-bootstrap/CardGroup";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { height } from "@mui/system";
import { useParams } from 'react-router-dom';

export default function Home() {
  const [projects, setProjects] = useState([]);

  const { category } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:8080/projects/sort?createdAt=-1")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredProjectsRemote = projects.filter(function (project) {
    return project.location === "remote";
  });
  const limit = 3;
  const filteredProjectsRemoteLimit = filteredProjectsRemote
    .slice(0, limit)
    .map((item) => item);

  const filteredProjectsNewestLimit = projects
    .slice(0, limit)
    .map((item) => item);


  return (
    <>
      <div className="home d-flex flex-column align-items-center justify-content-center ">
        <section>Description</section>
        <div className="dark-blue-background pb-4 pt-3 footershadow">
          <div className="home-categories-dark card-container mx-auto ">
            <div className="light-gray-text dark-blue-background">
              <h2 className="light-gray-text pb-4 dark-blue-background text-center">
                Explore awesome ideas and projects
              </h2>
              <Row
                xs={1}
                md={3}
                lg={4}
                xl={5}
                className="g-5 dark-blue-background d-flex justify-content-center w-100"
              >
                {categoriesImg?.map((category,i) => (
                  <Link className="category-link"
                  to={`/projects/category/${category.name}`}
                  >
                  <Col key={i} className="dark-blue-background">
                    <Card className="home-card-light shadow-lg">
                      <Card.Body className="home-card-light ">
                        <Card.Title className="dark-blue-text">
                          {category.name}
                        </Card.Title>
                        <div className="">
                          <Card.Img
                            className="home-cardimg"
                            src={category.img}
                          />
                        </div>
                        <Card.Text></Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  </Link>
                ))}
              </Row>
            </div>
          </div>
        </div>
          <div className="home-categories-light card-container w-100 ">
            <div className="dark-blue-text light-gray-background">
              <h2 className="dark-blue-text light-gray-background text-center pb-4">
                Remote Co Creation
              </h2>
              <Row
                xs={1}
                md={3}
                lg={4}
                xl={5}
                className="light-gray-background m-0 d-flex justify-content-center"
              >
                {filteredProjectsRemoteLimit.map((remote, i) => (
                  <Col key={i} className="light-gray-background">
                    <Link
                      to={`/projects/${remote._id}`}
                      className="text-decoration-none"
                    >
                      <Card className="home-card-dark shadow-lg ">
                        <Card.Body className="home-card-dark ">
                          <Card.Title className="light-gray-text dark-blue-background home-card-title">
                            {remote.project_name}
                          </Card.Title>
                          <div className=" dark-blue-background">
                            <Card.Img
                              className="home-cardimg"
                              src={remotePics[i]}
                            />
                          </div>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            </div>
        </div>
          <div className="home-categories-dark card-container w-100 footershadow">
            <div className="light-gray-text dark-blue-background">
              <h2 className="light-gray-text dark-blue-background text-center pb-4">
                The latest projects
              </h2>
              <Row
                xs={1}
                md={3}
                lg={4}
                xl={5}
                className="dark-blue-background m-0 d-flex justify-content-center"
              >
                {filteredProjectsNewestLimit.map((newest, i) => (
                  <Col key={i} className="dark-blue-background">
                    <Link
                      to={`/projects/${newest._id}`}
                      className="text-decoration-none"
                    >
                      <Card className="home-card-light shadow-lg">
                        <Card.Body className="home-card-light ">
                          <Card.Title className="dark-blue-text light-gray-background home-card-title ">
                            {newest.project_name}
                          </Card.Title>
                          <div className="light-gray-background">
                            <Card.Img
                              className="home-cardimg"
                              src={newestPics[i]}
                            />
                          </div>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            </div>
          </div>

        <section>STEP BY STEP GUIDE</section>
      </div>

      <Helmet>
        <meta charSet="utf-8" />
        <title>CoCreateLab - HOME</title>
        <link rel="canonical" href="/" />
      </Helmet>
    </>
  );
}
