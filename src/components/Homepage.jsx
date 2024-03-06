import { Carousel } from "react-bootstrap"
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

                    <div className="col-12 col-md-6">
                        I <strong>Colli Euganei</strong> sono un comprensorio montuoso costituito da circa un centinaio di rilievi la
                        cui altezza non supera mai i 600 metri. La peculiare storia geologica ha reso possibile la formazione
                        di una straordinaria biodiversità botanica e faunistica, che a partire dal 1989 si è deciso di salvaguardare
                        istituendo il primo <strong>Parco Regionale del Veneto</strong>. Oltre ad avere una funzione di tutela ambientale, il
                        Parco si occupa della valorizzazione turistica delle risorse naturali.
                        Un fitta rete di <strong>sentieri ed itinerari escursionistici</strong> consente di esplorare il territorio in maniera
                        sostenibile: a piedi, in bicicletta o a cavallo è possibile scoprire gli angoli più belli dei Colli Euganei
                        immergendosi nella natura e praticando il proprio sport preferito.
                    </div>

                </div>

                <h1 className="text-end homepage-titles my-4">Paesaggi mozzafiato!</h1>


                <div className="row m-0 align-items-center ">
                    <Carousel fade
                        className="col-12 col-lg-8  mx-0 p-0 homepage-carousel"
                        interval={3500}>
                        <Carousel.Item>
                            <Carousel.Caption>
                                <h3 className="bg-black d-inline bg-opacity-50 px-3 rounded-4">Pianoro del Mottolone</h3><br></br>
                                <p className="bg-black d-inline bg-opacity-50 px-3 rounded-4">il balcone sui colli Euganei</p>
                            </Carousel.Caption>
                            <img className="homepage-carousel-imgs" src="https://res.cloudinary.com/diklzegyw/image/upload/v1709631892/Progetto_Parco/foto%20caroselli%20statici/colli-euganei-hd_gzwaqy.jpg"
                                alt="first-img-carousel" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Carousel.Caption>
                                <h3 className="bg-black d-inline bg-opacity-50 px-3 rounded-4">Vigneti di Teolo</h3><br></br>
                                <p className="bg-black d-inline bg-opacity-50 px-3 rounded-4">immersi in un paesaggio mozzafiato</p>
                            </Carousel.Caption>
                            <img className="homepage-carousel-imgs" src="https://res.cloudinary.com/diklzegyw/image/upload/v1709634213/Progetto_Parco/foto%20caroselli%20statici/122946998-529960ea-bf17-4265-8ea9-4982faa157a8_djmn4m.jpg"
                                alt="second-img-carousel" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Carousel.Caption>
                                <h3 className="bg-black d-inline bg-opacity-50 px-3 rounded-4">Castello Carrarese</h3><br></br>
                                <p className="bg-black d-inline bg-opacity-50 px-3 rounded-4">Un'imponente fortificazione per il controllo del territorio</p>
                            </Carousel.Caption>
                            <img className="homepage-carousel-imgs" src="https://res.cloudinary.com/diklzegyw/image/upload/v1709634216/Progetto_Parco/foto%20caroselli%20statici/este-castello-hd_gozblk.jpg"
                                alt="third-img-carousel" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Carousel.Caption>
                                <h3 className="bg-black d-inline bg-opacity-50 px-3 rounded-4">Cinto Euganeo</h3><br></br>
                                <p className="bg-black d-inline bg-opacity-50 px-3 rounded-4">acquedotti romani e ruderi alle sue sommità</p>
                            </Carousel.Caption>
                            <img className="homepage-carousel-imgs" src="https://res.cloudinary.com/diklzegyw/image/upload/v1709631891/Progetto_Parco/foto%20caroselli%20statici/storia-dei-colli-euganei_ppxu43.jpg"
                                alt="fourth-img-carousel" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Carousel.Caption>
                                <h3 className="bg-black d-inline bg-opacity-75 px-3 rounded-4">Monselice, città fortificata</h3><br></br>
                                <p className="bg-black d-inline bg-opacity-75 px-3 rounded-4">atmosfera tipica di un borgo medievale</p>
                            </Carousel.Caption>
                            <img className="homepage-carousel-imgs" src="https://res.cloudinary.com/diklzegyw/image/upload/v1709634216/Progetto_Parco/foto%20caroselli%20statici/monselice-hd_sgwg5d.jpg"
                                alt="8-img-carousel" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Carousel.Caption>
                                <h3 className="bg-black d-inline bg-opacity-75 px-3 rounded-4">Castello del Catajo</h3><br></br>
                                <p className="bg-black d-inline bg-opacity-75 px-3 rounded-4">brulicante di vita</p>
                            </Carousel.Caption>
                            <img className="homepage-carousel-imgs" src="https://res.cloudinary.com/diklzegyw/image/upload/v1709645981/Progetto_Parco/foto%20caroselli%20statici/castello-del-catajo-hd_vrdzzx.jpg"
                                alt="5-img-carousel" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Carousel.Caption>
                                <h3 className="bg-black d-inline bg-opacity-50 px-3 rounded-4">Cascata Schivanoia</h3><br></br>
                                <p className="bg-black d-inline bg-opacity-50 px-3 rounded-4">Uno dei siti più suggestivi del comprensorio euganeo</p>
                            </Carousel.Caption>
                            <img className="homepage-carousel-imgs" src="https://res.cloudinary.com/diklzegyw/image/upload/v1709639267/Progetto_Parco/foto%20caroselli%20statici/calto-contea_26_ejiev1.jpg"
                                alt="6-img-carousel" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Carousel.Caption>
                                <h3 className="bg-black d-inline bg-opacity-50 px-3 rounded-4">Monte Venda</h3><br></br>
                                <p className="bg-black d-inline bg-opacity-50 px-3 rounded-4">con i resti del monastero degli Olivetani</p>
                            </Carousel.Caption>
                            <img className="homepage-carousel-imgs" src="https://res.cloudinary.com/diklzegyw/image/upload/v1709631882/Progetto_Parco/foto%20caroselli%20statici/2023-02-12-MONTE-VENDA-3_fbcq2h.jpg"
                                alt="7-img-carousel" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Carousel.Caption>
                                <h3 className="bg-black d-inline bg-opacity-50 px-3 rounded-4">Villa Barbarigo</h3><br></br>
                                <p className="bg-black d-inline bg-opacity-50 px-3 rounded-4">splendida dimora signorile nel cuore dei colli</p>
                            </Carousel.Caption>
                            <img className="homepage-carousel-imgs" src="https://res.cloudinary.com/diklzegyw/image/upload/v1709634220/Progetto_Parco/foto%20caroselli%20statici/villa-barbarigo-hd_nurylk.jpg"
                                alt="8-img-carousel" />
                        </Carousel.Item>
                    </Carousel>

                    <div className="col-12 col-lg-4 ps-lg-4 pe-0 mt-4 mt-lg-0">
                        I Colli Euganei si stagliano inaspettati nel cuore della pianura veneta con i loro inconfondibili
                        volumi conici. La geometria quasi perfetta è il formidabile risultato di fenomeni vulcanici risalenti
                        a oltre 40 milioni di anni fa. Al fascino paesaggistico si accompagna l'unicità degli ambienti
                        naturali e una sorprendente ricchezza del patrimonio culturale. Incantevoli angoli di natura
                        incontaminata e pittoreschi borghi storici si susseguono lungo i molteplici itinerari che si possono
                        percorrere all'interno del Parco.
                        A rendere ancora più appagante e stimolante il soggiorno sui Colli Euganei sono le eccellenze
                        enogastronomiche locali, dal pregiatissimo vino alle esclusive specialità culinarie che si possono gustare
                        nei numerosi ristoranti, trattorie, agriturismi e cantine.
                    </div>

                </div>

                <div className="row mt-3 mt-lg-5 pt-4 align-items-center ">

                    <div className="col-12 col-lg-4">
                        <h3>Alta Via dei Colli Euganei</h3>
                        <p>
                            Benvenuti nell'incantevole mondo dei Colli Euganei, un'oasi di natura e bellezza situata nel cuore della
                            regione veneta. In questo video, vi porteremo in un'emozionante escursione attraverso paesaggi mozzafiato
                            e sentieri panoramici che si snodano tra le verdi colline vulcaniche ed i vigneti dei Colli Euganei attraverso uno dei sentieri più iconici lungo ben 42 km!
                        </p>
                    </div>


                    <iframe
                        className="col-12 col-lg-8 mx-0 youtube-video"
                        title="youtube-video-player"
                        muted
                        src="https://www.youtube.com/embed/apD9tehJYLE?autoplay=1&start=175"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">

                    </iframe>


                </div>

                <h1 className="homepage-titles my-4">Vieni a trovarci!</h1>

                <div className="my-4 row align-items-center">

                    <div className="col-12 col-md-7 col-lg-6 px-sm-0"><MapComponent /></div>

                    <p className="mt-4 mt-md-0 mb-0 ps-md-4  col-12 col-md-5 col-lg-6">
                        I Colli Euganei sono un gruppo di colline di origine vulcanica presenti all'interno della regione Veneto,
                        situata a Nord-Est dell'Italia. L'intera zona, distante pochi chilometri a sud da Padova, costituisce
                        il Primo Parco Regionale della Regione Veneto. Il Veneto si colloca al primo posto per il numero di
                        turisti europei che decidono di trascorrere le loro vacanze in Italia con una quota di 1/5 del totale
                        (fonte: Osservatorio Nazionale del Turismo anno 2012). I Colli Euganei godono di una posizione centrale e
                        rappresentano un punto strategico della zona dal quale è possibile raggiungere le più importanti destinazioni
                        turistiche in sole 1-2 ore.
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