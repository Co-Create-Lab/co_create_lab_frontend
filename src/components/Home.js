import { Helmet } from "react-helmet";
import Carousel from "react-bootstrap/Carousel";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { height } from "@mui/system";

export default function Home() {

  const [projects, setProjects] = useState([]);
  const categoriesA = [ 
      {"name": "Games", "img": "https://cdn.pixabay.com/photo/2017/08/07/18/39/xbox-2606608_960_720.jpg"},
      {"name": "Sports", "img":  "https://cdn.pixabay.com/photo/2018/02/06/14/07/ease-3134828_960_720.jpg"},
      {"name": "Business", "img":  "https://cdn.pixabay.com/photo/2015/01/09/11/09/meeting-594091_960_720.jpg"},
      {"name": "Community", "img":  "https://cdn.pixabay.com/photo/2017/06/02/17/47/friendship-2366955_960_720.jpg"},
      {"name": "Social", "img":  "https://cdn.pixabay.com/photo/2013/07/18/15/02/child-164317_960_720.jpg"},
      {"name": "Education", "img":  "https://cdn.pixabay.com/photo/2016/11/29/12/41/desk-1869579_960_720.jpg"},
      {"name": "Culture", "img":  "https://cdn.pixabay.com/photo/2019/11/07/20/48/cinema-4609877_960_720.jpg"},
      {"name": "Media", "img":  "https://cdn.pixabay.com/photo/2017/11/19/23/57/tv-2964103_960_720.jpg"},
      {"name": "Nature", "img":  "https://cdn.pixabay.com/photo/2023/02/05/17/25/leaves-7770035_960_720.jpg"},
      {"name": "Technology", "img": "https://cdn.pixabay.com/photo/2016/03/10/09/24/typewriter-1248088_960_720.jpg" }
  ]

  const categories = ["Games", "Sports","Business","Community","Social","Education", "Culture", "Media", "Nature", "Technology"];

  useEffect( () =>  {
     axios.get("http://localhost:8080/projects")
      .then((response) => {
        setProjects(response.data);
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredProjectsRemote = projects.filter(function (project) {
    return project.location === 'remote'
  })

  const limit = 5
  const filteredProjectsRemoteLimit = filteredProjectsRemote.slice(0, limit).map(item => item)




  return (
    <>
      <div className="home d-flex flex-column align-items-center justify-content-center ">
        <section>Description</section>
        <div className="dark-blue-background">
        <div className="home-categories-dark card-container mx-auto">
          <div className="light-gray-text dark-blue-background">
          <h2 className="light-gray-text pb-4 dark-blue-background text-center">Explore awesome ideas and projects</h2>
          <Row xs={1} md={3} lg={4} xl={5} className="g-4 dark-blue-background mx-auto">
            {categoriesA.map((category) => (
              <Col key={category.name} className="dark-blue-background">
                <Card className="home-card-light shadow-lg">
                  <Card.Body className="home-card-light ">
                    <Card.Title className="dark-blue-text">{category.name}</Card.Title>
                    <div className="home-cardimg">
                    <Card.Img className="" src={category.img}/>
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
        <div className="bg-light w-100">
        <div className="home-categories-light dark-blue-text card-container mx-auto">
          <div className="dark-blue-text bg-light">
           Location
          <h2 className="dark-blue-text pb-4 bg-light">Create remote</h2>
          <Row xs={1} md={3} lg={4} xl={5} className="g-4 bg-light">
            {filteredProjectsRemoteLimit.map((remote) => (
              <Col key={remote._id} className="bg-light">
                <Link to={`/projects/${remote._id}`} >
                <Card className="home-card-dark shadow-lg ">
                  <Card.Body className="home-card-dark ">
                    <Card.Title className="light-gray-text dark-blue-background home-card-title">{remote.project_name}</Card.Title>
                    <div className="home-cardimg dark-blue-background">
                    <Card.Img className="" src="https://cdn.pixabay.com/photo/2020/01/08/03/56/man-4749237_960_720.jpg" />
                    </div>
                    <Card.Text></Card.Text>
                  </Card.Body>
                </Card>
                </Link>
              </Col>
            ))}
          </Row>
          </div>
          </div>

        </div>
        <div className="carousel p-3 d-flex justify-content-center">
          Projects - Remote
          <Carousel>
            <Carousel.Item className="carousel-item">
              <img
                className="w-100  mx-auto"
                src="https://images.unsplash.com/photo-1512314889357-e157c22f938d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3 className="darkBlueText">{filteredProjectsRemote[0]?.project_name}</h3>
                <p>
                  <Link to={`/projects/${filteredProjectsRemote[0]?._id}`}>You wanna see more?</Link> 
                  </p>
                
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="w-100  mx-auto"
                src="https://images.unsplash.com/photo-1589561253898-768105ca91a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
                alt="Second slide"
              />

              <Carousel.Caption>
                <h3 className="darkBlueText">{filteredProjectsRemote[1]?.project_name}</h3>
                <Link to={`/projects/${filteredProjectsRemote[1]?._id}`}>You wanna see more?</Link> 
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className=" w-100  mx-auto"
                src="https://images.unsplash.com/photo-1495291916458-c12f594151e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3 className="darkBlueText">{filteredProjectsRemote[2]?.project_name}</h3>
                <Link to={`/projects/${filteredProjectsRemote[1]?._id}`}>You wanna see more?</Link> 

              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="carousel p-3 d-flex justify-content-center">
          Projects - Latest
          <Carousel>
            <Carousel.Item className="carousel-item">
              <img
                className="w-100  mx-auto"
                src="https://images.unsplash.com/photo-1512314889357-e157c22f938d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3 className="darkBlueText">{filteredProjectsRemote[0]?.project_name}</h3>
                <p>
                  <Link to={`/projects/${filteredProjectsRemote[0]?._id}`}>You wanna see more?</Link> 
                  </p>
                
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="w-100  mx-auto"
                src="https://images.unsplash.com/photo-1589561253898-768105ca91a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
                alt="Second slide"
              />

              <Carousel.Caption>
                <h3 className="darkBlueText">{filteredProjectsRemote[1]?.project_name}</h3>
                <Link to={`/projects/${filteredProjectsRemote[1]?._id}`}>You wanna see more?</Link> 
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className=" w-100  mx-auto"
                src="https://images.unsplash.com/photo-1495291916458-c12f594151e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3 className="darkBlueText">{filteredProjectsRemote[2]?.project_name}</h3>
                <Link to={`/projects/${filteredProjectsRemote[1]?._id}`}>You wanna see more?</Link> 

              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
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
