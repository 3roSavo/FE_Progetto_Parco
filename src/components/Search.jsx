import { useEffect, useState } from "react"
import Footer from "./Footer"
import NavBar from "./NavBar"
import foto6 from "../assets/calto-contea_26.jpg"
import { Link } from "react-router-dom"
import { Spinner } from "react-bootstrap"

const Search = () => {

    const [inputValue, setInputValue] = useState("");
    const [hikeList, setHikeList] = useState(null);

    const [loading, setLoading] = useState(false);


    const getRandomHikes = (e) => {
        setLoading(true)
        e.preventDefault()

        fetch("http://localhost:3001/hikes/title/" + inputValue, {
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
                    setHikeList(data)
                }, 1000)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }

    useEffect(() => {

    }, []);




    return (
        <>
            <div className="overflow-x-hidden container min-vh-100 position-relative pt-5">

                <NavBar />

                <h1 className="text-center mt-5">Ricerca la tua escursione!</h1>
                <form onSubmit={(e) => getRandomHikes(e)}>
                    <div className="search-box mt-4 mb-5  m-auto">
                        <button type="button" className="btn-search btn-pulse"><i className="bi bi-search-heart fs-4"></i></button>
                        <input
                            type="text"
                            className="input-search"
                            placeholder="Type to Search..."
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value)
                            }}
                        />
                    </div>
                </form>

                {loading && <div className="text-center"><Spinner animation="border" variant="primary" /></div>}

                <div className="row g-2 justify-content-center ">
                    {hikeList && hikeList.map((hike) => {
                        return (
                            <div className="col-12 col-sm-6 col-md-5 col-lg-3" key={hike.id}>
                                <div className="card bg-transparent shadow-sm">
                                    <img src={foto6} className="card-img-top" alt="foto-escursione" style={{}} />
                                    <div className="card-body">
                                        <h5 className="card-title text-center">{hike.title}</h5>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item bg-transparent">Difficoltà: <strong>{hike.difficulty}</strong></li>
                                            <li className="list-group-item bg-transparent">Durata: <strong>{hike.duration}</strong></li>
                                            <li className="list-group-item bg-transparent">Dislivello: <strong>{hike.elevationGain}mt</strong></li>
                                            <li className="list-group-item bg-transparent">Lunghezza: <strong>{hike.length}km</strong></li>
                                        </ul>
                                        <div className="text-start"><Link to="" className="btn btn-secondary p-1 mt-3 btn-card">Maggiori dettagli</Link></div>
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