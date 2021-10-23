

import {Link} from "react-router-dom";

import React, {  useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import { getQuotes } from "../api/cryptoactive.api"
import {Card,Button} from 'react-bootstrap';
import '../styles/Home.css';

function CardHome(props) {
const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


    return (
        <>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={props.img} class="card" />
          <Card.Body >
            <Card.Title>{props.title}</Card.Title>
            <Card.Text class="body">
              {props.description}
            </Card.Text>
          </Card.Body>
          <Card.Footer class="footer" >
                      <Link to = {props.redirectButton}>
                      <Button variant="primary" class="go">Ir a la seccion</Button>
                      </Link>
          </Card.Footer>

        </Card>
       </>
    )
}

export default CardHome;