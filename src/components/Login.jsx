import React ,{useState}from "react";
import {Link, useHistory} from "react-router-dom";
import {Form,Button} from 'react-bootstrap';
import { postLogin } from "../api/cryptoactive.api"
import Register from "./Register";

const Login = () => {

 const [datos, setDatos] = useState({
        username:'',
        password:''

    })
    const handleInputChange = (event) => {
         setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
      }


    const history = useHistory();

    const login = (event) => {
        event.preventDefault();
        postLogin(datos).then((result) => {
            localStorage.setItem("token", result.data.token);
            var token=localStorage.getItem("token")
            console.log(token)
            alert("logeado con exito")
            history.push('/cryptoassets')
        })

    };

    return (
        <>
            <Form onSubmit={login}>
                <Form.Group className="mb-3" controlId="formBasicEmail" onChange={handleInputChange}>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="username"/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword" onChange={handleInputChange}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Link to ="/register" >                  
                    <Button variant="secondary">
                        Register
                    </Button>
                </Link>
            </Form>
        </>
    )
}

export default Login;