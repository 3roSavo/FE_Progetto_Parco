import logo from "../assets/IMG_2670.PNG"
import foto1 from "../assets/colli-euganei-hd.jpg"
import foto2 from "../assets/vini-dei-colli-euganei.jpg"
import foto3 from "../assets/download.jpeg"
import foto4 from "../assets/istockphoto-1078986424-612x612.jpg"
import foto5 from "../assets/Escursioni-800.jpg"
import foto6 from "../assets/euganei.jpg"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Button, Carousel, Form, Modal, Spinner } from "react-bootstrap"


const LoginPage = () => {

  const navigate = useNavigate()

  const [logincredentials, setLoginCredentials] = useState({
    "email": "",
    "password": ""
  })

  const [register, setRegister] = useState({
    "username": "",
    "email": "",
    "password": ""
  })

  const [loading, setLoading] = useState(false)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getLogin = (e) => {
    e.preventDefault()

    fetch("http://localhost:3001/auth/login", {

      method: "POST",

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(logincredentials)
    })

      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("Errore nella login")
        }
      })

      .then((data) => {
        console.log(data)
        localStorage.setItem("token", data.token)
        navigate("/homepage")
      })

      .catch((err) => {
        return err;
      });
  }

  const registerUser = () => {

    setLoading(true)

    fetch("http://localhost:3001/auth/register", {

      method: "POST",

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(register)
    })

      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("Errore nella registrazione")
        }
      })

      .then((data) => {
        setTimeout(() => {

          console.log(data)
          alert("Registrazione avvenuta con successo")
          setLoginCredentials({
            email: register.email,
            password: register.password
          })
          setLoading(false)
        }, 1000)

      })

      .catch(err => {
        setLoading(false)
        console.log(err)
        alert("Problema nella registrazione")
      })
  }



  return (

    <div className="row min-vh-100 justify-content-center mx-0 px-0 container-fluid container mx-auto align-items-lg-center ">

      <div className="mx-0 px-0 col-12 col-sm-8 col-md-6 col-lg-4 row justify-content-center overflow-y-scroll sideBar-login">

        <div className="" id="login-form">
          <div className="mt-lg-2">
            <img src={logo} alt="" width="170px" />
          </div>

          <p className=" my-auto fs-3">Voglia di camminare? <br></br>
            Sei nel posto giusto!</p>

          {loading && <div className="text-center"><Spinner animation="border" style={{ color: "rgb(62, 118, 206)" }} /></div>}

          <p className=" fw-bold mt-4 fs-4 ">Login</p>

          <form className="" onSubmit={getLogin}>
            <label htmlFor="inputEmail" className="d-block mb-2">Email</label>
            <input
              id="inputEmail"
              className="rounded-4 px-2 py-1 w-100 input-login"
              type="email"
              placeholder="inserisci email"
              value={logincredentials.email}
              onChange={(e) => {
                setLoginCredentials({
                  ...logincredentials,
                  email: e.target.value
                })
              }}
              required />
            <label htmlFor="inputPassword" className="d-block my-2">password</label>
            <input
              id="inputPassword"
              className="rounded-4 px-2 py-1 w-100 input-login"
              type="password"
              placeholder="inserisci password"
              value={logincredentials.password}
              onChange={(e) => {
                setLoginCredentials({
                  ...logincredentials,
                  password: e.target.value
                })
              }}
              required />

            <div className="my-3"><button className="btn btn-success rounded-5 w-100 mt-4 mb-3">Login</button></div>
          </form>
          <p className="text-end">
            oppure

            <span onClick={handleShow} className="btn-register"> registrati</span>

          </p>

        </div>

      </div>

      <Carousel fade className="d-none d-lg-block col-lg-8 px-0 login-carousel">
        <Carousel.Item>
          <img className="login-carousel-imgs" src={foto1} alt="first-img-carousel" />
          <Carousel.Caption>
            <h3>First slide label</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="login-carousel-imgs" src={foto2} alt="second-img-carousel" />
          <Carousel.Caption>
            <h3>Second slide label</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="login-carousel-imgs" src={foto3} alt="third-img-carousel" />
          <Carousel.Caption>
            <h3>Third slide label</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Modal show={show} onHide={handleClose}>

        <div className="modal-settings">
          <Modal.Header closeButton>
            <Modal.Title>Registrazione</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>User name</Form.Label>
                <Form.Control
                  className="bg-transparent"
                  type="text"
                  placeholder="Inserisci qui"
                  autoFocus
                  value={register.username}
                  onChange={(e) => {
                    setRegister({
                      ...register,
                      username: e.target.value
                    })
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Indirizzo e-mail</Form.Label>
                <Form.Control
                  className="bg-transparent"
                  type="text"
                  placeholder="name@example.com"
                  value={register.email}
                  onChange={(e) => {
                    setRegister({
                      ...register,
                      email: e.target.value
                    })
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="bg-transparent"
                  placeholder="Inserisci qui"
                  type="password"
                  value={register.password}
                  onChange={(e) => {
                    setRegister({
                      ...register,
                      password: e.target.value
                    })
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Chiudi
            </Button>
            <Button variant="primary" onClick={() => {
              handleClose()
              registerUser()
            }}>
              Registrati!
            </Button>
          </Modal.Footer>
        </div>
      </Modal>


    </div>

  )

}

export default LoginPage;