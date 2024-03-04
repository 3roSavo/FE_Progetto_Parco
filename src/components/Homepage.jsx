import { Carousel } from "react-bootstrap"
import foto5 from "../assets/Escursioni-800.jpg"
import foto6 from "../assets/calto-contea_26.jpg"
import foto7 from "../assets/calto-contea_31.jpg"
import Footer from "./Footer"
import NavBar from "./NavBar"
import MapComponent from "./MapComponent"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"


const Homepage = () => {

    const [hike, setHike] = useState(null)
    const [hikesPage, setHikesPage] = useState(0)

    const getUser = useSelector(state => state.currentUser)

    const dispach = useDispatch()



    const [hikesSize, setHikesSize] = useState(500)

    const today = new Date()
    const options = { day: 'numeric', month: 'long' };
    const formattedDate = today.toLocaleDateString('it-IT', options);



    const getRandomHikes = () => {

        fetch("http://localhost:3001/hikes?page=" + hikesPage + "&size=" + hikesSize, {
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

                console.log(data)

                const hikeRandom = Math.floor(Math.random() * data.content.length)

                console.log(hikeRandom)

                setHike(data.content[hikeRandom])
            })
            .catch((err) => {
                console.log(err)
            })
    }


    // salvataggio/rimozione preferiti ----------------------------------------------------

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

                setHike({
                    ...hike,
                    usersIdList: [
                        ...hike.usersIdList,
                        getUser.id
                    ]
                })

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

                setHike({
                    ...hike,
                    usersIdList: hike.usersIdList.filter(userId => userId !== getUser.id)
                })

            })
            .catch((err) => {
                console.log(err)
            })

    }


    useEffect(() => {
        getRandomHikes()
    }, []);


    return (
        <div className="overflow-x-hidden container">
            <NavBar />

            <div className="pt-5">

                <div className="mt-5 row justify-content-center info-homepage shadow3 p-3 mx-md-0">

                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="fs-4">Ti presentiamo i</div>
                        <h1 style={{ fontSize: "75px", fontWeight: 700 }}>Colli Euganei</h1>
                    </div>

                    <div className="col-12 col-md-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque aspernatur cum pe
                        rferendis sit veritatis totam porro perspiciatis modi ad ipsa unde voluptatem, at
                        que odit commodi laborum, aliquam optio voluptates fuga? Lorem ipsum, dolor sit
                        amet consectetur adipisicing elit. Dignissimos vero consequuntur placeat, amet autem qua
                        s rerum exercitationem excepturi a, itaque velit quod dolores assumenda eve
                        iet iusto deserunt vitae laudantium. Maiores.rum, aliquam optio voluptates fuga? Lorem ipsum, dolor sit
                        amet consectetur adipisicing elit. Dignissimos vero consequuntur placeat, amet autem qua
                        adipisicing elit. Dignissimos vero consequuntur placeat, ame
                    </div>

                </div>

                <h1 className="text-end homepage-titles my-4">Paesaggi mozzafiato!</h1>


                <div className="row m-0">
                    <Carousel fade className="col-12 col-lg-8  mx-0 p-0">
                        <Carousel.Item className="">
                            <img src={foto5} className="rounded-5 w-100 img-carousel-homepage" alt="..." />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item className="">
                            <img src={foto6} className="rounded-5 w-100 img-carousel-homepage" alt="..." />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item className="">
                            <img src={foto7} className="rounded-5 w-100 img-carousel-homepage" alt="..." />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>

                    <div className="col-12 col-lg-4 ps-lg-4 pe-0 mt-4 mt-lg-0">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non incidunt at perspiciatis. Deleniti
                        ipsum quae et tenetur non in magni dolores sint optio eligendi harum cumque, minus laborum t
                        emporibus facilis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti sit quaerat asperiore
                        s distinctio, possimus eveniet blanditiis libero et, deleniti laudantium quibusdam expedita quis? Itaque sun
                        t modi mollitia nisi, iure eius?
                    </div>

                </div>

                <h1 className="homepage-titles my-4">Vieni a trovarci!</h1>

                <div className="my-4 row">

                    <div className="col-12 col-md-7 col-lg-6 px-sm-0"><MapComponent /></div>

                    <p className="mt-4 mt-md-0  ps-md-4  col-12 col-md-5 col-lg-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi alias quas hic vero nesciunt cum quam corporis?
                        Quasi temporibus reprehenderit aut doloribus! Asperiores veritatis quasi, placeat vel cumque delectus architecto?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat eos a et iure veniam nemo est temporibus, inventore, quibusdam
                        velit natus eaque delectus repudiandae officia quod laboriosam eveniet veritatis distinctio!
                    </p>
                </div>


                <h1 className=" mt-5 text-start fw-bold">Oggi {formattedDate} ti proponiamo:</h1>


                {hike && <div className="row align-items-lg-center ">

                    <h1 className="my-4 text-md-center">{hike.title}</h1>

                    <div className="col-12 col-lg-9 col-xxl-8 px-0 px-md-4 px-lg-3 px-xl-5">

                        <Carousel className="carousel-modify px-0">
                            {hike.urlImagesList.map(image => {
                                return (
                                    <Carousel.Item key={image}>
                                        <img src={image} alt="paesaggio" className="img-carousel-detail rounded-4 img-carousel-search" />
                                    </Carousel.Item>
                                )
                            })}
                        </Carousel>

                    </div>

                    <ul className="ps-3 ps-xl-4 ps-xxl-5 pe-2 list-unstyled text-center text-md-start col-12 col-md-4 col-lg-3 col-xxl-4 my-3 my-lg-auto">
                        <li className="py-2 py-md-4">Difficoltà: <strong>{hike.difficulty}</strong></li>
                        <li className="py-2 py-md-4">Durata: <strong>{hike.duration}</strong></li>
                        <li className="py-2 py-md-4">Dislivello: <strong>{hike.elevationGain}mt</strong></li>
                        <li className="py-2 py-md-4">Lunghezza: <strong>{hike.length}km</strong></li>
                        <li className="py-2 py-md-4">N° sentiero: <strong>{hike.trailNumber}</strong></li>
                    </ul>

                    <div className="mt-lg-5 mt-md-3 col-12 col-md-8 col-lg-9 px-2 pe-md-3 ps-lg-3 pe-lg-4 flex-grow-1">
                        <div className="mb-2">
                            <h4 className=" fw-bold d-inline">Descrizione
                                <i onClick={() => {
                                    if (hike.usersIdList.includes(getUser.id)) {
                                        deleteFavourite(hike.id)
                                    } else {
                                        saveFavourite(hike.id)
                                    }
                                }}
                                    className={hike.usersIdList.includes(getUser.id) ? "ms-4 bi bi-suit-heart-fill heart-icon heart-fill" : "ms-4 bi bi-suit-heart heart-icon"}>
                                </i>
                            </h4>
                        </div>
                        {hike.description}
                    </div>
                </div>}


            </div>

            <Footer />

        </div>
    )
}
export default Homepage