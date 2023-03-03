import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { alikePics } from "../const";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { BiBarChart } from "react-icons/bi";
import { BsHeartFill } from "react-icons/bs";
import Popover from "react-bootstrap/Popover";

export default function AikeProjects() {
  const { projects, setProjects, user } = useContext(AuthContext);

  // const randomizeIndex = (count) => {
  //     return Math.floor(count * Math.random());
  // };

  // const randomizeElements = (array, count) => {
  //     if (count > projects.length) {
  //         return '3';
  //     }
  //     const result = [];
  //     const guardian = new Set();
  //     while (result.length < count) {
  //         const index = randomizeIndex(count);
  //         if (guardian.has(index)) {
  //             continue;
  //         }
  //         const element = projects[index];
  //         guardian.add(index);
  //         result.push(element);
  //     }
  //     return result;
  // };

  // const element = randomizeElements(projects, 3);

  const nums = new Set();
  while (nums.size !== 6) {
    nums.add(Math.floor(Math.random() * alikePics.length));
  }
  const uniNums = [...nums];

  const sharePopover = (
    <Popover id="share-popover" className="share-body">
      <Popover.Body className="share-body dark-blue-background">
        <div>
          <div className="dark-blue-background light-gray-text pb-2 ">
            Share your favorite project <br></br>
          </div>
          <input
            type="text"
            className="form-control share-input ps-1 dark-blue-background  rounded-0"
            value="https://co-create-lab/projects/873463903748435623908"
          ></input>
        </div>
        <button
          type="button"
          className="btn share-button mt-2"
          onClick={() => {
            navigator.clipboard.writeText(
              "https://co-create-lab/projects/873463903748435623908"
            );
          }}
        >
          Copy
        </button>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="likeprojects dark-blue-background">
      <div className="likeprojects-categories-dark card-container w-100 footershadow dark-blue-background">
        <div className="light-gray-text dark-blue-background">
          <h2 className="light-gray-text dark-blue-background text-center pb-4">
            You also may like
          </h2>

          <Row
            xs={1}
            md={3}
            lg={4}
            xl={5}
            className="g-4 dark-blue-background m-0 d-flex justify-content-center"
          >
            {projects.map((project, i) => (
              <Col key={i} className="dark-blue-background">
                <a
                  href={`/projects/${project._id}`}
                  className="text-decoration-none"
                >
                  <Card className="home-card-light shadow-lg">
                    <Card.Body className="home-card-light ">
                      <Card.Title className="dark-blue-text light-gray-background home-card-title ">
                        {project.project_name}
                      </Card.Title>
                      <Card.Text className="d-flex justify-content-evenly mb-0 pt-1">
                        <OverlayTrigger
                          placement="top"
                          className="bg-light"
                          overlay={
                            <Tooltip id="create_tooltip" className="tooltip">
                              Views
                            </Tooltip>
                          }
                        >
                          <button className="position-relative view-icon">
                            <span className="position-absolute top-0 start-100 translate-middle badge view-icon-text">
                              {project.views}
                              <span className="visually-hidden">views</span>
                            </span>
                            <BiBarChart
                              size={20}
                              className=""
                              style={{
                                fill: "#112b3c",
                              }}
                            />
                          </button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          placement="top"
                          className=""
                          overlay={
                            <Tooltip id="create_tooltip" className="tooltip">
                              Likes
                            </Tooltip>
                          }
                        >
                          <button className="position-relative view-icon">
                            <span className="position-absolute top-0 start-100 translate-middle badge view-icon-text">
                              {project.likes?.length}
                              <span className="visually-hidden">likes</span>
                            </span>
                            <BsHeartFill
                              size={17}
                              style={{
                                fill: "#112b3c",
                              }}
                            />
                          </button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          trigger="click"
                          placement="left"
                          overlay={sharePopover}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            fill="currentColor"
                            className="bi bi-share-fill share-icon"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z" />
                          </svg>
                        </OverlayTrigger>
                      </Card.Text>
                      <div className="light-gray-background">
                        <Card.Img
                          className="home-cardimg"
                          src={alikePics[uniNums[i]]}
                        />
                      </div>
                    </Card.Body>
                  </Card>
                </a>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}
