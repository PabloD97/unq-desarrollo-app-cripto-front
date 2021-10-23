import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import { postLogin } from "../api/cryptoactive.api";
import Register from "./Register";
import { useTranslation } from "react-i18next";
import i18n from "./../translations/i18n";

const Login = () => {
  const { t } = useTranslation();

  const [language, setLanguage] = useState("en");

  const [datos, setDatos] = useState({
    username: "",
    password: "",
  });

  const handleOnclick = (e) => {
    e.preventDefault();
    setLanguage(e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const history = useHistory();

  const login = (event) => {
    event.preventDefault();
    postLogin(datos).then((result) => {
      localStorage.setItem("token", result.data.token);
      var token = localStorage.getItem("token");
      console.log(token);
      alert("logeado con exito");
      history.push("/cryptoassets");
    });
  };

  return (
    <>
      <Form onSubmit={login}>
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
          onChange={handleInputChange}
        >
          <Form.Label>{t("register")}</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="username"
          />
          <Form.Text className="text-muted">{t("warning")}.</Form.Text>
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          onChange={handleInputChange}
        >
          <Form.Label>{t("password")}</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label={t("CheckMeOut")} />
        </Form.Group>
        <Button variant="primary" type="submit">
          {t("submit")}
        </Button>
        <Link to="/register">
          <Button variant="secondary">{t("register")}</Button>
        </Link>
      </Form>

      <div>
        {t("changeLanguage")}
        <div>
          <Button variant="success" value="es" onClick={handleOnclick}>
            es
          </Button>
          <Button variant="warning" value="en" onClick={handleOnclick}>
            en
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
