import { useDispatch, useSelector } from "react-redux"
import NavBar from "./NavBar"
import { Carousel } from "react-bootstrap"
import foto1 from "../assets/colli-euganei-hd.jpg"
import foto2 from "../assets/calto-contea_26.jpg"
import foto3 from "../assets/Parco-dei-Colli-Euganei-Monte-Venda.jpg"
import { useEffect, useState } from "react"

const DettagliHike = ({ saveFavourite, deleteFavourite }) => {

    const getHike = useSelector(state => state.currentHike)
    const hikeList = useSelector(state => state.hikeList)
    const currentUser = useSelector(state => state.currentUser)

    const [usersList, setUsersList] = useState([])

    const dispach = useDispatch()

    useEffect(() => {

        // in un ciclo non posso chiamare direttamente una fetch, perchè è asincrona, quindi
        // dovrò chiamarla con un' operazione asincrona

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
                className="btn btn-secondary p-1"><i className="bi bi-arrow-left-square"></i> indietro
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

                <div className="row">
                    <div className="mt-lg-4 col-12 col-lg-9 col-xl-10">
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
                        <div className="bg-success col-10 col-sm-8 col-lg-3 col-xl-2 mt-4 rounded-4 p-3">
                            <p>Piace anche a:</p>
                            {usersList.map(user => {
                                return (
                                    <div className="row align-items-center justify-content-center" key={user.id}>

                                        <div className="my-2 col-12 col-lg-4">
                                            <img style={{ width: "40px", height: "40px", borderRadius: "50px" }} src={user.userIcon} alt="" />
                                        </div>

                                        <div className="col-12 px-0 col-lg-8 text-start"><strong>{user.username}</strong></div>

                                    </div>
                                )
                            })}
                        </div>
                    )}
                    {usersList.length > 3 && (
                        <div className="bg-success col-10 col-sm-8 col-lg-3 col-xl-2 mt-4 rounded-4 p-3">
                            <p>Piace anche a:</p>
                            <div className="row justify-content-around">
                                {usersList.slice(0, 3).map(user => {
                                    return (
                                        <div className="my-2 col-4 col-sm-3 col-lg-12 text-center " key={user.id}>

                                            <div className="">
                                                <img style={{ width: "40px", height: "40px", borderRadius: "50px" }} src={user.userIcon} alt="" />
                                            </div>

                                            <div className=""><strong>{user.username}</strong></div>
                                        </div>
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