// Header.js
import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

import { useCustomTheme } from "contexts/CustomThemeContext";

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
