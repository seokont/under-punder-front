import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { addToken } from '../reduce/authReduce';

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useLocation, NavLink } from "react-router-dom";

function Authlogin() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();    
    axios
      .post("http://localhost:5000/auth/login", {
        email,
        password,       
      })
      .then((response) => {
        // setData(response.data);
        // console.log('ddd', jwt.decode(response.data.token))
        dispatch(addToken(response.data))
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('idUser', response.data.id);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  return (
    <>
      <Container fluid>
        <Row
          style={{
            display: "grid",
            justifyItems: "center",
            height: "100vh",
            alignItems: "center",
          }}
        >
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Login</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleLogin}>
                  <Row>
                    
                    <Col className="mt-1" md="6">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Form.Control onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email"
                          type="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col>

                    <Col className="mt-1" md="6">
                      <Form.Group>
                        <label>Password</label>
                        <Form.Control onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          type="password"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mt-1" md="6">
                      <Button
                        className="mt-4 btn-fill pull-right "
                        type="submit"
                        variant="info"
                      >
                        Login
                      </Button>
                    </Col>
                    <Col
                      className="mt-1"
                      md="6"
                      style={{
                        display: "grid",
                        height: "100%",
                        alignSelf: "end",
                        cursor: "pointer",
                      }}
                    >
                      <NavLink
                        to="/auth/register"
                        className="nav-link"
                        activeClassName="active"
                      >
                        or create account
                      </NavLink>
                    </Col>
                  </Row>

                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Authlogin;
