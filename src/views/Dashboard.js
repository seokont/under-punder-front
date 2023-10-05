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
import { addItemsProjects } from "reduce/projectReduce";
import { useSelector, useDispatch } from "react-redux";
import { getUserProjects } from "api/api";
import { createNewProjects } from "api/api";
import { deleteProjects } from "api/api";
import { editItemsProjects } from "reduce/projectReduce";
import { editProjects } from "api/api";
import { useHistory } from 'react-router-dom';


function Dashboard() {
  const history = useHistory();
  const projectItems = useSelector((state) => state.project.items);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [items, setItems] = useState([]);
  const [postEdit, setPostEdit] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [modalType, setModalType] = useState(false);
  useEffect(() => {
    getUserProjects(localStorage.getItem("idUser")).then((response) => {
      dispatch(addItemsProjects(response.data.items));
    });
    // dispatch(addItemsProjects(localStorage.getItem("idUser")))

    // axios
    //   .get(`http://localhost:3000/project/${localStorage.getItem("idUser")}`)
    //   .then((response) => {
    //     setItems(response.data.items);
    //   })
    //   .catch((error) => {
    //     console.error("An error occurred:", error);
    //   });
  }, []);

  const delProject = (id) => {
    deleteProjects(id)
      .then((response) => {
        getUserProjects(localStorage.getItem("idUser")).then((response) => {
          dispatch(addItemsProjects(response.data.items));
        });
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  const editProject = () => {
    editProjects(postEdit)
      .then((response) => {
        getUserProjects(localStorage.getItem("idUser")).then((response) => {
          dispatch(addItemsProjects(response.data.items));
          setModalShow(false);
          setModalType(false);
          setPostEdit({});
        });
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  const handlerFunction = async (e) => {
    e.preventDefault();
    createNewProjects({
      title,
      discription: desc,
      created_by: localStorage.getItem("idUser"),
    })
      .then((response) => {
        getUserProjects(localStorage.getItem("idUser")).then((response) => {
          dispatch(addItemsProjects(response.data.items));
          setModalShow(false);
          setModalType(false);
          setPostEdit({});
        });
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  const getEditModalWindow = (post) => {
    setModalShow(true);
    setModalType(true);
    setPostEdit(post);
  };

  const closeModal = () => {
    setModalShow(false);
    setModalType(false);
    setPostEdit({});
  };

  const redirectProjectId = (post) => {
    history.push({pathname: `/admin/task/${post.id}`, state: {data:post}});
  }

  return (
    <>
      <MyVerticallyCenteredModal
        title={title}
        postEdit={postEdit}
        editProject={editProject}
        setPostEdit={setPostEdit}
        setModalType={setModalType}
        modalType={modalType}
        desc={desc}
        handleLogin={handlerFunction}
        setTitle={setTitle}
        setDesc={setDesc}
        show={modalShow}
        closeModal={closeModal}
      />

      <Container fluid>
        <Button
          style={{ marginBottom: "15px" }}
          variant="primary"
          onClick={() => setModalShow(true)}
        >
          New Project
        </Button>{" "}
        <Row>
          {projectItems.map((post, index) => (
            <Col key={post.id} lg="3" sm="6">
              <Card className="card-stats">
                <Card.Body>
                  <Row>
                    <Col xs="12">
                      <div className="numbers">
                        <p className="card-category">{post.title}</p>
                        <Card.Title as="h4">{post.discription}</Card.Title>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <hr></hr>
                  <div className="stats" onClick={()=>redirectProjectId(post)}>Подробнее</div>
                  <div onClick={() => delProject(post.id)} className="stats">
                    Delete
                  </div>
                  <div
                    className="stats"
                    onClick={() => getEditModalWindow(post)}
                  >
                    Edit
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={props.handleLogin}>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.modalType ? props.postEdit.title : "New Project"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="title"
              value={props.modalType ? props.postEdit.title : props.title}
              onChange={(e) =>
                props.modalType
                  ? props.setPostEdit({
                      ...props.postEdit,
                      title: e.target.value,
                    })
                  : props.setTitle(e.target.value)
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={props.modalType ? props.postEdit.discription : props.desc}
              rows={3}
              onChange={(e) =>
                props.modalType
                  ? props.setPostEdit({
                      ...props.postEdit,
                      discription: e.target.value,
                    })
                  : props.setDesc(e.target.value)
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => props.closeModal()}>Close</Button>
          <Button
            className="mt-4 btn-fill pull-right "
            type={props.modalType ? "button" : "submit"}
            variant="info"
            onClick={() => (props.modalType ? props.editProject() : "")}
          >
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
export default Dashboard;
