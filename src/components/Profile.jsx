import { useDispatch, useSelector } from "react-redux"
import Footer from "./Footer"
import NavBar from "./NavBar"
import { useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Spinner } from "react-bootstrap"
import foto1 from "../assets/colli-euganei-hd.jpg"
import foto2 from "../assets/calto-contea_26.jpg"
import foto3 from "../assets/Parco-dei-Colli-Euganei-Monte-Venda.jpg"

const Profile = () => {

    const currentUser = useSelector(state => state.currentUser);
    const [userFound, setUserFound] = useState(null)

    const [commonHikes, setCommonHikes] = useState([])
    const [commonHikesFetched, setCommonHikesFetched] = useState([])

    const [loading, setLoading] = useState(false);

    const { userId } = useParams();
    const navigate = useNavigate();

    const dispach = useDispatch();

    const getCommonHikes = () => {
        setCommonHikes(currentUser.hikesIdList.filter(hikeId => userFound.hikesIdList.includes(hikeId)))
    }


    const getUserInfo = () => {

        setLoading(true)

        if (userId === "me") {
            setTimeout(() => {
                setUserFound(currentUser);
                setLoading(false)
            }, 1000)
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
                    setTimeout(() => {
                        setUserFound(data)
                        setLoading(false)
                    }, 1000)
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false)
                    throw err; // Rilancia l'errore per gestirlo nell'ambito chiamante, se necessario
                });
        }
    }



    const fetchHikes = async () => {
        try {
            const hikesData = await Promise.all(
                commonHikes.map(async hikeId => {
                    const response = await fetch("http://localhost:3001/hikes/" + hikeId, {
                        method: "GET",
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    });
                    if (!response.ok) {
                        throw new Error("Errore nel recupero dei dati");
                    }
                    return response.json();
                })
            );

            setCommonHikesFetched(hikesData)

        } catch (error) {
            console.error(error);
        }
    };

    //Quando viene chiamata getUserInfo(), il componente non attende che la promessa restituita da fetch()
    //si risolva prima di continuare l'esecuzione. Quindi, quando getCommonHikes() viene chiamata subito
    //dopo setUserFound(data), userFound potrebbe non essere ancora stato aggiornato con i dati dell'utente trovato.

    // Non sono riuscito a risolvere mettendo getCommonHikes() all'interno del secondo then di getUserInfo(), anche se
    // la response dovrebbe già essere gestibile senza problemi di sincronizzazione, l'errore dice che userFound è ancora
    // null al momento del filtraggio... Quindi ho risolto implementando un secondo useEffect che ascolta i cambiamenti di
    // userFound in modo tale da far partire il filtraggio SOLO quando finalmente userFound si degna a riempirsi

    useEffect(() => {
        getUserInfo()
    }, [currentUser, userId])

    useEffect(() => {
        if (userFound) {
            getCommonHikes()
        }
    }, [userFound])

    useEffect(() => {
        if (commonHikes.length !== 0) {
            fetchHikes();
        }
    }, [commonHikes])

    return (



        <div style={{ paddingTop: "130px" }} className="container">

            <NavBar />

            {loading && <div className="text-center"><Spinner animation="border" style={{ color: "rgb(62, 118, 206)" }} /></div>}

            {((userFound && userId === "me") || (userFound && userId == currentUser.id)) &&
                // == perchè deve confrontare una stringa (userId) cioè la path variable nell'url
                // e currentUser.id che è invece un numero. PS non voglio fare conversioni che 
                // potrebbero creare ulteriori problemi

                <div className="row text-center">

                    <div className="col-12 col-md-4 col-lg-3 mb-3" style={{ borderRadius: "150px" }}>

                        <div className="">
                            <img
                                src={currentUser.userIcon}
                                style={{ width: "150px", height: "150px" }}
                                alt="user-icon"
                            />
                        </div>

                        <div className="mt-2 fs-2">
                            {currentUser.username}
                        </div>

                    </div>

                    <div className="col-12 col-md-8 col-lg-9">

                        {commonHikesFetched.map(hike => {
                            return (
                                <div>
                                    {hike.title}
                                </div>
                            )
                        })}
                    </div>

                </div>
            }


            {userFound && userId !== "me" && userId != currentUser.id &&
                // stessa cosa qui
                // != perchè deve confrontare una stringa (userId) cioè la path variable nell'url
                // e currentUser.id che è invece un numero. PS non voglio fare conversioni che 
                // potrebbero creare ulteriori problemi
                <div>

                    <div className="row mx-0">

                        <div className="col-12 col-md-4 col-lg-3 px-0 mx-0 text-center">

                            <div className=" text-start" style={{ height: "30px" }}>
                                <button onClick={() => navigate("/search")}
                                    type="button"
                                    className="btn btn-secondary p-1">
                                    <i className="bi bi-arrow-left-short"></i>
                                    indietro
                                </button>
                            </div>

                            <div className="d-flex flex-column justify-content-center  h-100 mx-0">

                                <div className="mb-md-4">

                                    <img
                                        className="userIcon-search-profile"
                                        src={userFound.userIcon}
                                        alt="user-icon"
                                    />

                                    <div className="mt-2 fs-2">
                                        {userFound.username}
                                    </div>

                                </div>

                            </div>

                        </div>

                        {commonHikesFetched.length > 0 &&

                            <div className="col-12 col-md-8 col-lg-9 px-md-0">

                                <p className="mb-4 mt-3 mt-md-0 fs-5 ms-sm-3">Hey! Te e <strong>{userFound.username}</strong> avete gusti in comune!</p>

                                <div id="sticky-cards-profile">
                                    {commonHikesFetched.map(hike => {
                                        return (
                                            <div className="row my-4" key={hike.id}>

                                                <div className="col-12 col-md-4 px-0" id="img-box">
                                                    <img id="profile-cards-imgs" src={foto1} alt="hike-images" />
                                                </div>

                                                <div className="col-12 col-md-8 d-flex flex-wrap ">

                                                    <h5>{hike.title}</h5>

                                                    <p>{hike.description.slice(0, 100)}...</p>

                                                    <div className="">
                                                        <Link to={"/search"}
                                                            onClick={() => {
                                                                dispach({
                                                                    type: "CURRENT_HIKE",
                                                                    payload: hike
                                                                })
                                                                dispach({
                                                                    type: "SEARCH_OR_DEATAIL_VISIBLE",
                                                                    payload: false
                                                                })
                                                                dispach({
                                                                    type: "USERS_LIST",
                                                                    payload: []
                                                                })
                                                                window.scrollTo(0, 0);
                                                            }}
                                                            className="btn btn-secondary p-1 btn-card" style={{ fontSize: "16px" }}>Dettagli <i className="bi bi-arrow-right-short"></i>
                                                        </Link>
                                                    </div>

                                                </div>

                                            </div>
                                        )
                                    })}
                                </div>


                            </div>}

                        {commonHikesFetched.length === 0 &&

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