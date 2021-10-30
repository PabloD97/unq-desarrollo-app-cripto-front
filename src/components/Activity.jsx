import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import { getAllActivity } from "../api/activity.api";
import { getQuotes } from "../api/cryptoactive.api";
import { Form, Button, Modal } from "react-bootstrap";
import Navbar from "./NavBar";
import { useTranslation } from "react-i18next";

const Activity = () => {
  const [cryptoassets, setCryptoassets] = useState([]);

  const { t } = useTranslation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [activity, setActivity] = useState([]);

  const getActivities = () => {
    getAllActivity()
      .then((result) => {
        console.log(result);

        setActivity(result.data);
      })
      .catch(console.log);
  };
  useEffect(() => {
    getActivities();
    getCryptoassets();
    console.log(activity);
  }, []);


  const getCryptoassets = () => { getQuotes().then((result) => {  setCryptoassets(result.data);})
      .catch(console.log);
  };


  const formatCurrency = (number, locale) => {
    let currencyLocale = "";
    if (locale === "es-AR")   currencyLocale = "ARS";
    else currencyLocale = "USD";
    return new Intl.NumberFormat(locale, {style: "currency",currency: currencyLocale,}).format(number);
  };

  const cryptoactivePrice = (symbol) => {
    const priceUSD = cryptoassets.find(crypto => crypto.symbol === symbol).price;
    return formatCurrency(priceUSD, "en-US");
  }

  const priceInARS = (symbol, amount) => {
    const crypto = cryptoassets.find(crypto => crypto.symbol === symbol);
    const priceARS = crypto.priceAr;
    return formatCurrency((priceARS * amount), "es-AR"); 
  }
  return (
    <>
      <Navbar />
      <h2>{t("buyAndSell")}</h2>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>{t("numberOfOperations")}</th>
              <th>{t("hour")}</th>
              <th>{t("cryptoassets")}</th>
              <th>{t("amount")}</th>
              <th>{t("quotation")} </th>
              <th>{t("amountIn")}</th>
              <th>{t("name") + " y " + t("lastname")}</th>
              <th>{t("numberOfOperations")}</th>
              <th>{t("reputation")}</th>
              <th>{t("operation")}</th>
              <th>{t("action")}</th>
            </tr>
          </thead>
          <tbody>
            {activity.map((act) => {
              return (
                <tr key={act.id}>
                  <td>{act.id}</td>
                  <td>{act.hour}</td>
                  <td>{act.cryptoactive}</td>
                  <td>{act.cantidad}</td>
                  <td>{cryptoactivePrice(act.cryptoactive)}</td>
                  <td>{priceInARS(act.cryptoactive , act.cantidad)}</td>
                  <td>{act.fullNameUser}</td>
                  <td>{act.numberOperations}</td>

                  <td>{act.reputation}</td>

                  <td>{act.action}</td>
                  <td>
                    {" "}
                    <Button
                      variant="outline-primary"
                      onClick={() => handleShow(crypto.symbol, "purchase")}
                    >
                      {t(act.action)}
                    </Button>
                  </td>
                </tr>
              );
            })}
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Transaccion</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <table className="table">
                  <tbody>
                    <tr key={crypto.id}>
                      <td>Hour</td>
                      <td>10:00</td>
                    </tr>
                    <tr key={crypto.id}>
                      <td>cryptoactive</td>
                      <td>10:00</td>
                    </tr>
                    <tr key={crypto.id}>
                      <td>Monto</td>
                      <td>10:00</td>
                    </tr>
                    <tr key={crypto.id}>
                      <td>Usuario</td>
                      <td>10:00</td>
                    </tr>
                    <tr key={crypto.id}>
                      <td>Cantidad</td>
                      <td>10:00</td>
                    </tr>
                    <tr key={crypto.id}>
                      <td>Reputacion</td>
                      <td>10:00</td>
                    </tr>
                    <tr key={crypto.id}>
                      <td>Envio</td>
                      <td>10:00</td>
                    </tr>
                  </tbody>
                </table>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Effect transfer
                </Button>
              </Modal.Footer>
            </Modal>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Activity;
