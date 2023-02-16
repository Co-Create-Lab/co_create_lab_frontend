import { Link, NavLink } from "react-router-dom";

export default function Header() {


  return (
    <>
    
      <nav className="navbar navbar-expand-sm container-fluid header headershadow">
        <div className="logo">
          <Link to="/"  className="logo">
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
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse headergroup" id="navbarSupportedContent">
            <div className="headergroup">
            <div>View all projects</div>
            <div className="headerbuttongroup">
                <button className="btn loginbutton" type="button">
                LogIn
                </button>
                <button className="btn signupbutton" type="button">
                SignUp
                </button>
            </div>
            </div>
        </div>
    </nav>

    </>
  );
}
