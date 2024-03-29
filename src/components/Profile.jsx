import { useDispatch, useSelector } from "react-redux"
import Footer from "./Footer"
import NavBar from "./NavBar"
import { useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button, Form, Modal, Spinner } from "react-bootstrap"

const Profile = () => {

    const currentUser = useSelector(state => state.currentUser);
    const [userFound, setUserFound] = useState(null)

    const [commonHikes, setCommonHikes] = useState([])
    const [commonHikesFetched, setCommonHikesFetched] = useState([])

    const [showModify, setShowModify] = useState(false);
    const handleCloseModify = () => setShowModify(false);
    const handleShowModify = () => setShowModify(true);

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    const location = useLocation();

    const [userFormInput, setUserFormInput] = useState({
        userIcon: null,
        username: currentUser.username,
        email: currentUser.email,
        password: ""
    })

    const [fileUserIcon, setFileUserIcon] = useState(null)

    const [loading, setLoading] = useState(false);

    const { userId } = useParams();
    const navigate = useNavigate();

    const dispach = useDispatch();

    const [showButton, setShowButton] = useState(false)

    //-------------------------------------------------------------------

    const getCommonHikes = () => { // se l'utente sei te dobbiamo solo mostrare i tuoi preferiti
        if (userId === "me" || currentUser.id == userId) {
            setCommonHikes(
                currentUser.hikesIdList
            )
        } else { // altrimenti confrontiamoli con i suoi
            setCommonHikes(currentUser.hikesIdList.filter(hikeId => userFound.hikesIdList.includes(hikeId)))
        }
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

    // salvataggio icona utente


    const saveUserIcon = () => {
        setLoading(true)

        const formData = new FormData();
        formData.append('icon', fileUserIcon);

        fetch("http://localhost:3001/users/me/uploadIcon", {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")

            },
            body: formData
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
                    setUserFormInput({
                        ...userFormInput,
                        userIcon: data.userIconUrl
                    })
                    setFileUserIcon(null)
                    setLoading(false)
                }, 1000)
            })

            .catch(err => {
                console.error(err);
                setLoading(false)
                throw err;
            });
    }



    const modifyUser = () => {
        setLoading(true)

        fetch("http://localhost:3001/users/me", {

            method: "PUT",

            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("token")
            },

            body: JSON.stringify(userFormInput)
        })

            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    return response.json()
                        .then((errorData) => {
                            throw new Error(errorData.message)
                        })
                }
            })

            .then((data) => {
                setTimeout(() => {

                    console.log(data)
                    alert("Modifica del profilo avvenuta con successo")
                    setUserFormInput({
                        userIcon: null,
                        username: userFormInput.username,
                        email: userFormInput.email,
                        password: ""
                    })
                    dispach({
                        type: "CURRENT_USER",
                        payload: data
                    })
                    setLoading(false)
                }, 1000)
            })
            .catch(err => {
                console.log(err)
                alert(err)
                setLoading(false)
            })
    }

    const deleteUser = () => {

        fetch("http://localhost:3001/users/me", {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Errore nell'eliminazione del profilo")
                }
            })
            .then(() => {
                alert("Utente cancellato con successo!")
                navigate("/login")
                localStorage.removeItem("token")

                // non dovrei resettare tutti gli state alla cancellazione dell'utente?
                /*dispach({
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
                dispach({
                    type: "CURRENT_USER",
                    payload: {}
                })*/
            })
            .catch(err => {
                console.error(err);
                setLoading(false)
                throw err; // Rilancia l'errore per gestirlo nell'ambito chiamante, se necessario
            });

    }



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

    useEffect(() => {
        if (userFormInput.userIcon !== null) {
            console.log("sono dentro l'if")
            modifyUser()
        }
        console.log("primo render")
    }, [userFormInput.userIcon])

    useEffect(() => {

        const handleScroll = () => {
            if (window.scrollY > 800) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Rimuovo l'event listener quando il componente viene smontato
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, []);

    return (



        <div className="container profile-container">

            <div className="top-arrow d-md-none ">
                <i onClick={() => window.scrollTo(0, 0)}
                    className={showButton ? "bi bi-arrow-up-circle-fill" : "bi bi-arrow-up-circle-fill d-none"}
                >
                </i>
            </div>

            <NavBar />

            {loading && <div className="text-center"><Spinner animation="border" style={{ color: "rgb(62, 118, 206)" }} /></div>}

            {((userFound && userId === "me") || (userFound && userId == currentUser.id)) &&
                // == perchè deve confrontare una stringa (userId) cioè la path variable nell'url
                // e currentUser.id che è invece un numero. PS non voglio fare conversioni che 
                // potrebbero creare ulteriori problemi

                <div className="row row mx-0">

                    <div className="col-12 col-md-4 col-lg-3 px-0 mx-0 text-center d-flex flex-column justify-content-center h-100 mx-0">

                        <div className="">
                            <img
                                className="userIcon-search-profile"
                                src={currentUser.userIcon}
                                alt="user-icon"
                            />
                        </div>

                        <div className="row mt-2 mt-sm-3 fs-3 align-items-center justify-content-around">

                            <div className="px-0 col-12 col-md-12">
                                {currentUser.username}
                            </div>

                            <div title={currentUser.email}
                                className="px-0 fs-6 col-12 col-md-12">
                                {currentUser.email.length > 18 &&
                                    <span>{currentUser.email.slice(0, 6)}***{currentUser.email.slice(currentUser.email.lastIndexOf() - 4, currentUser.email.length)}</span>
                                }
                                {currentUser.email.length <= 18 &&
                                    currentUser.email
                                }
                            </div>
                        </div>

                        <div className="row">

                            <div className="col-12 col-sm-6 col-md-12  mt-3 mt-md-4" id="modify-profile-section">
                                <button onClick={handleShowModify}
                                    type="button"
                                    className="btn text-light shadow "
                                    id="shuffle-button">
                                    Modifica
                                </button>
                            </div>

                            <div className="col-12 col-sm-6 col-md-12  mt-3 mt-md-4" id="modify-profile-section">
                                <button onClick={handleShowDelete}
                                    type="button"
                                    className="btn btn-danger shadow">
                                    Elimina
                                </button>
                            </div>

                        </div>

                    </div>

                    {commonHikesFetched.length > 0 &&

                        <div className="col-12 col-md-8 col-lg-9 px-md-0">

                            <p className="mb-4 mt-4 mt-md-0 fs-5 ms-sm-3">Ecco le tue escursioni preferite <strong>{userFound.username}</strong>!</p>

                            <div id="sticky-cards-profile">
                                {commonHikesFetched.map(hike => {
                                    return (
                                        <div className="row my-4" key={hike.id}>

                                            <div className="col-12 col-md-4 px-0" id="img-box">
                                                <img id="profile-cards-imgs" style={{ maxHeight: "250px" }} src={hike.urlImagesList[0]} alt="hike-images" />
                                            </div>

                                            <div className="col-12 col-md-8 mt-3 mt-md-0 row">

                                                <h5>{hike.title}</h5>

                                                <p>{hike.description.slice(0, 100)}...</p>

                                                <div className="">
                                                    <Link to={"/search/hikes"}
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
                                                                type: "HIKE_LIST",
                                                                payload: [hike]
                                                            })
                                                            dispach({
                                                                type: "PREVIOUS_PATH",
                                                                payload: location.pathname
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

                        </div>
                    }

                    {commonHikesFetched.length === 0 &&

                        <div
                            className="col-12 col-md-8 col-lg-9">

                            <p className="mt-4">Oh no! Sembra che tu non abbia escursioni tra i preferiti!</p>

                            <p>Rimediamo subito!</p>

                            <div className="text-center">
                                <Link
                                    to={"/search/hikes"}
                                    onClick={() => {
                                        dispach({
                                            type: "HIKE_LIST",
                                            payload: []
                                        })
                                        dispach({
                                            type: "SEARCH_OR_DEATAIL_VISIBLE",
                                            payload: true
                                        })
                                    }}
                                    className="btn btn-secondary mt-3">
                                    Cerca escursioni
                                    <i className="bi bi-search-heart ms-2"></i>
                                </Link>
                            </div>

                        </div>

                    }

                </div>
            }


            {userFound && userId !== "me" && userId != currentUser.id &&
                // stessa cosa qui
                // != perchè deve confrontare una stringa (userId) cioè la path variable nell'url
                // e currentUser.id che è invece un numero. PS non voglio fare conversioni che 
                // potrebbero creare ulteriori problemi

                <div className="row mx-0">

                    <div className="col-12 col-md-4 col-lg-3 px-0 mx-0 text-center">

                        <div className=" text-start" style={{ height: "30px" }}>
                            <button onClick={() => { window.history.back() }}
                                type="button"
                                className="btn btn-secondary p-1">
                                <i className="bi bi-arrow-left-short"></i>
                                indietro
                            </button>
                        </div>

                        <div className="col-12 col-md-10 text-center  d-flex mt-2 mt-md-3 flex-column justify-content-center h-100 mx-0">

                            <div className="mb-md-5">

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
                                        <div className="row my-4 mx-0" key={hike.id}>

                                            <div className="col-12 col-md-4 px-0" id="img-box">
                                                <img id="profile-cards-imgs" style={{ maxHeight: "250px" }} src={hike.urlImagesList[0]} alt="hike-images" />
                                            </div>

                                            <div className="col-12 col-md-8 row mt-3 mt-md-0 flex-wrap mx-0">

                                                <h5>{hike.title}</h5>

                                                <p>{hike.description.slice(0, 100)}...</p>

                                                <div className="">
                                                    <Link to={"/search/hikes"}
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
                                                                type: "PREVIOUS_PATH",
                                                                payload: location.pathname
                                                            })
                                                            dispach({
                                                                type: "HIKE_LIST",
                                                                payload: [hike]
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


                        </div>
                    }

                    {commonHikesFetched.length === 0 &&

                        <div
                            className="col-12 col-md-8 col-lg-9">

                            <p className="mt-4">Oh no! Sembra che te e <strong>{userFound.username}</strong> non abbiate escursioni preferite in comune!</p>

                            <p>Rimediamo subito!</p>

                            <div className="text-center">
                                <Link
                                    to={"/search/hikes"}
                                    className="btn btn-secondary mt-3">
                                    Cerca escursioni
                                    <i className="bi bi-search-heart ms-2"></i>
                                </Link>
                            </div>

                        </div>

                    }

                </div>}

            <Footer />

            <Modal show={showModify} onHide={handleCloseModify} className="">
                <div className="modal-settings">
                    <Modal.Header>
                        <Modal.Title>Modifica profilo</Modal.Title>
                        <Button className="bg-transparent border-0 py-0 fs-3 text-dark x-icon" onClick={() => {
                            setUserFormInput({
                                userIcon: null,
                                username: currentUser.username,
                                email: currentUser.email,
                                password: ""
                            })
                            handleCloseModify()
                        }}>
                            <i className="bi bi-x-lg"></i>
                        </Button>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>

                            <Form.Group className="mb-3" controlId="inputUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    className="bg-transparent"
                                    type="text"
                                    placeholder="inserisci username"
                                    autoFocus
                                    value={userFormInput.username}
                                    onChange={(e) => {
                                        setUserFormInput({
                                            ...userFormInput,
                                            username: e.target.value
                                        })
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="inputEmail">
                                <Form.Label>Indirizzo e-mail</Form.Label>
                                <Form.Control
                                    className="bg-transparent"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={userFormInput.email}
                                    onChange={(e) => {
                                        setUserFormInput({
                                            ...userFormInput,
                                            email: e.target.value
                                        })
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="inputPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    className="bg-transparent"
                                    type="password"
                                    placeholder="inserisci password"
                                    value={userFormInput.password}
                                    onChange={(e) => {
                                        setUserFormInput({
                                            ...userFormInput,
                                            password: e.target.value
                                        })
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="inputFile">
                                <Form.Label>Icona utente (opzionale)</Form.Label>
                                <Form.Control
                                    className="bg-transparent"
                                    type="file"
                                    onChange={(e) => {
                                        setFileUserIcon(e.target.files[0])
                                    }}
                                />
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {
                            handleCloseModify()
                            setUserFormInput({
                                userIcon: null,
                                username: currentUser.username,
                                email: currentUser.email,
                                password: ""
                            })
                        }}>
                            Annulla
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => {
                                if (fileUserIcon !== null && fileUserIcon !== undefined) {
                                    saveUserIcon()
                                } else {
                                    modifyUser()
                                }
                                handleCloseModify()
                            }}>
                            Salva
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>

            <Modal show={showDelete} onHide={handleCloseDelete}>
                <div className="modal-settings">
                    <Modal.Header closeButton>
                        <Modal.Title>Eliminazione profilo<i className="bi bi-trash ms-3"></i></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Sei sicuro di voler eliminare il profilo?<br></br> L'operazione è <strong>irreversibile</strong>!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDelete}>
                            Annulla
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => {
                                handleCloseDelete()
                                deleteUser()
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
export default Profile