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

export default function Home() {
  const [projects, setProjects] = useState([]);
  const categories = [
    {
      name: "Games",
      img: "https://cdn.pixabay.com/photo/2017/08/07/18/39/xbox-2606608_960_720.jpg",
    },
    {
      name: "Sports",
      img: "https://cdn.pixabay.com/photo/2018/02/06/14/07/ease-3134828_960_720.jpg",
    },
    {
      name: "Business",
      img: "https://cdn.pixabay.com/photo/2015/01/09/11/09/meeting-594091_960_720.jpg",
    },
    {
      name: "Community",
      img: "https://cdn.pixabay.com/photo/2017/06/02/17/47/friendship-2366955_960_720.jpg",
    },
    {
      name: "Social",
      img: "https://cdn.pixabay.com/photo/2013/07/18/15/02/child-164317_960_720.jpg",
    },
    {
      name: "Education",
      img: "https://cdn.pixabay.com/photo/2016/11/29/12/41/desk-1869579_960_720.jpg",
    },
    {
      name: "Culture",
      img: "https://cdn.pixabay.com/photo/2019/11/07/20/48/cinema-4609877_960_720.jpg",
    },
    {
      name: "Media",
      img: "https://cdn.pixabay.com/photo/2017/11/19/23/57/tv-2964103_960_720.jpg",
    },
    {
      name: "Nature",
      img: "https://cdn.pixabay.com/photo/2023/02/05/17/25/leaves-7770035_960_720.jpg",
    },
    {
      name: "Technology",
      img: "https://cdn.pixabay.com/photo/2020/08/09/14/25/business-5475663_960_720.jpg",
    },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:8080/projects/sort?createdAt=-1")
      .then((response) => {
        setProjects(response.data);
        console.log(response.data);
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

  const remotePics = [
    "https://cdn.pixabay.com/photo/2020/01/08/03/56/man-4749237_960_720.jpg",
    "https://cdn.pixabay.com/photo/2017/02/10/16/16/laptop-2055522_960_720.jpg",
    "https://cdn.pixabay.com/photo/2021/01/21/15/46/laptop-5937691_960_720.jpg",
    "https://cdn.pixabay.com/photo/2021/02/10/08/20/devices-6001296_960_720.jpg",
    "https://cdn.pixabay.com/photo/2021/06/13/08/29/laptop-6332600_960_720.jpg",
  ];

  const filteredProjectsNewestLimit = projects
    .slice(0, limit)
    .map((item) => item);

  const newestPics = [
    "https://cdn.pixabay.com/photo/2018/01/16/05/56/idea-3085367_960_720.jpg",
    "https://cdn.pixabay.com/photo/2016/11/29/07/30/adult-1868109_960_720.jpg",
    "https://cdn.pixabay.com/photo/2017/11/12/22/50/exhibition-2944064_960_720.jpg",
    "https://cdn.pixabay.com/photo/2017/08/11/10/54/industry-2630319_960_720.jpg",
    "https://cdn.pixabay.com/photo/2012/03/01/01/42/hands-20333_960_720.jpg",
  ];

  return (
    <>
      <div className="home d-flex flex-column align-items-center justify-content-center ">
        <section>Description</section>
        <div className="dark-blue-background pb-4 pt-3">
          <div className="home-categories-dark card-container mx-auto">
            <div className="light-gray-text dark-blue-background">
              <h2 className="light-gray-text pb-4 dark-blue-background text-center">
                Explore awesome ideas and projects
              </h2>
              <Row
                xs={1}
                md={3}
                lg={4}
                xl={5}
                className="g-4 dark-blue-background d-flex justify-content-center w-100"
              >
                {categories.map((category) => (
                  <Col key={category.name} className="dark-blue-background">
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
                ))}
              </Row>
            </div>
          </div>
        </div>
          <div className="home-categories-light card-container w-100">
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
                  <Col key={remote._id} className="light-gray-background">
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
          <div className="home-categories-dark card-container w-100">
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
