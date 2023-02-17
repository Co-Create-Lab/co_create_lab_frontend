import { Helmet } from "react-helmet";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";
import Toast from "react-bootstrap/Toast";

export default function CreateAProject() {
  const [project_name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [locationHelper, setLocationHelper] = useState("remote");
  const [location, setLocation] = useState("remote");
  const [startDateHelper, setStartDateHelper] = useState("open");
  const [start_date, setStartDate] = useState("open");
  const [tech_stack, setTechStack] = useState("");
  const [categories, setCategory] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const handleOnChangeName = (e) => {
    setName(e.target.value);
  };

  const handleOnChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleOnChangeLocation = (e) => {
    setLocationHelper(e.target.value);
  };

  const handleOnChangeCity = (e) => {
    setLocation(e.target.value);
  };

  const handleOnChangeStartDate = (e) => {
    setStartDateHelper(e.target.value);
  };

  const handleOnChangeSpecificDate = (e) => {
    setStartDate(`${e.target.value}T00:42:15.714Z`);
  };

  const handleOnChangeTechStack = (e) => {
    setTechStack(e.target.value);
  };

  const onSelectedOptionsChange = (e) => {
    setCategory(
      [].slice.call(e.target.selectedOptions).map((item) => item.value)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/projects", {
        project_name,
        description,
        categories,
        location,
        start_date,
        tech_stack,
      })
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        document.getElementById("createAProject").reset();
        setShowAlert(true);
      });
  };

  return (
    <>
      <h1>Add your Project Idea to CoCreateLab</h1>
      <div className="create_project">
        <Form onSubmit={handleSubmit} id="createAProject">
          <Row className="mb-3">
            <Form.Group controlId="projectname">
              <Form.Label>
                Project Name
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="bi bi-question-circle questionmarkicon"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                </svg>
              </Form.Label>
              <Form.Control
                onChange={handleOnChangeName}
                required
                placeholder="Add a catchy project name"
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              placeholder="Describe your awesome idea"
              as="textarea"
              rows={5}
              required
              onChange={handleOnChangeDescription}
            />
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Select
                aria-label="location"
                onChange={handleOnChangeLocation}
              >
                <option value="remote">Remote</option>
                <option value="onsite">Onsite</option>
              </Form.Select>
            </Form.Group>

            {locationHelper === "onsite" && (
              <Form.Group as={Col} controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control onChange={handleOnChangeCity} />
              </Form.Group>
            )}
          </Row>

          <Row className="mb-3">
            <Form.Group className="mb-3" as={Col} controlId="start_date">
              <Form.Label>Project Start</Form.Label>
              <Form.Select
                aria-label="Location"
                onChange={handleOnChangeStartDate}
              >
                <option value="open">Open</option>
                <option value="specific date">Specific Date</option>
              </Form.Select>
            </Form.Group>

            {startDateHelper === "specific date" && (
              <Form.Group as={Col} controlId="specific_start_date">
                <Form.Label>Choose a date</Form.Label>
                <Form.Control
                  type="date"
                  onChange={handleOnChangeSpecificDate}
                ></Form.Control>
              </Form.Group>
            )}
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="tech_stack">
              <Form.Label>Tech Stack</Form.Label>
              <Form.Control
                placeholder="Which skills are required?"
                onChange={handleOnChangeTechStack}
                as="textarea"
                rows={9}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="categories">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                multiple
                value={categories}
                onChange={onSelectedOptionsChange}
                required
                className="input_categories"
              >
                <option value="Games" className="option">
                  Games
                </option>
                <option value="Sports" className="option">
                  Sports
                </option>
                <option value="Business" className="option">
                  Business
                </option>
                <option value="Community" className="option">
                  Community
                </option>
                <option value="Social" className="option">
                  Social
                </option>
                <option value="Education" className="option">
                  Education
                </option>
                <option value="Culture" className="option">
                  Culture
                </option>
                <option value="Media" className="option">
                  Media
                </option>
                <option value="Nature" className="option">
                  Nature
                </option>
              </Form.Control>
            </Form.Group>
          </Row>

          {showAlert === true && (
            <Toast 
            onClose={() => setShowAlert(false)}
            >
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">Bootstrap</strong>
                <small>11 mins ago</small>
              </Toast.Header>
              <Toast.Body>
                Woohoo, you're reading this text in a Toast!
              </Toast.Body>
            </Toast>
          )}

          <Button variant="primary" type="submit" className="btn submitbutton">
            Submit
          </Button>
          <Button type="reset" value="Reset" className="btn submitbutton">
            Reset
          </Button>
        </Form>
      </div>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Create A Project|CoCreateLab</title>
        <link rel="canonical" href="/createproject" />
      </Helmet>
    </>
  );
}
