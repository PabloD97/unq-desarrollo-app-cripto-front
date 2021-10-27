import React, {  useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import { getQuotes } from "../api/cryptoactive.api"
import {Form,Button,Modal} from 'react-bootstrap';
import  Navbar  from "./NavBar";
import { useTranslation } from "react-i18next";

const Activity = () => {

  const { t } = useTranslation();

const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


    return (
        <>
        <Navbar/>
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

                <tr key={crypto.id}>
                  <td>un campo</td>
                  <td>un campo</td>
                  <td>un campo</td>
                  <td>un campo</td>
                  <td>un campo</td>
                  <td>un campo</td>
                  <td>un campo</td>
                  <td>un campo</td>
                  <td>un campo</td>
                  <td>un campo</td>

                  <td><Button variant="primary" onClick={handleShow}> Accion</Button></td>
                </tr>
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
    )
}

export default Activity;