import { useEffect, useState } from "react"
import Footer from "./Footer"
import NavBar from "./NavBar"
import foto6 from "../assets/calto-contea_26.jpg"
import { Link } from "react-router-dom"
import { Spinner } from "react-bootstrap"
import { useSelector } from "react-redux"

const Search = () => {

    const getUser = useSelector(state => state.currentUser)

    const [inputValue, setInputValue] = useState("");
    const [hikeList, setHikeList] = useState(null);

    const [hikesPage, setHikesPage] = useState(0)
    const [hikesSize, setHikesSize] = useState(10)
    const [hikesSort, setHikesSort] = useState("title")

    const [loading, setLoading] = useState(false);


    const getTitleHikes = (e) => {
        setHikeList(null)
        setLoading(true)
        e.preventDefault()

        fetch("http://localhost:3001/hikes/title/" + inputValue + "?page=" + hikesPage + "&size=" + hikesSize + "&sort=" + hikesSort, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Errore nel recupero dei dati")
                }
            })
            .then((data) => {
                setTimeout(() => {
                    setLoading(false)
                    console.log(data)
                    setHikeList(data.content)
                }, 1000)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }


    const getRandomHikes = () => {

        setHikeList(null)
        setLoading(true)

        fetch("http://localhost:3001/hikes?page=" + hikesPage + "&size=" + hikesSize + "&sort=" + hikesSort, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Errore nel recupero dei dati")
                }
            })
            .then((data) => {
                setTimeout(() => {
                    setLoading(false)

                    console.log(data)

                    data.content.sort(() => Math.random() - 0.5);

                    setHikeList(data.content)

                }, 1000)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })

    }


    const saveFavourite = (hikeId) => {

        fetch("http://localhost:3001/hikes/me/addFavourite/" + hikeId, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Errore nel recupero dei dati")
                }
            })
            .then((data) => {

                console.log(data)

                /*setHikeList(currentHikeList => {
                    return currentHikeList.map(hike => {
                        if (hike.id === hikeId) {
                            return {
                                ...hike,
                                usersIdList: [
                                    ...hike.usersIdList,
                                    getUser.id.toString()
                                ]
                            }
                        } else {
                            return hike
                        }
                    })
                })*/
                setHikeList(hikeList.map(hike => {
                    if (hike.id === hikeId) {
                        return {
                            ...hike,
                            usersIdList: [
                                ...hike.usersIdList,
                                getUser.id
                            ]
                        }
                    } else {
                        return hike
                    }
                }))

                // prove prove prove

            })
            .catch((err) => {
                console.log(err)
            })

    }

    const deleteFavourite = (hikeId) => {

        fetch("http://localhost:3001/hikes/me/removeFavourite/" + hikeId, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then((response) => {
                if (response.ok) {
                    return console.log("eliminazione risucita!")
                } else {
                    throw new Error("Errore nel recupero dei dati")
                }
            })
            .then(() => {

                setHikeList(hikeList.map(hike => {
                    if (hike.id === hikeId) {
                        return {
                            ...hike,
                            usersIdList: hike.usersIdList.filter(userId => userId !== getUser.id)
                        }
                    } else {
                        return hike
                    }
                }))




                // prove prove prove

            })
            .catch((err) => {
                console.log(err)
            })

    }


    useEffect(() => {
    }, [hikeList]);




    return (
        <>
            <div className="overflow-x-hidden container min-vh-100 position-relative pt-5">

                <NavBar />

                <h1 className="text-center mt-5">Ricerca la tua escursione!</h1>

                <form className="mt-5" onSubmit={(e) => getTitleHikes(e)}>
                    <div className="search-box mt-4 mb-5  m-auto">
                        <button type="button" className="btn-search btn-pulse"><i className="bi bi-search-heart fs-4"></i></button>
                        <input
                            type="text"
                            className="input-search"
                            placeholder="Cerca per titolo..."
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value)
                            }}
                        />
                    </div>
                </form>

                <div className="mt-4 mb-4 d-block d-sm-flex  justify-content-end text-center">

                    <div className="my-2 ">
                        <button onClick={() => getRandomHikes()} className="btn btn-secondary" id="shuffle-button" type="button">
                            Shuffle <i className="bi bi-shuffle"></i>
                        </button>
                    </div>

                    <div className="dropdown my-2 mx-sm-2">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Ordina per:
                        </button>
                        <ul className="dropdown-menu filter-dropdown-container">
                            <li onClick={() => setHikesSort("title")} className={hikesSort === "title" ? "bg-secondary dropdown-item li-filter" : "dropdown-item li-filter"}>titolo</li>
                            <li onClick={() => setHikesSort("duration")} className={hikesSort === "duration" ? "bg-secondary dropdown-item li-filter" : "dropdown-item li-filter"}>durata</li>
                            <li onClick={() => setHikesSort("elevationGain")} className={hikesSort === "elevationGain" ? "bg-secondary dropdown-item li-filter" : "dropdown-item li-filter"}>dislivello</li>
                            <li onClick={() => setHikesSort("length")} className={hikesSort === "length" ? "bg-secondary dropdown-item li-filter" : "dropdown-item li-filter"}>lunghezza</li>
                            <li onClick={() => setHikesSort("trailNumber")} className={hikesSort === "trailNumber" ? "bg-secondary dropdown-item li-filter" : "dropdown-item li-filter"}>numero sentiero</li>
                            <li onClick={() => setHikesSort("difficulty")} className={hikesSort === "difficulty" ? "bg-secondary dropdown-item li-filter" : "dropdown-item li-filter"}>difficoltà</li>
                        </ul>
                    </div>

                    <div className="dropdown my-2">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            N° risultati:
                        </button>
                        <ul className="dropdown-menu filter-dropdown-container">
                            <li onClick={() => setHikesSize(5)} className={hikesSize === 5 ? "bg-secondary dropdown-item li-filter" : "dropdown-item li-filter"}>5</li>
                            <li onClick={() => setHikesSize(10)} className={hikesSize === 10 ? "bg-secondary dropdown-item li-filter" : "dropdown-item li-filter"}>10</li>
                            <li onClick={() => setHikesSize(20)} className={hikesSize === 20 ? "bg-secondary dropdown-item li-filter" : "dropdown-item li-filter"}>20</li>
                            <li onClick={() => setHikesSize(40)} className={hikesSize === 40 ? "bg-secondary dropdown-item li-filter" : "dropdown-item li-filter"}>40</li>
                        </ul>
                    </div>

                </div>

                {loading && <div className="text-center"><Spinner animation="border" variant="primary" /></div>}

                <div className="row g-3 g-lg-4 justify-content-center">
                    {hikeList && hikeList.map((hike) => {
                        return (
                            <div className="col-10 col-sm-6 col-md-5 col-lg-4 col-xl-3" key={hike.id}>
                                <div className="card bg-transparent shadow-sm" id="cards">
                                    <img src={foto6} className="card-img-top" alt="foto-escursione" style={{ maxHeight: "250px", objectFit: "cover" }} />
                                    <div className="card-body row my-3 mx-2 p-0">
                                        <h5 className="card-title text-center">{hike.title}</h5>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item bg-transparent">Difficoltà: <strong>{hike.difficulty}</strong></li>
                                            <li className="list-group-item bg-transparent">Durata: <strong>{hike.duration}</strong></li>
                                            <li className="list-group-item bg-transparent">Dislivello: <strong>{hike.elevationGain}mt</strong></li>
                                            <li className="list-group-item bg-transparent">Lunghezza: <strong>{hike.length}km</strong></li>
                                        </ul>

                                        <div className="d-flex align-items-center justify-content-between align-self-end mt-3">

                                            <div className=""><Link to="" className="btn btn-secondary p-1 btn-card" style={{ fontSize: "16px" }}>Dettagli <i className="bi bi-arrow-right-short"></i></Link></div>
                                            <div onClick={() => {
                                                if (hike.usersIdList.includes(getUser.id)) {
                                                    deleteFavourite(hike.id)
                                                } else {
                                                    saveFavourite(hike.id)
                                                }
                                            }}>
                                                <i className={hike.usersIdList.includes(getUser.id) ? "bi bi-suit-heart-fill heart-icon" : "bi bi-suit-heart heart-icon"}></i>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>



                <div className="footer-search">< Footer /></div>
            </div>
        </>
    )


}

export default Search