import React, { useState, useEffect } from "react";
import Navbar from "./NavBar";
import { getQuotes } from "../api/cryptoactive.api";
import { useTranslation } from "react-i18next";
import { Button, Modal } from "react-bootstrap";

const Cryptoassets = () => {
  const [show, setShow] = useState({open:false});

  const handleClose = () => setShow({open:false,id:""});
  const handleShow = (id) => setShow({open:true,id:id});

  const { t } = useTranslation();

  const [cryptoassets, setCryptoassets] = useState([]);

  useEffect(() => {
    getCryptoassets();
  }, []);

  const getCryptoassets = () => {
    getQuotes()
      .then((result) => {
        setCryptoassets(result.data);
      })
      .catch(console.log);
  };

  const formatCurrency = (number, locale) => {
    let currencyLocale = "";

    if (locale === "es-AR") {
      currencyLocale = "ARS";
    } else {
      currencyLocale = "USD";
    }
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyLocale,
    }).format(number);
  };

  return (
    <>
      <Navbar />
      <h2>{t("listOfCryptoAssets")}</h2>
      <div>
        <table className="table">
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
                    <Button variant="outline-primary" onClick={() => handleShow(crypto.symbol)}>
                      {t("purchase")}
                    </Button>
                  </td>
                  <td>
                    {" "}
                    <Button variant="outline-warning">{t("sell")}</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal
        show={show.open}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("activity")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{show.id}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("cancel")}
          </Button>
          <Button variant="primary" onClick={handleClose}>
            {t("confirm")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cryptoassets;
