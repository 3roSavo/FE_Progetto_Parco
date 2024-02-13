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

            <div className="row">
                <Carousel fade>
                    <Carousel.Item>
                        <img src={foto1} alt="paesaggio" className="img-carousel-detail" />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={foto2} alt="paesaggio" className="img-carousel-detail" />
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={foto3} alt="paesaggio" className="img-carousel-detail" />
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <div>
                    <ul>
                        <li className="">Difficoltà: <strong>{getHike.difficulty}</strong></li>
                        <li className="">Durata: <strong>{getHike.duration}</strong></li>
                        <li className="">Dislivello: <strong>{getHike.elevationGain}mt</strong></li>
                        <li className="">Lunghezza: <strong>{getHike.length}km</strong></li>
                        <li className="">N° sentiero: <strong>{getHike.trailNumber}</strong></li>
                    </ul>
                </div>
            </div>


        </div>
    )

}
export default DettagliHike