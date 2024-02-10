import logo from "../assets/parco-colli-euganei-logo.jpg"
import foto1 from "../assets/colli-euganei-hd.jpg"
import foto2 from "../assets/vini-dei-colli-euganei.jpg"
import foto3 from "../assets/download.jpeg"
import foto4 from "../assets/istockphoto-1078986424-612x612.jpg"
import foto5 from "../assets/Escursioni-800.jpg"
import foto6 from "../assets/euganei.jpg"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"


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
        console.log(data)
        alert("Registrazione avvenuta con successo")
        navigate("/homepage")

      })

      .catch(err => {
        console.log(err)
        alert("Problema nella registrazione")
      })
  }



  return (

    <div className="row min-vh-100">

      <div className="col-12 col-lg-4 pe-lg-3 ps-lg-4 d-flex d-lg-block justify-content-center">

        <div className="" id="login-form">
          <div className="mt-lg-2">
            <img src={logo} alt="" width="170px" />
          </div>

          <p className=" my-auto fs-3">Voglia di camminare? <br></br>
            Sei nel posto giusto!</p>

          <p className=" fw-bold mt-4 fs-4 ">Login</p>




          <form className="" onSubmit={getLogin}>
            <label className="d-block mb-2">Email</label>
            <input
              className="rounded-3 px-2 py-1 w-100"
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
            <label className="d-block my-2">password</label>
            <input
              className="rounded-3 px-2 py-1 w-100"
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
          <p className="text-end">oppure

            <span onClick={handleShow} className="btn-register"> registrati</span>

          </p>

        </div>

      </div>

      <div id="carouselExampleSlidesOnly" className="px-0 carousel slide col-lg-8 col-md-7 d-none d-lg-block" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active vh-100">
            <img src={foto1} className="d-block vw-100 h-100 d-block" style={{ objectPosition: 'center' }} alt="..." />
          </div>
          <div className="carousel-item vh-100">
            <img src={foto2} className="d-block vw-100 h-100 d-block " style={{ objectPosition: 'center' }} alt="..." />
          </div>
          <div className="carousel-item vh-100">
            <img src={foto3} className="d-block vw-100 h-100" style={{ objectPosition: 'center' }} alt="..." />
          </div>
          <div className="carousel-item vh-100">
            <img src={foto4} className="d-block vw-100 h-100" style={{ objectPosition: 'center' }} alt="..." />
          </div>
          <div className="carousel-item vh-100">
            <img src={foto5} className="d-block vw-100 h-100" style={{ objectPosition: 'center' }} alt="..." />
          </div>
          <div className="carousel-item vh-100">
            <img src={foto6} className="d-block vw-100 h-100" style={{ objectPosition: 'center' }} alt="..." />
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registrazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>User name</Form.Label>
              <Form.Control
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
              <Form.Label>Indirizzo email</Form.Label>
              <Form.Control
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
            Invia
          </Button>
        </Modal.Footer>
      </Modal>


    </div>

  )

}

export default LoginPage;