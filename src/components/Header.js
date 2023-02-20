import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient";
export default function Header({ setShow, newUser }) {
  const navigate = useNavigate();
  const handleShow = () => setShow(true);
  const handleLogout = async () => {
    try {
      const response = await axiosClient.post("/auth/logout");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm container-fluid header headershadow">
        <div className="logo">
          <Link to="/" className="logo">
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
            <div className="logo_text">CO CREATE LAB</div>
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navHeaderContent"
          aria-controls="navHeaderContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse headergroup"
          id="navHeaderContent"
        >
          <div className="headergroup">
            <Link to="/projects" className="">
              View all projects
            </Link>
            <div className="headerbuttongroup">
              <Link to="/">
                <button
                  className="btn loginbutton"
                  type="button"
                  onClick={handleShow}
                >
                  View profile
                </button>
              </Link>
              <Link to="/login">
                <button
                  className="btn loginbutton"
                  type="button"
                  onClick={handleShow}
                >
                  LogIn
                </button>
              </Link>
              <button
                className="btn loginbutton"
                type="button"
                onClick={handleLogout}
              >
                LogOut
              </button>
              <Link to="/signup">
                <button
                  className="btn signupbutton"
                  type="button"
                  onClick={handleShow}
                >
                  SignUp
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
