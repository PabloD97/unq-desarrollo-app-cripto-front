import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Form, Alert } from "react-bootstrap";
import { postRegister } from "../api/cryptoactive.api";
import { useTranslation } from "react-i18next";
import NavBarBeginning from "./NavBarBeginning";
import { Formik } from "formik";
import * as yup from "yup";

const Register = () => {
  const { t } = useTranslation();

  const [values, setValues] = useState({});
  const [message, setMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  const [showMessageResponse, setShowMessageResponse] = useState(false);


  const history = useHistory();

  const schema = yup.object().shape({
    name: yup
      .string()
      .required()
      .min(4, `Minimo 4 caracteres`)
      .max(30, `Maximo 30 caracteres`),
    lastname: yup
      .string()
      .required()
      .min(4, `Minimo 4 caracteres`)
      .max(30, `Maximo 30 caracteres`),
    email: yup.string().email().required(),
    direction: yup.string().required().max(30, `Maximo 30 caracteres`),
    password: yup.string().required().min(8, `Minimo 8 caracteres`),
    cvu: yup
      .string()
      .required()
      .length(22, `El valor debe ser de 22 caracteres`),
    wallet: yup
      .string()
      .required()
      .length(8, `El valor debe ser de 8 caracteres`),
  });

  const showMessage = (message, state, alert) => {
    setTypeAlert(alert)
    setMessage(message);
    setShowMessageResponse(state);
    
    setTimeout(() => {
      setShowMessageResponse(!state);
    }, 2000);
  }

  const register = () => {
    postRegister(values)
      .then((response) => {
        setTimeout(() => {
          showMessage(response.data, true, "success")
          history.push("/login");
        }, 1000);
      })
      .catch((error) => {
        showMessage(error.response.data, true, "danger")
      });
  };

  return (
    <>
      <NavBarBeginning />

      <Formik
        validationSchema={schema}
        onSubmit={register}
        initialValues={{
          name: "",
          lastname: "",
          email: "",
          direction: "",
          password: "",
          cvu: "",
          wallet: "",
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
          <Form noValidate onSubmit={handleSubmit}>
            {(showMessageResponse)? <Alert variant={typeAlert}>{message}</Alert> : null}
            <Form.Group className="mb-3">
              <Form.Label>{t("name")}</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={values.name}
                placeholder={t("enterYour") + t("name")}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>{" "}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t("lastname")}</Form.Label>
              <Form.Control
                type="text"
                name="lastname"
                value={values.lastname}
                onChange={handleChange}
                isInvalid={!!errors.lastname}
                placeholder={t("enterYour") + t("lastname")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t("email")} </Form.Label>
              <Form.Control
                type="email"
                placeholder={t("enterYour") + t("email")}
                name="email"
                value={values.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t("address")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("enterYour") + t("address")}
                name="direction"
                onChange={handleChange}
                isInvalid={!!errors.direction}
              />
              <Form.Control.Feedback type="invalid">
                {errors.direction}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t("password")}</Form.Label>
              <Form.Control
                type="password"
                placeholder={t("enterYour") + t("password")}
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>CVU</Form.Label>
              <Form.Control
                type="string"
                placeholder={t("enterYour") + "CVU"}
                name="cvu"
                value={values.cvu}
                onChange={handleChange}
                isInvalid={!!errors.cvu}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cvu}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t("wallet")}</Form.Label>
              <Form.Control
                type="string"
                placeholder={t("enterYour") + t("wallet")}
                name="wallet"
                value={values.wallet}
                onChange={handleChange}
                isInvalid={!!errors.wallet}
              />
              <Form.Control.Feedback type="invalid">
                {errors.wallet}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              type="submit"
              onClick={() => {
                setValues(values);
              }}
            >
              {t("register")}
            </Button>

            <Link to="/login">
              <Button variant="warning">{t("back")}</Button>
            </Link>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Register;
