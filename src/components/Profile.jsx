import { useSelector } from "react-redux"
import Footer from "./Footer"
import NavBar from "./NavBar"
import { useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Profile = () => {

    const currentUser = useSelector(state => state.currentUser);
    const [userFound, setUserFound] = useState({})

    const [commonHikes, setCommonHikes] = useState([])

    const { userId } = useParams();
    const navigate = useNavigate();

    const getCommonHikes = () => {
        if (userFound && userFound.hikesIdList) {
            setCommonHikes(currentUser.hikesIdList.filter(hikeId => userFound.hikesIdList.includes(hikeId)))
        }
    }


    const getUserInfo = () => {

        if (userId === "me") {
            setUserFound(currentUser);
        } else {
            fetch("http://localhost:3001/users/" + userId, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error("Errore nel caricamento del profilo")
                    }
                })
                .then((data) => {
                    setUserFound(data)
                    getCommonHikes()
                })
                .catch(err => {
                    console.error(err);
                    throw err; // Rilancia l'errore per gestirlo nell'ambito chiamante, se necessario
                });
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [userFound])

    return (



        <div style={{ paddingTop: "130px" }} className="container">

            <NavBar />

            {userId === "me" &&
                <div className="row text-center">

                    <div className="col-12 col-md-4 col-lg-3 mb-3">

                        <div className="">
                            <img
                                src={userFound.userIcon}
                                style={{ width: "150px", height: "150px" }}
                                alt="user-icon"
                            />
                        </div>

                        <div className="mt-2 fs-2">
                            {userFound.username}
                        </div>

                    </div>

                    <div className="col-12 col-md-8 col-lg-9">

                        {currentUser.hikesIdList.map(hikeId => {
                            return (
                                <div>{hikeId}</div>
                            )
                        })}

                    </div>

                </div>
            }


            {userId !== "me" &&
                <div>

                    <div className="mb-4 mb-md-5">
                        <button onClick={() => navigate("/search")}
                            type="button"
                            className="btn btn-secondary p-1">
                            <i className="bi bi-arrow-left-short"></i>
                            indietro
                        </button>
                    </div>


                    <div className="row text-center">

                        <div className="col-12 col-md-4 col-lg-3 mb-3">

                            <div className="">
                                <img
                                    src={userFound.userIcon}
                                    style={{ width: "150px", height: "150px" }}
                                    alt="user-icon"
                                />
                            </div>

                            <div className="mt-2 fs-2">
                                {userFound.username}
                            </div>

                        </div>

                        {commonHikes.length > 0 &&

                            <div className="col-12 col-md-8 col-lg-9">

                                <p>Hey! Te e <strong>{userFound.username}</strong> avete gusti in comune!</p>

                                {commonHikes.map(hikeId => {
                                    return (
                                        <div>{hikeId}</div>
                                    )
                                })}


                            </div>}

                        {commonHikes.length === 0 &&

                            <div
                                className="col-12 col-md-8 col-lg-9">

                                Oh no! Sembra che te e <strong>{userFound.username}</strong> non abbiate escursioni preferite in comune!

                                <div>Rimediamo subito!</div>
                                <Link
                                    to={"/search"}
                                    className="btn btn-secondary mt-3">
                                    Cerca escursioni
                                    <i className="bi bi-search-heart ms-2"></i>
                                </Link>
                            </div>

                        }

                    </div>

                </div>}


            <Footer />

        </div>
    )

}
export default Profile