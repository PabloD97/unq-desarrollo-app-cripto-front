import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button,Alert,Card,Image  } from "react-bootstrap";
import { postLogin } from "../api/cryptoactive.api";
import { useTranslation } from "react-i18next";
import NavBarBeginning from "./NavBarBeginning";
import registerAll from "../script/registerUsers";
import { Formik } from "formik";
import * as yup from "yup";
import imgUser from "../img/user.png"

const Login = () => {
  const { t } = useTranslation();
    const [showAlert, setShowAlert] = useState(false);
    const [showLoginOK, setShowLoginOk] = useState(false);

    const [values, setValues] = useState({});
    const [datos, setDatos] = useState({
    username: "",
    password: "",
  });

  const schema = yup.object().shape({
    username: yup.string().email().required(),
    password: yup.string().required().min(8, `Minimo 8 caracteres`),
  });

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const registerAlls = () => {
    registerAll();
  };
  const history = useHistory();

  const login = () => {
    setDatos(values);

    postLogin(values).then((result) => {
      localStorage.setItem("email", values.username);
      localStorage.setItem("token", result.data.token);
      var token = localStorage.getItem("token");

        console.log(token);
        setTimeout(() => {
            console.log("1 Segundo esperado")
        }, 10000);
        history.push("/cryptoassets");
    }).catch(()=>{setShowAlert(true)})


  };
const renderAlert=()=> {
    if (showAlert) {

            return (<Alert variant="danger"  >
                <Alert.Heading>Vaya! Parece que tenes un error en tus credenciales!</Alert.Heading>
                <p>
                    Verifique si sus datos son correctos y vuelva a intentarlo, si el problema persiste contactese con
                    el
                    administrador.
                </p>
            </Alert>);
        }

    }

  return (<div       class="row justify-content-center">

      <NavBarBeginning />



          <Card  style={{ width: '50rem',height:'57rem',marginTop:"5rem"}} bg='secondary'>
              <Card.Img as={Image} src={imgUser} fluid={true} alt="Card image" />

              {renderAlert()}

      <Formik
        validationSchema={schema}
        onSubmit={login}
        initialValues={{
          username: "",
          password: "",
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group
              className="mb-3"
              controlId="formBasicEmail"
            >
              <Form.Label>{t("email")}</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="username"
                value={values.username}
                onChange={handleChange}
                isInvalid={!!errors.username}
              />
              <Form.Text className="text-muted">{t("warning")}.</Form.Text>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formBasicPassword"
            >
              <Form.Label>{t("password")}</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">

            </Form.Group>

              <div class="row justify-content-center">
            <Button variant="dark" type="submit" onClick={() => {setValues(values);}} >
              {t("submit")}
            </Button>

              <Button variant="dark" style={{marginTop:'0.5rem'}} onClick={() => {history.push("/register");}}>{t("register")}  </Button>
                  <Button variant="danger" onClick={registerAlls} style={{marginTop:'0.5rem'}}>
                      Execute script
                  </Button>
              </div>


          </Form>
        )}
      </Formik>
    <Card.Footer>

    </Card.Footer>
          </Card>
          </div>
  );
};

export default Login;
