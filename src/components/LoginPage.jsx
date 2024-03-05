import logo from "../assets/IMG_2670.PNG"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
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

  const [wrongEmail, setWrongEmail] = useState({
    state: false,
    message: ""
  });
  const [wrongPassword, setWrongPassword] = useState({
    state: false,
    message: ""
  });

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
          return response.json()
            .then((errorData) => {
              throw new Error(errorData.message)
            })
        }
      })

      .then((data) => {
        console.log(data)
        localStorage.setItem("token", data.token)
        navigate("/homepage")
      })

      .catch((errorMessage) => {

        if (errorMessage.toString().includes("email")) {

          setWrongEmail({
            message: errorMessage,
            state: true
          })

          setTimeout(() => {
            setWrongEmail({
              message: "",
              state: false
            })
          }, 3000)
        } else {

          setWrongPassword({
            message: errorMessage,
            state: true
          })

          setTimeout(() => {
            setWrongPassword({
              message: "",
              state: false
            })
          }, 3000)

        }

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
  useEffect(() => {
  }, [wrongEmail.state])



  return (

    <div className="row min-vh-100 justify-content-center mx-0 px-0 container-fluid container mx-auto align-items-lg-center ">

      <div className="mx-0 px-0 col-12 col-sm-8 col-md-6 col-lg-4 row justify-content-center overflow-y-scroll sideBar-login">

        <div className="" id="login-form">
          <div className="mt-lg-2">
            <img src={logo} alt="" width="170px" />
          </div>

          <p className="my-auto fs-3 text-center ">Voglia di camminare? <br></br>
            Sei nel posto giusto!</p>

          {loading && <div className="text-center"><Spinner animation="border" style={{ color: "rgb(62, 118, 206)" }} /></div>}

          <p className=" fw-bold mt-4 fs-4 text-center mb-1">Login</p>

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
            {wrongEmail.state && <div className="validation-login">email errata!</div>}
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

            {wrongPassword.state && <div className="validation-login">password errata!</div>}

            <div className="my-3"><button className="btn btn-success rounded-5 w-100 mt-3">Login</button></div>
          </form>
          <p className="text-end">
            oppure

            <span onClick={handleShow} className="btn-register"> registrati</span>

          </p>

        </div>

      </div>

      <Carousel fade
        className="d-none d-lg-block col-lg-8 px-0 login-carousel"
        indicators={false}
        controls={false}
        interval={3500}>
        <Carousel.Item>
          <Carousel.Caption>
            <h3 className="bg-black d-inline bg-opacity-50 px-3 rounded-4">Pianoro del Mottolone</h3><br></br>
            <p className="bg-black d-inline bg-opacity-50 px-3 rounded-4">il balcone sui colli Euganei</p>
          </Carousel.Caption>
          <img className="login-carousel-imgs" src="https://res.cloudinary.com/diklzegyw/image/upload/v1709631892/Progetto_Parco/foto%20caroselli%20statici/colli-euganei-hd_gzwaqy.jpg"
            alt="first-img-carousel" />
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.Caption>
            <h3 className="bg-black d-inline bg-opacity-50 px-3 rounded-4">Vigneti di Teolo</h3><br></br>
            <p className="bg-black d-inline bg-opacity-50 px-3 rounded-4">immersi in un paesaggio mozzafiato</p>
          </Carousel.Caption>
          <img className="login-carousel-imgs" src="https://res.cloudinary.com/diklzegyw/image/upload/v1709634213/Progetto_Parco/foto%20caroselli%20statici/122946998-529960ea-bf17-4265-8ea9-4982faa157a8_djmn4m.jpg"
            alt="second-img-carousel" />
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.Caption>
            <h3 className="bg-black d-inline bg-opacity-50 px-3 rounded-4">Castello Carrarese</h3><br></br>
            <p className="bg-black d-inline bg-opacity-50 px-3 rounded-4">Un'imponente fortificazione per il controllo del territorio</p>
          </Carousel.Caption>
          <img className="login-carousel-imgs" src="https://res.cloudinary.com/diklzegyw/image/upload/v1709634216/Progetto_Parco/foto%20caroselli%20statici/este-castello-hd_gozblk.jpg"
            alt="third-img-carousel" />
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.Caption>
            <h3 className="bg-black d-inline bg-opacity-50 px-3 rounded-4">Cinto Euganeo</h3><br></br>
            <p className="bg-black d-inline bg-opacity-50 px-3 rounded-4">acquedotti romani e ruderi alle sue sommità</p>
          </Carousel.Caption>
          <img className="login-carousel-imgs" src="https://res.cloudinary.com/diklzegyw/image/upload/v1709631891/Progetto_Parco/foto%20caroselli%20statici/storia-dei-colli-euganei_ppxu43.jpg"
            alt="fourth-img-carousel" />
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.Caption>
            <h3 className="bg-black d-inline bg-opacity-75 px-3 rounded-4">Monselice, città fortificata</h3><br></br>
            <p className="bg-black d-inline bg-opacity-75 px-3 rounded-4">atmosfera tipica di un borgo medievale</p>
          </Carousel.Caption>
          <img className="login-carousel-imgs" src="https://res.cloudinary.com/diklzegyw/image/upload/v1709634216/Progetto_Parco/foto%20caroselli%20statici/monselice-hd_sgwg5d.jpg"
            alt="8-img-carousel" />
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.Caption>
            <h3 className="bg-black d-inline bg-opacity-75 px-3 rounded-4">Castello del Catajo</h3><br></br>
            <p className="bg-black d-inline bg-opacity-75 px-3 rounded-4">brulicante di vita</p>
          </Carousel.Caption>
          <img className="login-carousel-imgs" src="https://res.cloudinary.com/diklzegyw/image/upload/v1709645981/Progetto_Parco/foto%20caroselli%20statici/castello-del-catajo-hd_vrdzzx.jpg"
            alt="5-img-carousel" />
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.Caption>
            <h3 className="bg-black d-inline bg-opacity-50 px-3 rounded-4">Cascata Schivanoia</h3><br></br>
            <p className="bg-black d-inline bg-opacity-50 px-3 rounded-4">Uno dei siti naturalistici più suggestivi del comprensorio euganeo</p>
          </Carousel.Caption>
          <img className="login-carousel-imgs" src="https://res.cloudinary.com/diklzegyw/image/upload/v1709639267/Progetto_Parco/foto%20caroselli%20statici/calto-contea_26_ejiev1.jpg"
            alt="6-img-carousel" />
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.Caption>
            <h3 className="bg-black d-inline bg-opacity-50 px-3 rounded-4">Monte Venda</h3><br></br>
            <p className="bg-black d-inline bg-opacity-50 px-3 rounded-4">con i resti del monastero degli Olivetani</p>
          </Carousel.Caption>
          <img className="login-carousel-imgs" src="https://res.cloudinary.com/diklzegyw/image/upload/v1709631882/Progetto_Parco/foto%20caroselli%20statici/2023-02-12-MONTE-VENDA-3_fbcq2h.jpg"
            alt="7-img-carousel" />
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.Caption>
            <h3 className="bg-black d-inline bg-opacity-50 px-3 rounded-4">Villa Barbarigo</h3><br></br>
            <p className="bg-black d-inline bg-opacity-50 px-3 rounded-4">splendida dimora signorile nel cuore dei colli</p>
          </Carousel.Caption>
          <img className="login-carousel-imgs" src="https://res.cloudinary.com/diklzegyw/image/upload/v1709634220/Progetto_Parco/foto%20caroselli%20statici/villa-barbarigo-hd_nurylk.jpg"
            alt="8-img-carousel" />
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