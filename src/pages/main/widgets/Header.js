// Header.js
import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

import { useCustomTheme } from "context/style/CustomThemeContext";

import { LogoutButton } from "pages/components";

const Header = ({ handleSelectPage }) => {
  const theme = useCustomTheme().customTheme;

  return (
    <div
      style={{
        ...theme.header,
        height: "60px",
        width: "100%",
      }}
    >
      <Navbar>
        <Container className="d-flex align-items-center">
          {/* HOMEアイコン */}
          <Navbar.Brand href="/" className="navbar-home">
            <img
              src={theme.icons.home}
              height="30"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>

          {/* ログアウトボタン */}
          <Nav className="ms-auto align-items-center justify-content-end">
            <LogoutButton />
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
