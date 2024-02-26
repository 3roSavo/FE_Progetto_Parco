import { useDispatch, useSelector } from "react-redux"
import NavBar from "./NavBar"
import { Button, Carousel, Form, Modal, Spinner } from "react-bootstrap"
import foto1 from "../assets/colli-euganei-hd.jpg"
import foto2 from "../assets/calto-contea_26.jpg"
import foto3 from "../assets/Parco-dei-Colli-Euganei-Monte-Venda.jpg"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const DettagliHike = ({ saveFavourite, deleteFavourite }) => {

    const getHike = useSelector(state => state.currentHike)
    const [hikeModify, setHikeModify] = useState({ ...getHike })
    const [filesHike, setFilesHike] = useState([])

    const hikeList = useSelector(state => state.hikeList)
    const currentUser = useSelector(state => state.currentUser)
    const previousPath = useSelector(state => state.previousPath)

    const [usersList, setUsersList] = useState([])

    const [imagesList, setImagesList] = useState({
        hikesPictureList: getHike.urlImagesList
    })

    const dispach = useDispatch()

    const [loading, setLoading] = useState(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);


    const getShuffleUsers = (array) => {

        // mescolo direttamente usersList senza crearmene una copia con l'operatore (...)

        // Implemento l'algoritmo di Fisher-Yates per mescolare l'array
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Genera un indice casuale tra 0 e i
            [array[i], array[j]] = [array[j], array[i]]; // Scambia gli elementi
        }
        return array;
    }

    const deleteHike = (hikeId) => {

        fetch("http://localhost:3001/hikes/" + hikeId, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Errore nell'eliminazione dell'escursione")
                }
            })
            .then(() => {

                alert("Cancellazione dell'escursione avvenuta con successo")

                setLoading(false)

                dispach({
                    type: "HIKE_LIST",
                    payload: hikeList.filter(hike => {
                        return hike.id !== hikeId
                    })
                })

                dispach({
                    type: "SEARCH_OR_DEATAIL_VISIBLE",
                    payload: true
                })
                dispach({
                    type: "USERS_LIST",
                    payload: []
                })

            })
            .catch(err => {
                console.error(err);
                alert(err)
                setLoading(false)
                throw err; // Rilancia l'errore per gestirlo nell'ambito chiamante, se necessario
            });
    }

    const deleteHikePictures = (hikeId) => {

        setLoading(true)

        fetch("http://localhost:3001/hikes/" + hikeId + "/deletePictures", {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                hikesPictureList: getHike.urlImagesList
            })
        })

            .then((response) => {
                if (!response.ok) {
                    return response.json()
                        .then((errorData) => {
                            throw new Error(errorData.message)
                        })
                }
            })
            .then(() => {
                deleteHike(hikeId)
            })
            .catch((err) => {
                console.log(err)
                alert(err)
                setLoading(false)
            })
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

    //------------------------------------------------------------------------------------------------

    return (
        <div className="mt-5">
            <div onClick={() => {

                if (previousPath.includes("/profile")) {
                    window.history.back()
                } else {
                    dispach({
                        type: "SEARCH_OR_DEATAIL_VISIBLE",
                        payload: true
                    })
                    dispach({
                        type: "USERS_LIST",
                        payload: []
                    })
                }
            }}
                className="btn btn-secondary p-1"><i className="bi bi-arrow-left-short"></i> indietro
            </div>

            {loading && <div className="text-center"><Spinner animation="border" style={{ color: "rgb(62, 118, 206)" }} /></div>}

            <div className="row justify-content-center mx-0">

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

                <ul className="ps-3 ps-xl-4 ps-xxl-5 pe-2 list-unstyled text-center text-md-start col-12 col-md-4 col-lg-3 col-xxl-4 my-3 my-lg-auto">
                    <li className="py-lg-2 py-2 py-md-3 py-lg-4">Difficoltà: <strong>{getHike.difficulty}</strong></li>
                    <li className="py-lg-2 py-2 py-md-3 py-lg-4">Durata: <strong>{getHike.duration}</strong></li>
                    <li className="py-lg-2 py-2 py-md-3 py-lg-4">Dislivello: <strong>{getHike.elevationGain}mt</strong></li>
                    <li className="py-lg-2 py-2 py-md-3 py-lg-4">Lunghezza: <strong>{getHike.length}km</strong></li>
                    <li className="py-lg-2 py-2 py-md-3 py-lg-4">N° sentiero: <strong>{getHike.trailNumber}</strong></li>
                </ul>

                <div className="mt-lg-5 mt-md-3 col-12 col-md-8 col-lg-9 px-2 pe-md-3 ps-lg-3 pe-lg-4 flex-grow-1">
                    <div className="mb-2 d-flex justify-content-md-center justify-content-lg-start align-items-center  ">

                        <h4 className="fw-bold my-0">Descrizione</h4>

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
                            className={getHike.usersIdList.includes(currentUser.id) ? "text-center mx-4 bi bi-suit-heart-fill heart-icon heart-fill" : "text-center mx-4 bi bi-suit-heart heart-icon"}>
                        </i>

                        {currentUser.role === "ADMIN" &&
                            <i
                                onClick={handleShow}
                                className="bi bi-gear-fill gear-icon">
                            </i>
                        }

                    </div>

                    <div>
                        {getHike.description}
                    </div>

                </div>



                {usersList.length !== 0 && usersList.length < 4 && (
                    <div className="favourite-search-card col-12 col-sm-10 col-md-8 col-lg-3 mt-4 mt-lg-5 rounded-4 p-3">
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
                    <div className="favourite-search-card col-12 col-sm-10 col-md-8 col-lg-3 mt-4 mt-lg-5 rounded-4 p-3">
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

                                        <div className="mt-1"><strong>{user.username}</strong></div>
                                    </Link>
                                )
                            })

                            }
                        </div>
                        <span>e altre <strong>{usersList.length - 3}</strong> persone</span>
                    </div>
                )}


            </div>


            <Modal
                size="lg"
                show={show}
                onHide={() => {
                    handleClose()
                    setHikeModify({ ...getHike })
                    setFilesHike([])
                }}>
                <div className="modal-settings">
                    <Modal.Header>
                        <Modal.Title>Modifica Escursione</Modal.Title>
                        <Button className="bg-transparent border-0 py-0 fs-3 text-dark x-icon" onClick={() => {
                            setHikeModify({ ...getHike })
                            setFilesHike([])
                            handleClose()
                        }}>
                            <i className="bi bi-x-lg"></i>
                        </Button>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>

                            <Form.Group className="mb-3" controlId="modify-title-hike">
                                <Form.Label>Titolo</Form.Label>
                                <Form.Control
                                    className=" bg-transparent"
                                    type="text"
                                    placeholder="Inserisci qui..."
                                    value={hikeModify.title}
                                    onChange={(e) => {
                                        setHikeModify({
                                            ...hikeModify,
                                            title: e.target.value
                                        })
                                    }}
                                    autoFocus
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="modify-description-hike">
                                <Form.Label>Descrizione</Form.Label>
                                <Form.Control
                                    className=" bg-transparent"
                                    as="textarea"
                                    placeholder="Inserisci qui la descrizione. Max 500 caratteri"
                                    rows={6}
                                    value={hikeModify.description}
                                    onChange={(e) => {
                                        setHikeModify({
                                            ...hikeModify,
                                            description: e.target.value
                                        })
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="controlRadio">
                                <Form.Label>Difficoltà:</Form.Label>
                                <div>
                                    <Form.Check
                                        className=""
                                        type="radio"
                                        id="easy-difficulty"
                                        label="Easy"
                                        name="radioGroup"
                                        value="EASY"
                                        checked={hikeModify.difficulty === "EASY"}
                                        onChange={() => {
                                            setHikeModify({
                                                ...hikeModify,
                                                difficulty: "EASY"
                                            })
                                        }}
                                    />
                                    <Form.Check
                                        className=""
                                        type="radio"
                                        id="moderate-difficulty"
                                        label="Moderate"
                                        name="radioGroup"
                                        value="MODERATE"
                                        checked={hikeModify.difficulty === "MODERATE"}
                                        onChange={() => {
                                            setHikeModify({
                                                ...hikeModify,
                                                difficulty: "MODERATE"
                                            })
                                        }}
                                    />
                                    <Form.Check
                                        className=""
                                        type="radio"
                                        id="difficult-difficulty"
                                        label="Difficult"
                                        name="radioGroup"
                                        value="DIFFICULT"
                                        checked={hikeModify.difficulty === "DIFFICULT"}
                                        onChange={() => {
                                            setHikeModify({
                                                ...hikeModify,
                                                difficulty: "DIFFICULT"
                                            })
                                        }}
                                    />
                                    <Form.Check
                                        className=""
                                        type="radio"
                                        id="expert-hiking-difficulty"
                                        label="Expert hiking"
                                        name="radioGroup"
                                        value="EXPERT_HIKING"
                                        checked={hikeModify.difficulty === "EXPERT_HIKING"}
                                        onChange={() => {
                                            setHikeModify({
                                                ...hikeModify,
                                                difficulty: "EXPERT_HIKING"
                                            })
                                        }}
                                    />
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="modify-duration-hike">
                                <Form.Label>Durata</Form.Label>
                                <Form.Control
                                    className=" bg-transparent"
                                    type="text"
                                    placeholder="Es 2h:30"
                                    value={hikeModify.duration}
                                    onChange={(e) => {
                                        setHikeModify({
                                            ...hikeModify,
                                            duration: e.target.value
                                        })
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="modify-length-hike">
                                <Form.Label>Lunghezza (km)</Form.Label>
                                <Form.Range
                                    className=" bg-transparent"
                                    min={0}
                                    max={30}
                                    step={0.1}
                                    placeholder="Es 6.5"
                                    value={hikeModify.length}
                                    onChange={(e) => {
                                        setHikeModify({
                                            ...hikeModify,
                                            length: parseFloat(e.target.value)
                                        })
                                    }}
                                />
                                <div className="text-center">
                                    <Form.Text>{hikeModify.length} Km</Form.Text>
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="modify-elevationGain-hike">
                                <Form.Label>Dislivello (metri)</Form.Label>
                                <Form.Range
                                    className=" bg-transparent"
                                    min={0}
                                    max={2000}
                                    step={1}
                                    placeholder="Es 6.5"
                                    value={hikeModify.elevationGain}
                                    onChange={(e) => {
                                        setHikeModify({
                                            ...hikeModify,
                                            elevationGain: parseFloat(e.target.value)
                                        })
                                    }}
                                />
                                <div className="text-center">
                                    <Form.Text>{hikeModify.elevationGain} metri</Form.Text>
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="modify-trailNumber-hike">
                                <Form.Label>N° sentiero</Form.Label>
                                <Form.Control
                                    className=" bg-transparent"
                                    type="number"
                                    placeholder="Es 12"
                                    value={hikeModify.trailNumber}
                                    onChange={(e) => {
                                        setHikeModify({
                                            ...hikeModify,
                                            trailNumber: e.target.value
                                        })
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="inputFile">
                                <Form.Label>Immagini escursione (max 4 elementi, max 10 MB ciascuna)</Form.Label>
                                <Form.Control
                                    className="bg-transparent"
                                    type="file"
                                    multiple
                                    onChange={(e) => {
                                        const selectedFiles = Array.from(e.target.files);
                                        if (selectedFiles.length <= 4) {
                                            setFilesHike([...filesHike, ...selectedFiles])
                                        } else {
                                            alert("numero di file superiore a 4")
                                        }
                                    }}
                                />
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer className=" justify-content-between ">
                        <div>
                            <Button variant="danger" onClick={() => {
                                handleClose()
                                handleShowDelete()
                            }}>
                                Elimina
                            </Button>
                        </div>
                        <div>
                            <Button variant="secondary" className="me-2 me-md-3" onClick={() => {
                                handleClose()
                                setHikeModify({ ...getHike })
                                setFilesHike([])
                            }}>
                                Annulla
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                                Salva
                            </Button>
                        </div>

                    </Modal.Footer>
                </div>
            </Modal>

            <Modal show={showDelete} onHide={handleCloseDelete}>
                <div className="modal-settings">
                    <Modal.Header closeButton>
                        <Modal.Title>Eliminazione escursione<i className="bi bi-trash ms-3"></i></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Sei sicuro di voler eliminare l'escursione?<br></br> L'operazione è <strong>irreversibile</strong>!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {
                            handleCloseDelete()
                            handleShow()
                        }}>
                            Annulla
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => {
                                deleteHikePictures(getHike.id)
                                //deleteHike(getHike.id)
                                handleCloseDelete()
                            }}
                        >
                            Elimina
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>


        </div>
    )

}
export default DettagliHike