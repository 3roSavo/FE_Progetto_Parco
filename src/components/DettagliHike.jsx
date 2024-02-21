import { useDispatch, useSelector } from "react-redux"
import NavBar from "./NavBar"
import { Carousel } from "react-bootstrap"
import foto1 from "../assets/colli-euganei-hd.jpg"
import foto2 from "../assets/calto-contea_26.jpg"
import foto3 from "../assets/Parco-dei-Colli-Euganei-Monte-Venda.jpg"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const DettagliHike = ({ saveFavourite, deleteFavourite }) => {

    const getHike = useSelector(state => state.currentHike)
    const hikeList = useSelector(state => state.hikeList)
    const currentUser = useSelector(state => state.currentUser)

    const [usersList, setUsersList] = useState([])

    const dispach = useDispatch()

    const getShuffleUsers = (array) => {

        // mescolo direttamente usersList senza crearmene una copia con l'operatore (...)

        // Implemento l'algoritmo di Fisher-Yates per mescolare l'array
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Genera un indice casuale tra 0 e i
            [array[i], array[j]] = [array[j], array[i]]; // Scambia gli elementi
        }
        return array;
    }

    useEffect(() => {

        // in un ciclo non posso chiamare direttamente una fetch, perchè è asincrona, quindi
        // dovrò dichiarare di aspettare che tutte le promise siano concluse con un' operazione asincrona
        // terminato il processo avrò a disposizione userData
        // occhio che avere un ciclo molto grande che fa richieste al server è molto dispendioso
        // nel mio caso è voluto perchè ho progettato così il mio backend consapevolmente
        // in futuro valuta la possibilità di avere oggetti Hike più grandi (con liste di User completi e non solo dei loro id)

        const fetchUsers = async () => {
            try {
                const usersData = await Promise.all(
                    getHike.usersIdList.map(async userId => {
                        const response = await fetch("http://localhost:3001/users/" + userId, {
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

                getShuffleUsers(usersData)

                setUsersList(usersData)

            } catch (error) {
                console.error(error);
            }
        };

        if (getHike.usersIdList.length !== 0) {
            fetchUsers();
        }
    }, []);

    return (
        <div className="mt-5">
            <div onClick={() => {
                dispach({
                    type: "SEARCH_OR_DEATAIL_VISIBLE",
                    payload: true
                })
                dispach({
                    type: "USERS_LIST",
                    payload: []
                })
            }}
                className="btn btn-secondary p-1"><i className="bi bi-arrow-left-short"></i> indietro
            </div>

            <div className="row align-items-lg-center ">

                <h1 className="my-3" style={{ fontSize: "50px" }}>{getHike.title}</h1>

                <Carousel fade className="col-12 col-lg-9 col-xxl-8">
                    <Carousel.Item>
                        <img src={foto1} alt="paesaggio" className="img-carousel-detail rounded-4 img-carousel-search" />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={foto2} alt="paesaggio" className="img-carousel-detail rounded-4 img-carousel-search" />
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={foto3} alt="paesaggio" className="img-carousel-detail rounded-4 img-carousel-search" />
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

                <div className="col-12 col-lg-3 col-xxl-4 mt-3 mt-lg-0 ">
                    <ul className="ps-3">
                        <li className="py-lg-2 py-1">Difficoltà: <strong>{getHike.difficulty}</strong></li>
                        <li className="py-lg-2 py-1">Durata: <strong>{getHike.duration}</strong></li>
                        <li className="py-lg-2 py-1">Dislivello: <strong>{getHike.elevationGain}mt</strong></li>
                        <li className="py-lg-2 py-1">Lunghezza: <strong>{getHike.length}km</strong></li>
                        <li className="py-lg-2 py-1">N° sentiero: <strong>{getHike.trailNumber}</strong></li>
                    </ul>
                </div>

                <div className="row justify-content-center ms-0">
                    <div className="mt-lg-4 col-12 col-lg-9 col-xl-9">
                        <div className="mb-2">
                            <h4 className=" fw-bold d-inline">Descrizione
                                <i onClick={() => {
                                    if (getHike.usersIdList.includes(currentUser.id)) {

                                        deleteFavourite(getHike.id)

                                        dispach({
                                            type: "USERS_LIST",
                                            payload: []
                                        })

                                        dispach({
                                            type: "CURRENT_HIKE",
                                            payload: {
                                                ...getHike,
                                                usersIdList: getHike.usersIdList.filter(userId => userId !== currentUser.id)
                                            }
                                        })


                                    } else {
                                        saveFavourite(getHike.id)

                                        dispach({
                                            type: "USERS_LIST",
                                            payload: []
                                        })

                                        dispach({
                                            type: "CURRENT_HIKE",
                                            payload: {
                                                ...getHike,
                                                usersIdList: [
                                                    ...getHike.usersIdList,
                                                    currentUser.id
                                                ]
                                            }
                                        })
                                    }
                                }}
                                    className={getHike.usersIdList.includes(currentUser.id) ? "ms-4 bi bi-suit-heart-fill heart-icon heart-fill" : "ms-4 bi bi-suit-heart heart-icon"}>
                                </i>
                            </h4>
                        </div>

                        <div>
                            {getHike.description}
                        </div>

                    </div>

                    {usersList.length !== 0 && usersList.length < 4 && (
                        <div className="favourite-search-card col-12 col-sm-10 col-md-8 col-lg-3 col-xxl-2 mt-4 mt-lg-5 rounded-4 p-3">
                            <p className="mb-1">Piace anche a:</p>
                            <div className="row justify-content-around">
                                {usersList.map(user => {
                                    return (
                                        <Link
                                            to={"/profile/" + user.id}
                                            className="my-2 col-4 col-sm-3 col-lg-6 mx-lg-5 text-center user-card"
                                            key={user.id}>

                                            <div className="">
                                                <img className="user-card-img" src={user.userIcon} alt="" />
                                            </div>

                                            <div className=""><strong>{user.username}</strong></div>

                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                    {usersList.length > 3 && (
                        <div className="favourite-search-card col-12 col-sm-10 col-md-8 col-lg-3 col-xxl-2 mt-4 mt-lg-5 rounded-4 p-3">
                            <p className="mb-1">Piace anche a:</p>
                            <div className="row justify-content-around">
                                {usersList.slice(0, 3).map(user => {
                                    return (
                                        <Link
                                            to={"/profile/" + user.id}
                                            className="my-2 col-4 col-sm-3 col-lg-6 mx-lg-5 text-center user-card"
                                            key={user.id}>

                                            <div className="">
                                                <img className="user-card-img" src={user.userIcon} alt="" />
                                            </div>

                                            <div className=""><strong>{user.username}</strong></div>
                                        </Link>
                                    )
                                })

                                }
                            </div>
                            <span>e altre <strong>{usersList.length - 3}</strong> persone</span>
                        </div>
                    )}

                </div>
            </div>


        </div>
    )

}
export default DettagliHike