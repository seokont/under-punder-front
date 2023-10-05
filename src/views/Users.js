import React, { useEffect, useState } from "react";
import ChartistGraph from "react-chartist";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Modal,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";
import { getAllUsers } from "api/api";
import { setUsers } from "reduce/userReduce";

function Users() {
  const history = useHistory();
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllUsers()
      .then((response) => {
        dispatch(setUsers(response.data.users));
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  return (
    <>
      <h3>Users</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nickname</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((l, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{l.nickname}</td>
              <td>{l.firstName ? l.firstName : "-"}</td>
              <td>{l.lastName ? l.lastName : "-"}</td>
              <td>{l.email ? l.email : "-"}</td>
              <td>{l.roleId}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Users;
