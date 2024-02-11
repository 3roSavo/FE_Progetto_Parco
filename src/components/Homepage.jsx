import { Carousel } from "react-bootstrap"
import foto5 from "../assets/Escursioni-800.jpg"
import foto6 from "../assets/calto-contea_26.jpg"
import foto7 from "../assets/calto-contea_31.jpg"
import NavBar from "./NavBar"
import { useEffect, useState } from "react"

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
        <>
            <NavBar />

            <div className="mx-5 pt-5 ">

                <div className="mt-4 row justify-content-center info-homepage shadow3 p-4">

                    <div className="col-11 col-md-4 col-lg-4">
                        <span className="fs-4">Ti presentiamo i</span>
                        <h1 style={{ fontSize: "60px", fontWeight: 700 }}>Colli Euganei</h1>
                    </div>

                    <div className="col-11 col-md-7">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque aspernatur cum pe
                        rferendis sit veritatis totam porro perspiciatis modi ad ipsa unde voluptatem, at
                        que odit commodi laborum, aliquam optio voluptates fuga? Lorem ipsum, dolor sit
                        amet consectetur adipisicing elit. Dignissimos vero consequuntur placeat, amet autem qua
                        s rerum exercitationem excepturi a, itaque velit quod dolores assumenda eve
                        iet iusto deserunt vitae laudantium. Maiores.</div>

                </div>


                <div className="row mt-5">
                    <Carousel fade className="col-12 col-lg-8  mx-0 px-0">
                        <Carousel.Item className="">
                            <img src={foto5} className="rounded-5 w-100" style={{ objectPosition: 'center', height: "520px" }} alt="..." />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item className="">
                            <img src={foto6} className="rounded-5 w-100" style={{ objectPosition: 'center', height: "520px" }} alt="..." />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item className="">
                            <img src={foto7} className="rounded-5 w-100 " style={{ objectPosition: 'center', height: "520px" }} alt="..." />
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
                        t modi mollitia nisi, iure eius?</div>

                </div>

                <h2 className=" my-5 text-center ">Ti potrebbero interesssare...</h2>

                <div className="row">
                    {hikeList && hikeList.content.map((hike) => {
                        return (
                            <div class="card col-12 col-sm-6 col-md-4 col-lg-3">
                                <img src={foto6} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        )
                    })}



                </div>

            </div>

        </>
    )
}
export default Homepage