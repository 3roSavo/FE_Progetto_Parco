import { Link } from "react-router-dom"
import logo from "../assets/IMG_2670.PNG"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const NavBar = () => {

  const dispach = useDispatch();
  const getUser = useSelector(state => state.currentUser)


  //const [userInfo, setUserInfo] = useState({})  // succesivamente rimpiazzato dal global state
  //const [isAdmin, setIsAdmin] = useState(false)  // ho già l'informazione dal currentUser
  const [isScrolled, setIsScrolled] = useState(0);
  const [urlActive, setUrlActive] = useState("");

  const getUrlActive = () => {
    setUrlActive(window.location.href);
  }

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

        //setUserInfo(data) // successivamente rimpiazzato dal global state

        dispach({
          type: "CURRENT_USER",
          payload: data
        })

      })
      .catch(err => err)
  }

  useEffect(() => {

    getUrlActive()

    getUserInfo()

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollTop)
    });

  }, [])

  useEffect(() => {
  }, [getUser])


  return (

    <nav
      className="navbar navbar-expand-lg p-0 fixed-top"
      id={isScrolled > 60 ? "navbarColored" : "navbarTransparent"}
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            className="logo-icon-navbar"
            src={logo}
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
              <Link onClick={() => window.scrollTo(0, 0)}
                to={"/homepage"}
                className={urlActive.includes("http://localhost:3000/homepage") ? "nav-link fw-bold link-navbar section-active" : "nav-link fw-bold link-navbar"}
              >
                Homepage <i className="bi bi-house-fill"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/profile/me"}
                className={urlActive.includes("http://localhost:3000/profile") ? "nav-link fw-bold link-navbar section-active" : "nav-link fw-bold link-navbar"}
              >
                Profilo <i className="bi bi-person-fill"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link onClick={() => window.scrollTo(0, 0)}
                to={"/search"}
                className={urlActive.includes("http://localhost:3000/search") ? "nav-link fw-bold link-navbar section-active" : "nav-link fw-bold link-navbar"}
              >
                Cerca <i className="bi bi-search-heart-fill"></i>
              </Link>
            </li>
            {getUser.role === "ADMIN" &&
              <li className="nav-item">
                <Link
                  to={"/homepage"}
                  className="nav-link fw-bold link-navbar"
                >
                  Back-Office <i className="bi bi-gear-fill"></i>
                </Link>
              </li>
            }
            <li className="nav-item">
              <Link onClick={() => {
                localStorage.removeItem("token")
                dispach({
                  type: "HIKE_LIST",
                  payload: null
                })
                dispach({
                  type: "USERS_LIST",
                  payload: []
                })
                dispach({
                  type: "SEARCH_OR_DEATAIL_VISIBLE",
                  payload: true
                })
              }}
                to={"/login"}
                className="nav-link fw-bold link-navbar"
              >
                Logout <i className="bi bi-door-open-fill"></i>
              </Link>
            </li>
          </ul>
          <div className="d-lg-flex d-none  align-items-center">
            <div id="" className="fw-bold text-center">
              {getUser.username}
            </div>

            <div className="dropdown" data-bs-popper="bottom-start">
              <button className="btn bg-transparent border-0 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img className="user-icon-navbar" src={getUser.userIcon} alt="user icon" />
              </button>
              <ul className="dropdown-menu navbar-dropdown-container shadow">
                <li id="nav-dropdown-li"><Link className="navbar-dropdown-li-link" to={"/"}>Action</Link></li>
                <li id="nav-dropdown-li"><Link className="navbar-dropdown-li-link" to={"/"}>Another action </Link></li>
                <li id="nav-dropdown-li">
                  <Link className="navbar-dropdown-li-link"
                    onClick={() => {
                      localStorage.removeItem("token")
                      dispach({
                        type: "HIKE_LIST",
                        payload: null
                      })
                      dispach({
                        type: "USERS_LIST",
                        payload: []
                      })
                      dispach({
                        type: "SEARCH_OR_DEATAIL_VISIBLE",
                        payload: true
                      })
                    }}
                    to={"/login"}>Logout <i className="bi bi-door-open-fill"></i>
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </nav >
  )
}

export default NavBar