import React, { useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import i18n from "../translations/i18n";

const NavBarBeginning = () => {
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
          <Navbar.Brand>Crypto-App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
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

export default NavBarBeginning;
