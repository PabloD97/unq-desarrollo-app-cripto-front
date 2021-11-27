import React, { useState, useEffect } from "react";
import Navbar from "./NavBar";
import { getQuotes } from "../api/cryptoactive.api";
import { addActivity } from "../api/activity.api";

import { useTranslation } from "react-i18next";
import { Button, Modal, Form, Table, Alert } from "react-bootstrap";

const Cryptoassets = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [cryptoassets, setCryptoassets] = useState([]);
  const [activity, setActivity] = useState({
    emailUser: localStorage.getItem("email"),
  });
  const [show, setShow] = useState({ open: false });
  const handleClose = () => setShow({ open: false });
  const handleShow = (id, action) => {
    setShow({ open: true, cryptoactive: id, action: action });
    setActivity({ ...activity, action: action, cryptoactive: id });
  };
  const renderAlert=()=> {
      if (showAlert) {

              return (<Alert variant="danger"  >
                  <Alert.Heading>Vaya! Parece que hay un problema con el servidor</Alert.Heading>
                  <p>
                   Intente  en unos minutos.
                  </p>
              </Alert>);
          }

      }

  const [message, setMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  const [showMessageResponse, setShowMessageResponse] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    getCryptoassets();
  }, []);

  const getCryptoassets = () => {
    getQuotes()
      .then((result) => {
        setCryptoassets(result.data);
        setShowAlert(false)
        }).catch( ()=>{setShowAlert(true)})};

  const newActivity = () => {
      addActivity(activity)
        .then((result) => {
          showMessage(result.data, true, "success");
          setTimeout(() => {
            handleClose();
          }, 2000);
        })
        .catch(error =>{
          showMessage(error.response.data, true, "danger");
        });
    };

  const showMessage = (message, state, alert) => {
    setTypeAlert(alert);
    setMessage(message);
    setShowMessageResponse(state);

    setTimeout(() => {
      setShowMessageResponse(!state);
    }, 2000);
  };

  const formatCurrency = (number, locale) => {
    let currencyLocale = "";
    if (locale === "es-AR") currencyLocale = "ARS";
    else currencyLocale = "USD";
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyLocale,
    }).format(number);
  };

  const handleInputChange = (event) => {
    setActivity({ ...activity, [event.target.name]: event.target.value });
  };
  return (
    <>
      <Navbar />

      <h2>{t("listOfCryptoAssets")}</h2>
    {renderAlert()}
      <div>
        <Table className="table" responsive>
          <thead>
            <tr>
              <th>{t("crypto")}</th>
              <th>{t("price") + "USD"}</th>
              <th>{t("price") + "AR"}</th>
              <th>{t("updated")}</th>
              <th>{t("purchase")}</th>
              <th>{t("sell")}</th>
            </tr>
          </thead>
          <tbody>
            {cryptoassets.map((crypto) => {
              return (
                <tr key={crypto.id}>
                  <td>{crypto.symbol}</td>
                  <td>{formatCurrency(crypto.price, "en-US")}</td>
                  <td>{formatCurrency(crypto.priceAr, "es-AR")}</td>
                  <td>{crypto.quoteTime}</td>
                  <td>
                    {" "}
                    <Button
                      variant="outline-primary"
                      onClick={() => handleShow(crypto.symbol, "purchase")}
                    >
                      {t("purchase")}
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="outline-warning"
                      onClick={() => handleShow(crypto.symbol, "sale")}
                    >
                      {t("sell")}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <Modal
        show={show.open}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header >
          <Modal.Title>{t("activity")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {showMessageResponse ? (
              <Alert variant={typeAlert}>{message}</Alert>
            ) : null}
            <Form.Group className="mb-3" onSubmit={handleInputChange}>
              <Form.Label htmlFor="disabledTextInput">
                {t("nameCryptoactive")}
              </Form.Label>
              <Form.Control
                id="disabledTextInput"
                value={show.cryptoactive}
                name="cryptoactive"
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledTextInput">{t("action")}</Form.Label>
              <Form.Control
                id="disabledTextInput"
                value={show.action}
                name="action"
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" onChange={handleInputChange}>
              <Form.Label>{t("amount")}</Form.Label>
              <Form.Control
                placeholder="amount"
                name="cantidad"
                type="number"
                min="0.01"
              />
            </Form.Group>
            <Button variant="secondary" onClick={handleClose}>
              {t("cancel")}
            </Button>
            <Button variant="primary" onClick={newActivity}>
              {t("confirm")}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Cryptoassets;
