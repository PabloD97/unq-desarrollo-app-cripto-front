import React, { useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import i18n from "./../translations/i18n";

const NavBar = () => {
  //TODO: Arreglar que al cambiar d epantalla no se vuelva al idioma "en"
  const [language, setLanguage] = useState("en");

  const { t } = useTranslation();

  const [text, setText] = useState(t("changeLanguage"));

  const handleOnclick = (e) => {
    e.preventDefault();
    setLanguage(e.target.value);
    i18n.changeLanguage(e.target.value);
    setText(t("changeLanguage"));
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand >Crypto-App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">{t("home")}</Nav.Link>
              <Nav.Link href="/activities">{t("activities")}</Nav.Link>
              <Nav.Link href="/userslist">{t("usersList")}</Nav.Link>
              <Nav.Link href="/cryptoassets">{t("cryptoassets")}</Nav.Link>
            </Nav>
            <Nav>
              
              <Nav.Link href="/">{t("logOut")}</Nav.Link>
              <NavDropdown title={text} id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.2">
                  <Button variant="success" value="es" onClick={handleOnclick}>
                    es
                  </Button>
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  <Button variant="success" value="en" onClick={handleOnclick}>
                    en
                  </Button>
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
