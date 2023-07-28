import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Container, Form, Row, Col } from "react-bootstrap";

import { auth } from "auth/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { CustomInput } from "components/index";
import {
  LoginButton,
  SignInButton,
  GoogleLoginButton,
} from "pages/components/index";

import "./LoginRegisterPage.css";

const RegisterPage = () => {
  const [user, setUser] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
    } catch (error) {
      alert("正しく入力してください");
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
                    <h1>Sign in</h1>
                  </div>
                </Row>
                <Form onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    {/*メールアドレス */}
                    <CustomInput
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
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
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
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
                    {/*サインアップ*/}
                    <SignInButton />
                  </Row>
                </Form>
              </Col>
            </Row>
            {/*ログインとグーグルログイン */}
            <Row className="justify-content-between">
              <Col
                xs={6}
                className="d-flex align-items-center justify-content-end"
              >
                {/*ログインボタン */}
                <LoginButton to={"/login/"}/>
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

export default RegisterPage;
