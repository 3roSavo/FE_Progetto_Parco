import { Link } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"
import { useSelector } from "react-redux"

const Search = () => {

    const currentUser = useSelector(state => state.currentUser)


    return (

        <div className="container d-flex flex-column min-vh-100">

            <NavBar />

            <div className="pt-5 flex-grow-1 d-flex flex-column justify-content-center ">

                {currentUser.role === "ADMIN" && <div>

                    <h1 className="text-center pt-4">Benvenuto {currentUser.username}!</h1>
                    <h3 className="text-center">Da qui potrai cercare, creare e gestire ogni cosa!</h3>

                    <div className="mt-3 mt-md-5 row text-center justify-content-md-center">

                        <div className="col-6 col-md-4">
                            <Link onClick={() => { }}
                                to={""}
                                className="btn btn-success shadow ">
                                Utenti
                            </Link>
                        </div>

                        <div className="col-6 col-md-4">
                            <Link onClick={() => { }}
                                to={"/search/hikes"}
                                className="btn btn-success shadow ">
                                Escursioni
                            </Link>
                        </div>

                    </div>

                </div>}


                {currentUser.role === "USER" && <div>

                    <h1 className="text-center pt-4 mb-5">Cosa vuoi cercare?</h1>

                    <div className="text-center mt-3 mt-sm-4 mt-lg-5 row justify-content-md-center">

                        <div className="col-6 col-md-4">
                            <Link onClick={() => { }}
                                to={""}
                                className="btn btn-success me-4 shadow ">
                                Utenti
                            </Link>
                        </div>

                        <div className="col-6 col-md-4">
                            <Link onClick={() => { }}
                                to={"/search/hikes"}
                                className="btn btn-success shadow ">
                                Escursioni
                            </Link>
                        </div>

                    </div>

                </div>}

            </div>

            <Footer />

        </div>
    )

}
export default Search