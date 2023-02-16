import { Helmet } from "react-helmet";
import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
export default function Example({ show, setShow }) {
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
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
            <h1 className="m-0 text-center">
              <Modal.Title className="m-0">Log in</Modal.Title>
            </h1>{" "}
            <p className="text-center loginTextLink">
              Don't have an account?{" "}
              <Link to="/signup" className="loginTextLink">
                Join Now
              </Link>
            </p>
            <Form>
              <Form.Group
                className="mt-4 mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="email"
                  className="p-1"
                  placeholder="Email"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="password"
                  className="p-1"
                  placeholder="Password"
                />
              </Form.Group>
            </Form>
            <div className="text-end loginTextLink">
              <Link to="/signup" className="loginTextLink">
                Forgot password?
              </Link>
            </div>
            <button
              className="btn signupbutton w-100 p-1 mt-3"
              type="button"
              onClick={handleClose}
            >
              LOGIN
            </button>
          </Modal.Body>
        </Modal>
        <Helmet>
          <meta charSet="utf-8" />
          <title>LogIn|CoCreateLab</title>
          <link rel="canonical" href="/login" />
        </Helmet>
      </div>
    </>
  );
}
