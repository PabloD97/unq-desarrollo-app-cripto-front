import React from "react";
import {useHistory} from "react-router-dom";
import CardHome from "./CardHome";
import transacciones from '../img/transacciones.jpeg';
import cotizacion from '../img/cotizacion.jpg';
import generarActividad from '../img/generarActividad.jpg';
import consumirActividad from '../img/consumirActividad.jpg';
import {CardGroup,Button} from 'react-bootstrap';
import  Navbar  from "./NavBar";

const Home = () => {



    return (
        <>
        <Navbar/>
        <h1>Home </h1>
        <CardGroup>
            <CardHome title="Cotizacion"
                      description="En esta sección usted podra ver la cotizacion del mercado"
                      img={cotizacion}
                      redirectButton="/cryptoassets"/>
            <CardHome title="Listado de actividades compra/venta"
                      description="Mire el listado de actividades de otros usuarios que estan a la espera
                                    un nuevo comprador/vendedor y elija la mejor opción "
                      img={consumirActividad}
                      redirectButton="/activities"/>
            <CardHome title="Nueva actividad compra/venta"
                      description="Cree una nueva actividad de compra/venta para encontrar a el mejor vendedor/comprador"
                      img={generarActividad}/>
            <CardHome title="Listado de transacciones"
                      description="En esta seccion usted podra finalizar las transacciones con su comprador/vendedor"
                      img={transacciones}
                      redirectButton=""/>
        </CardGroup>
        </>
    )
}

export default Home;