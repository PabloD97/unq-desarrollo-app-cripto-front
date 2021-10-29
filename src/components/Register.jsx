import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { postRegister } from "../api/cryptoactive.api";
import { useTranslation } from "react-i18next";
import NavBarBeginning from "./NavBarBeginning";

const Register = () => {
  const { t } = useTranslation();

  const [datos, setDatos] = useState({
    name: "",
    lastname: "",
    email: "",
    direction: "",
    password: "",
    cvu: "",
    wallet: "",
  });
  const handleInputChange = (event) => {

    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const history = useHistory();

  const register = (e) => {
    e.preventDefault();
    postRegister(datos)
      .then((result) => {
        setTimeout(() => {
          alert("registrado con exito");
          history.push("/login");
        }, 5000);
      })
      .catch(console.log);
  };
  return (
    <>
      <NavBarBeginning />
      <Form onSubmit={register}>
        <Form.Group className="mb-3" onChange={handleInputChange}>
          <Form.Label>{t("name")}</Form.Label>
          <Form.Control
            type="string"
            placeholder={t("enterYour") + t("name")}
            name="name"
          />
        </Form.Group>
        <Form.Group className="mb-3" onChange={handleInputChange}>
          <Form.Label>{t("lastname")}</Form.Label>
          <Form.Control
            type="string"
            placeholder={t("enterYour") + t("lastname")}
            name="lastname"
          />
        </Form.Group>
        <Form.Group className="mb-3" onChange={handleInputChange}>
          <Form.Label>{t("email")} </Form.Label>
          <Form.Control type="email" placeholder={t("enterYour") + t("email")} name="email" />
        </Form.Group>
        <Form.Group className="mb-3" onChange={handleInputChange}>
          <Form.Label>{t("address")}</Form.Label>
          <Form.Control
            type="string"
            placeholder={t("enterYour") + t("address")}
            name="direction"
          />
        </Form.Group>
        <Form.Group className="mb-3" onChange={handleInputChange}>
          <Form.Label>{t("password")}</Form.Label>
          <Form.Control
            type="password"
            placeholder={t("enterYour") + t("password")}
            name="password"
          />
        </Form.Group>
        <Form.Group className="mb-3" onChange={handleInputChange}>
          <Form.Label>CVU</Form.Label>
          <Form.Control type="string" placeholder={t("enterYour") + "CVU"} name="cvu" />
        </Form.Group>
        <Form.Group className="mb-3" onChange={handleInputChange}>
          <Form.Label>{t("wallet")}</Form.Label>
          <Form.Control
            type="string"
            placeholder={t("enterYour") + t("wallet")}
            name="wallet"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {t("register")}
        </Button>
        <Link to="/login">
          <Button variant="warning">{t("back")}</Button>
        </Link>
      </Form>
    </>
  );
};

export default Register;
