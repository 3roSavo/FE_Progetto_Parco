import { useDispatch, useSelector } from "react-redux"
import NavBar from "./NavBar"
import { Carousel } from "react-bootstrap"
import foto1 from "../assets/colli-euganei-hd.jpg"
import foto2 from "../assets/calto-contea_26.jpg"
import foto3 from "../assets/Parco-dei-Colli-Euganei-Monte-Venda.jpg"

const DettagliHike = () => {

    const getHike = useSelector(state => state.currentHike)
    const dispach = useDispatch()


    return (
        <div className="mt-5">
            <div onClick={() => {
                dispach({
                    type: "SEARCH_OR_DEATAIL_VISIBLE",
                    payload: true
                })
            }}
                className="btn btn-secondary p-1"><i class="bi bi-arrow-left-square"></i> indietro
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

                <div className=" mt-lg-4">
                    <h4 className=" fw-bold ">Descrizione</h4>
                    {getHike.description}
                </div>
            </div>


        </div>
    )

}
export default DettagliHike