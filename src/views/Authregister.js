import React, { useState } from "react";
import axios from "axios";
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
function Authregister() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();    
    axios
      .post("http://localhost:5000/auth/register", {
        email,
        password,
        nickname: username,
        first_name: firstName,
        second_name: secondName,
        last_name: lastName,
        phone: "",
        photo: "",
      })
      .then((response) => {
        setData(response.data);
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
                <Card.Title as="h4">Register</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleLogin}>
                  <Row>
                    <Col className="mt-1" md="6">
                      <Form.Group>
                        <label>Username</label>
                        <Form.Control
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Username"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="mt-1" md="6">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Form.Control
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email"
                          type="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mt-1" md="4">
                      <Form.Group>
                        <label>First Name</label>
                        <Form.Control
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="First Name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="mt-1" md="4">
                      <Form.Group>
                        <label>Last Name</label>
                        <Form.Control
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Last Name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="mt-1" md="4">
                      <Form.Group>
                        <label>Second Name</label>
                        <Form.Control
                          onChange={(e) => setSecondName(e.target.value)}
                          placeholder="Second Name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mt-1" md="6">
                      <Form.Group>
                        <label>Password</label>
                        <Form.Control
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          type="password"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="mt-1" md="6">
                      <Form.Group>
                        <label>Re-Password</label>
                        <Form.Control
                          placeholder="Re-Password"
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
                        Register
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
                        to="/auth/login"
                        className="nav-link"
                        activeClassName="active"
                      >
                        return login
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

export default Authregister;
