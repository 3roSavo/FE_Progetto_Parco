import { Link } from "react-router-dom"
import logo from "../assets/IMG_2670.PNG"
import { useEffect, useState } from "react"

const NavBar = () => {

  const [userInfo, setUserInfo] = useState({})
  const [isAdmin, setIsAdmin] = useState(false)
  const [isScrolled, setIsScrolled] = useState(0);



  const getUserInfo = () => {
    fetch("http://localhost:3001/users/me", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("Errore nel caricamento del proprio profilo")
        }
      })
      .then((data) => {
        console.log(data)
        setUserInfo(data)
        if (data.role === "ADMIN") {
          setIsAdmin(true)
        } else {
          setIsAdmin(false)
        }

      })
      .catch(err => err)
  }

  useEffect(() => {

    getUserInfo()

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollTop)
    });

  }, [])


  return (

    <nav
      className="navbar navbar-expand-lg p-0 fixed-top"
      id={isScrolled > 100 ? "navbarColored" : "navbarTransparent"}
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
                Homepage <i className="bi bi-house-fill"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/homepage"}
                className="nav-link fw-bold link-navbar"
              >
                Profilo <i className="bi bi-person-fill"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/homepage"}
                className="nav-link fw-bold link-navbar"
              >
                Cerca <i className="bi bi-search-heart-fill"></i>
              </Link>
            </li>
            {isAdmin &&
              <li className="nav-item">
                <Link
                  to={"/homepage"}
                  className="nav-link fw-bold link-navbar"
                >
                  Back-Office <i className="bi bi-gear-fill"></i>
                </Link>
              </li>
            }
          </ul>
          <div className="d-lg-flex d-none  align-items-center">
            <div id="" className="fw-bold text-center">
              {userInfo.username}
            </div>

            <div className="dropdown" data-bs-popper="bottom-start">
              <button className="btn bg-transparent border-0 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={userInfo.userIcon} style={{ width: "45px", borderRadius: "50px" }} alt="user icon" />
              </button>
              <ul className="dropdown-menu navbar-dropdown-container shadow">
                <li id="nav-dropdown-li"><Link className="navbar-dropdown-li-link" to={"/"}>Action</Link></li>
                <li id="nav-dropdown-li"><Link className="navbar-dropdown-li-link" to={"/"}>Another action </Link></li>
                <li id="nav-dropdown-li"><Link className="navbar-dropdown-li-link" to={"/"}>Logout <i className="bi bi-door-open-fill"></i></Link></li>
              </ul>
            </div>



            {/*<Link><img src={userInfo.userIcon} style={{ width: "40px", borderRadius: "50px" }} alt="user icon" />
            </Link>}*/}
          </div>
        </div>
      </div>
    </nav >
  )
}

export default NavBar