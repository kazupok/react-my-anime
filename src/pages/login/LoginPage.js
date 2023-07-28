import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Container, Form, Row, Col } from "react-bootstrap";

import { auth } from "auth/firebaseConfig";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import { CustomInput } from "components/index";
import {
  LoginButton,
  SignInButton,
  GoogleLoginButton,
} from "pages/components/index";

import "./LoginRegisterPage.css";

const LoginPage = () => {
  const [user, setUser] = useState();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (error) {
      alert("メールアドレスまたはパスワードが間違っています");
    }
  };

  return (
    <>
      {user ? (
        <Navigate to={`/`} />
      ) : (
        <div className="login-register-container">
          <Container>
            <Row className="justify-content-center">
              <Col xs={12} sm={8} md={6}>
                <Row>
                  <div className="text-center mb-4" style={{ color: "white" }}>
                    <h1>Login</h1>
                  </div>
                </Row>
                <Form onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    {/*メールアドレス */}
                    <CustomInput
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      id="email"
                      placeholder="EMAIL"
                      name="email"
                      type="email"
                      required
                      backgroundColor="transparent"
                      borderColor="white"
                      color="white"
                      placeholderColor="grey"
                      className="oval-input in-font-size-l in-pad-m"
                    />
                  </Row>
                  <Row className="mb-5">
                    {/*パスワード */}
                    <CustomInput
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      id="password"
                      placeholder="PASSWORD"
                      name="password"
                      type="password"
                      required
                      backgroundColor="transparent"
                      borderColor="white"
                      color="white"
                      placeholderColor="grey"
                      className="oval-input in-font-size-l in-pad-m"
                    />
                  </Row>

                  <Row className="justify-content-center mb-5">
                    {/*ログインボタン */}
                    <LoginButton />
                  </Row>
                </Form>
              </Col>
            </Row>
            {/*サインアップとグーグルログイン */}
            <Row className="justify-content-between">
              <Col
                xs={6}
                className="d-flex align-items-center justify-content-end"
              >
                {/*サインアップ*/}
                <SignInButton to={"/register/"}/>
              </Col>
              <Col
                xs={6}
                className="d-flex align-items-center justify-content-start"
              >
                {/*グーグルログイン*/}
                <GoogleLoginButton />
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default LoginPage;
