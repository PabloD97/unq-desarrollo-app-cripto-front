import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { postLogin } from "../api/cryptoactive.api";
import { useTranslation } from "react-i18next";
import NavBarBeginning from "./NavBarBeginning";
import registerAll from "../script/registerUsers";
import { Formik } from "formik";
import * as yup from "yup";

const Login = () => {
  const { t } = useTranslation();

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
    postLogin(values).then((result) => {
      localStorage.setItem("email", datos.username);
      localStorage.setItem("token", result.data.token);
      var token = localStorage.getItem("token");
      console.log(token);
      alert("logeado con exito");
      history.push("/cryptoassets");
    });
  };

  return (
    <>
      <NavBarBeginning />
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
              <Form.Check type="checkbox" label={t("CheckMeOut")} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={() => {
              setValues(values);
            }}>
              {t("submit")}
            </Button>
            <Link to="/register" >
              <Button variant="secondary">{t("register")}</Button>
            </Link>
          </Form>
        )}
      </Formik>
      <Button variant="danger" onClick={registerAlls}>
        Execute script
      </Button>
    </>
  );
};

export default Login;
