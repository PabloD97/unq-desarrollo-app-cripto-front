import React, {  useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import { getQuotes } from "../api/cryptoactive.api"
import {Form,Button} from 'react-bootstrap';

const TransactionEffect = () => {



    return (
        <>
        <h2>Compra/Venta</h2>
        <div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>

      </>
    )
}

export default TransactionEffect;