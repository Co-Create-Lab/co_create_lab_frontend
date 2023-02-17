import { Helmet } from "react-helmet";
import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { FormCheck } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Example({ show, setShow }) {
  const handleShow = () => {
    setShow(true);
  };
  const [userData, setUserData] = useState({
    first_name: "",
    username: "",
    email: "",
    password: "",
  });
  const [user, setUser] = useState("");
  const navigation = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = async (e) => {
    setShow(false);

    e.preventDefault();
    await axios
      .post("http://localhost:8080/user", {
        ...userData,
      })
      .then((res) => {
        setUser(res.data);
        navigation(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="loginPage d-flex justify-content-center align-items-center">
        <Link to="/signup">
          <button
            className="btn signupbutton"
            type="button"
            onClick={handleShow}
          >
            Create your account
          </button>
        </Link>
      </div>
      <div>
        <Modal
          className="pt-5"
          show={show}
          onHide={handleClose}
          size="sm"
          backdrop="static"
          animation={false}
        >
          <Modal.Header closeButton>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                fill="currentColor"
                className="bi bi-share-fill logo_icon"
                viewBox="0 0 16 16"
              >
                <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z" />
              </svg>
            </div>
            <div className="ms-2 logo_text">CO CREATE LAB</div>
          </Modal.Header>

          <Modal.Body>
            <Modal.Title className="text-center mb-1 loginFormText">
              Create your account
            </Modal.Title>
            <p className="text-center loginTextLink">
              Already have an account?{" "}
              <Link to="/login" className="loginTextLink">
                Login
              </Link>
            </p>
            <Form>
              <Form.Group className="my-2">
                <Form.Control
                  type="text"
                  className="p-1"
                  placeholder="Name"
                  name="first_name"
                  autoFocus
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control
                  type="text"
                  className="p-1"
                  placeholder="Username"
                  name="username"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control
                  type="email"
                  className="p-1"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control
                  type="password"
                  className="p-1"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <FormCheck
                  type="checkbox"
                  label="Subscribe to our newsletter"
                  className="loginTextLink"
                />
              </Form.Group>
            </Form>
            <button
              className="btn signupbutton w-100 p-1 mt-3"
              type="button"
              onClick={handleClose}
            >
              SIGN UP
            </button>
          </Modal.Body>
        </Modal>
        <Helmet>
          <meta charSet="utf-8" />
          <title>SignUp|CoCreateLab</title>
          <link rel="canonical" href="/signup" />
        </Helmet>
      </div>
    </>
  );
}
