import { Helmet } from "react-helmet";
import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function Example({ show, setShow }) {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();
  const handleShow = () => {
    setShow(true);
  };
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };
  const handleClose = () => {
    setShow(false);
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    try {
      axiosClient
        .post("/auth/login", {
          ...loginData,
        })
        .then((res) => {
          setLoginUser(res.data);
          navigate(`/profile/${res.data.id}`);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="loginPage d-flex justify-content-center align-items-center">
        <Link to="/login">
          <button
            className="btn signupbutton"
            type="button"
            onClick={handleShow}
          >
            LOGIN
          </button>
        </Link>
      </div>

      <Modal
        className="pt-5 modBot"
        show={show}
        onHide={handleClose}
        size="sm"
        backdrop="static"
        animation={false}
      >
        <Modal.Header closeButton className="bg-light">
          <div className="bg-light">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              fill="currentColor"
              className="bi bi-share-fill logo_icon bg-light"
              viewBox="0 0 16 16"
            >
              <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z" />
            </svg>
          </div>
          <div className="ms-2 logo_text bg-light">CO CREATE LAB</div>
        </Modal.Header>

        <Modal.Body className="mb-1 bg-light">
          <Modal.Title className="text-center mb-1 blueText bg-light">
            LogIn
          </Modal.Title>
          <p className="text-center loginTextLink bg-light">
            Don't have an account?{" "}
            <Link to="/signup" className="loginTextLink bg-light">
              SignUp
            </Link>
          </p>
          <Form className="bg-light">
            <Form.Group className="mt-4 mb-1 bg-light">
              <Form.Label className="mb-1 loginTextLink bg-light">
                Email address
              </Form.Label>
              <Form.Control
                type="email"
                className="p-1 bg-light"
                placeholder="Email"
                name="email"
                autoFocus
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-1 bg-light">
              <Form.Label className="mb-1 loginTextLink bg-light">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                className="p-1 bg-light"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
          <div className="text-end loginTextLink bg-light">
            <Link to="/signup" className="loginTextLink bg-light">
              Forgot password?
            </Link>
          </div>
          <button
            className="btn signupbutton w-100 mt-3"
            type="submit"
            onClick={handleSubmit}
          >
            LogIn
          </button>
        </Modal.Body>
      </Modal>

      <Helmet>
        <meta charSet="utf-8" />
        <title>LogIn|CoCreateLab</title>
        <link rel="canonical" href="/login" />
      </Helmet>
    </>
  );
}
