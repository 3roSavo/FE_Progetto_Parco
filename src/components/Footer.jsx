import logo from "../assets/IMG_2670.PNG"

const Footer = () => {


    return (


        <div className=" pb-3 pt-3">
            <footer className="mt-5">
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Home</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Features</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Pricing</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">FAQs</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">About</a></li>
                </ul>
                <p className="text-center text-body-secondary"><img
                    src={logo}
                    style={{ width: "100px", height: "65px", borderRadius: "15px", marginRight: "20px" }}
                    alt="logo"
                /> {new Date().getFullYear()} - Parco regionale dei colli euganei</p>
            </footer>
        </div>


    )

}
export default Footer