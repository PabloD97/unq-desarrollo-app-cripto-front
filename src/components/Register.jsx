import React,{useState}from "react";
import {Link, useHistory} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import { postRegister } from "../api/cryptoactive.api"

const Register = () => {
    const [datos, setDatos] = useState({
        name: '',
        lastname: '',
        email:'',
        direction:'',
        password:'',
        cvu:'',
        wallet:''
    })
    const handleInputChange = (event) => {
         console.log(event.target.name)
         console.log(event.target.value)
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    const history = useHistory();

    const register = (e) => {
        e.preventDefault();
        postRegister(datos).then((result) => {
        setTimeout(() => {
            alert("registrado con exito")
            history.push('/login')
        }, 5000);
           
        })
            .catch(console.log);
    };
    return (
        <>

                <Form onSubmit={register}>
                    <Form.Group className="mb-3"  onChange={handleInputChange} >
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="string" placeholder="Ingrese su nombre" name="name" />
                    </Form.Group>
                    <Form.Group className="mb-3"   onChange={handleInputChange}>
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control type="string" placeholder="Ingrese su nombre" name="lastname"/>
                    </Form.Group>
                    <Form.Group className="mb-3"   onChange={handleInputChange}>
                    <Form.Label>Email </Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email"/>
                    </Form.Group>
                    <Form.Group className="mb-3"   onChange={handleInputChange}>
                        <Form.Label>Direccion</Form.Label>
                        <Form.Control type="string" placeholder="Ingrese su direccion" name="direction"/>
                    </Form.Group>
                    <Form.Group className="mb-3"  onChange={handleInputChange}>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Ingrese su contraseña"  name="password" />
                </Form.Group>
                    <Form.Group className="mb-3"   onChange={handleInputChange}>
                        <Form.Label>CVU</Form.Label>
                        <Form.Control type="string" placeholder="Ingrese su CVU" name="cvu"/>
                    </Form.Group>
                    <Form.Group className="mb-3"   onChange={handleInputChange}>
                        <Form.Label>Billetera</Form.Label>
                        <Form.Control type="string" placeholder="Ingrese su Billetera" name="wallet" />
                    </Form.Group>

                <Button variant="primary" type="submit">
                    Registrarme
                </Button>
                <Link to = "/login">
                     <Button variant="warning">
                         Back
                    </Button>
                </Link>
            </Form>
        </>
    )
}

export default Register;