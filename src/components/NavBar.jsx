import { Link } from "react-router-dom"
import logo from "../assets/parco-colli-euganei-logo.jpg"

const NavBar = () => {


  return (

    <nav
      className="navbar navbar-expand-lg shadow p-0"
      id="navbar"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src={logo}
            style={{ width: "100px", height: "65px", borderRadius: "15px" }}
            alt="logo"
          />
        </a>
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to={"/homepage"}
                className="nav-link fw-bold link-navbar"
              >
                Homepage <i class="bi bi-house-fill"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/homepage"}
                className="nav-link fw-bold link-navbar"
              >
                Profilo <i class="bi bi-person-fill"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/homepage"}
                className="nav-link fw-bold link-navbar"
              >
                Cerca <i class="bi bi-search-heart-fill"></i>
              </Link>
            </li>
          </ul>
          <div className="d-lg-flex d-none  align-items-center">
            <div id="kids" className="fw-bold">
              KIDS
            </div>
            <a className="nav-link" href="#"><img src="" alt="user icon" /> </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar