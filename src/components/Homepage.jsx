import { Carousel } from "react-bootstrap"
import foto5 from "../assets/Escursioni-800.jpg"
import foto6 from "../assets/calto-contea_26.jpg"
import foto7 from "../assets/calto-contea_31.jpg"
import Footer from "./Footer"
import NavBar from "./NavBar"
import MapComponent from "./MapComponent"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Homepage = () => {

    const [hikeList, setHikeList] = useState(null)

    const getRandomHikes = () => {

        fetch("http://localhost:3001/hikes", {
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
                setHikeList(data)
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

                <h1 className="text-end homepage-titles">Paesaggi mozzafiato!</h1>


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

                <h1 className="homepage-titles">Vieni a trovarci!</h1>

                <div className="my-4 row">
                    <div className="col-12 col-md-7 col-lg-6 px-sm-0"><MapComponent /></div>
                    <p className="mt-4 mt-md-0  ps-md-4  col-12 col-md-5 col-lg-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi alias quas hic vero nesciunt cum quam corporis?
                        Quasi temporibus reprehenderit aut doloribus! Asperiores veritatis quasi, placeat vel cumque delectus architecto?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat eos a et iure veniam nemo est temporibus, inventore, quibusdam
                        velit natus eaque delectus repudiandae officia quod laboriosam eveniet veritatis distinctio!
                    </p>
                </div>


                <h2 className=" my-5 text-center fw-bold">Ecco alcune delle nostre escursioni</h2>

                <div className="row g-2 justify-content-center ">
                    {hikeList && hikeList.content.slice(0, 4).map((hike) => {
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

            </div>

            <Footer />

        </div>
    )
}
export default Homepage