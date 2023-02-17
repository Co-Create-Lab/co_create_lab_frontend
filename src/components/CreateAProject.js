import { Helmet } from "react-helmet";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useState } from "react";

export default function CreateAProject() {
  const [location, setLocation] = useState("remote");
  const [startDate, setStartDate] = useState("open");
  const [category, setCategory] = useState([]);

  const handleOnChangeName = (e) => {
    console.log(e.target.value);
  };

  const handleOnChangeDescription = (e) => {
    console.log(e.target.value);
  };

  const handleOnChangeLocation = (e) => {
    console.log(e.target.value);
    setLocation(e.target.value);
  };

  const handleOnChangeStartDate = (e) => {
    console.log(e.target.value);
    setStartDate(e.target.value);
  };

  const handleOnChangeCity = (e) => {
    console.log(e.target.value);
  };

  const handleOnChangeSpecificDate = (e) => {
    console.log(e.target.value);
  };

  const handleOnChangeTechStack = (e) => {
    console.log(e.target.value);
  };

  const onSelectedOptionsChange = (e) => {
    setCategory(
      [].slice.call(e.target.selectedOptions).map((item) => item.value)
    );
    console.log(category);
  };

  return (
    <>
      <h1>Add your Project Idea to CoCreateLab</h1>
      <div className="create_project">
        <Form>
          <Row className="mb-3">
            <Form.Group controlId="projectname">
              <Form.Label>Project Name</Form.Label>
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

            {location === "onsite" && (
              <Form.Group as={Col} controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control onChange={handleOnChangeCity} />
              </Form.Group>
            )}
          </Row>

          <Row className="mb-3">
            <Form.Group className="mb-3" as={Col} controlId="start_date">
              <Form.Label>Start Date</Form.Label>
              <Form.Select
                aria-label="Location"
                onChange={handleOnChangeStartDate}
              >
                <option value="open">Open</option>
                <option value="specific date">Specific Date</option>
              </Form.Select>
            </Form.Group>

            {startDate === "specific date" && (
              <Form.Group as={Col} controlId="specific_start_date">
                <Form.Label>Specific Start Date</Form.Label>
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
              />
            </Form.Group>
          </Row>

          <Form.Group as={Col} controlId="categories">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              multiple
              value={category}
              onChange={onSelectedOptionsChange}
              required
              className="input_categories"
            >
              <option value="Games">Games</option>
              <option value="Sports">Sports</option>
              <option value="Business">Business</option>
              <option value="Community">Community</option>
              <option value="Social">Social</option>
              <option value="Education">Education</option>
              <option value="Culture">Culture</option>
              <option value="Media">Media</option>
              <option value="Nature">Nature</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit" className=" btn submitbutton">
            Submit
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
