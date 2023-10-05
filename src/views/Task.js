import React from "react";
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
  Toast,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "api/api";
import { addItemsTask } from "reduce/taskReduce";
import Moment from "react-moment";
import { createTasks } from "api/api";
import { deleteTasks } from "api/api";
import { editTaskApi } from "api/api";
import DraggableItem from "elements/DraggableItem";
import DroppableArea from "elements/DroppableArea";

function Task(props) {
  const taskItems = useSelector((state) => state.task.items);
  const id_project = props.location.state.data.id;

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  React.useEffect(() => {
    getTasks(props.location.state.data.id)
      .then((response) => {
        dispatch(addItemsTask(response.data.tasks));
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [items, setItems] = React.useState([]);
  const [postEdit, setPostEdit] = React.useState({});
  const [taskRead, setTaskRead] = React.useState({});
  const [modalType, setModalType] = React.useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowCreateTask, setModalShowCreateTask] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("option1");

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
    setPostEdit({ ...postEdit, statuses: event.target.value });
  };
  const closeModal = () => {
    setModalShow(false);
    setModalType(false);
    setModalShowCreateTask(false);
    setPostEdit({});
  };

  const openReadTask = (task) => {
    setTaskRead(task);
    setModalShow(true);
  };

  const getEditModalWindow = (post) => {
    setModalShowCreateTask(true);
    setModalType(true);
    setPostEdit(post);
  };

  const editTask = () => {
    editTaskApi(postEdit)
      .then((response) => {
        getTasks(props.location.state.data.id).then((response) => {
          dispatch(addItemsTask(response.data.tasks));
          setModalShow(false);
          setModalShowCreateTask(false);
          setModalType(false);
          setPostEdit({});
        });
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  const deleteTask = (id) => {
    deleteTasks(id)
      .then((response) => {
        getTasks(props.location.state.data.id).then((response) => {
          dispatch(addItemsTask(response.data.tasks));
        });
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  const handleDrop = (itemId) => {
    // Найдем индекс элемента, который был сброшен

    const yyy = taskItems
    .filter(
      (k) => k.statuses === "28e09d0e-bf38-4c6f-a787-3ec7e222f227"
    )
    const droppedItemIndex = yyy.findIndex((item) => item.id === itemId);
  
    if (droppedItemIndex !== -1) {
      // Создаем копию массива элементов
      const updatedItems = [...yyy];
  
      // Удаляем сброшенный элемент из массива
      updatedItems.splice(droppedItemIndex, 1);
  
      // Вставляем сброшенный элемент в новую позицию (например, в начало)
      updatedItems.unshift(yyy[droppedItemIndex]);
  
      // Обновляем состояние элементов
      setItems(updatedItems);
    }
  };
  

  const handlerFunction = async (e) => {
    e.preventDefault();
    createTasks({
      title,
      discription: desc,
      created_by: localStorage.getItem("idUser"),
      id_project: id_project,
      deadline: new Date(),
    }).then((response) => {
      getTasks(props.location.state.data.id)
        .then((response) => {
          dispatch(addItemsTask(response.data.tasks));
          setModalShow(false);
          setModalType(false);
          setModalShowCreateTask(false);
          setPostEdit({});
          setTitle("");
          setDesc("");
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    });
  };
  return (
    <>
      <CreateNewModalTask
        title={title}
        postEdit={postEdit}
        editTask={editTask}
        setPostEdit={setPostEdit}
        setModalType={setModalType}
        modalType={modalType}
        desc={desc}
        handleLogin={handlerFunction}
        setTitle={setTitle}
        setDesc={setDesc}
        show={modalShowCreateTask}
        closeModal={closeModal}
        handleRadioChange={handleRadioChange}
        onHide={() => setModalShowCreateTask(false)}
      />

      <ReadTask
        show={modalShow}
        taskRead={taskRead}
        onHide={() => setModalShow(false)}
      />
      <Container fluid>
        <div onClick={() => props.history.goBack()}>Return</div>
        <Button
          style={{ marginTop: "15px" }}
          variant="primary"
          onClick={() => setModalShowCreateTask(true)}
        >
          New Task
        </Button>{" "}
        <Row>
          <Col lg="3" sm="6">
            <h3>Задачі в очікуванні</h3>

            {taskItems
              .filter(
                (k) => k.statuses === "28e09d0e-bf38-4c6f-a787-3ec7e222f227"
              )
              .map((task, index) => (
                <DraggableItem key={task.id} task={task} />
              ))}

            <DroppableArea onDrop={handleDrop} />
          </Col>
          <Col lg="3" sm="6">
            <h3>Виконуються</h3>
            {taskItems
              .filter(
                (k) => k.statuses === "28e09d0e-bf38-4c6f-a787-3ec7e222f228"
              )
              .map((task) => (
                <Toast style={{ backgroundColor: "#ffeded" }} key={task.id}>
                  <Toast.Header closeButton={false}>
                    <div
                      style={{
                        display: "grid",
                        gridTemplate: "1fr /1fr 1fr",
                        width: "100%",
                      }}
                    >
                      <div>
                        <strong className="me-auto">
                          #{task.serialNumber}
                        </strong>
                      </div>
                      <div style={{ justifySelf: "right" }}>
                        <small>
                          <Moment format="YYYY-MM-DD HH:mm:ss">
                            {task.updatedAt}
                          </Moment>
                        </small>
                      </div>
                    </div>
                  </Toast.Header>
                  <Toast.Body>
                    <h5>
                      <strong onClick={() => openReadTask(task)}>
                        {task.title}
                      </strong>
                    </h5>
                    {task.discription.slice(0, 100) + "…"}
                    <hr></hr>
                    <div
                      style={{
                        display: "flex",
                        gap: " 5px",
                        alignItems: "center",
                      }}
                    >
                      <img
                        style={{
                          width: "25px",
                          height: "25px",
                          borderRadius: "50px",
                        }}
                        src="https://media.2x2tv.ru/content/images/2021/02/_00-9.jpg"
                      />
                      <div>dsdsd</div>
                      <div onClick={() => deleteTask(task.id)}>delete</div>
                      <div onClick={() => getEditModalWindow(task)}>edit</div>
                    </div>
                  </Toast.Body>
                </Toast>
              ))}
          </Col>

          <Col lg="3" sm="6">
            <h3>На перевірці</h3>
            {taskItems
              .filter(
                (k) => k.statuses === "28e09d0e-bf38-4c6f-a787-3ec7e222f230"
              )
              .map((task) => (
                <Toast style={{ backgroundColor: "#e6efff" }} key={task.id}>
                  <Toast.Header closeButton={false}>
                    <div
                      style={{
                        display: "grid",
                        gridTemplate: "1fr /1fr 1fr",
                        width: "100%",
                      }}
                    >
                      <div>
                        <strong className="me-auto">
                          #{task.serialNumber}
                        </strong>
                      </div>
                      <div style={{ justifySelf: "right" }}>
                        <small>
                          <Moment format="YYYY-MM-DD HH:mm:ss">
                            {task.updatedAt}
                          </Moment>
                        </small>
                      </div>
                    </div>
                  </Toast.Header>
                  <Toast.Body>
                    <h5>
                      <strong onClick={() => openReadTask(task)}>
                        {task.title}
                      </strong>
                    </h5>
                    {task.discription.slice(0, 100) + "…"}
                    <hr></hr>
                    <div
                      style={{
                        display: "flex",
                        gap: " 5px",
                        alignItems: "center",
                      }}
                    >
                      <img
                        style={{
                          width: "25px",
                          height: "25px",
                          borderRadius: "50px",
                        }}
                        src="https://media.2x2tv.ru/content/images/2021/02/_00-9.jpg"
                      />
                      <div>dsdsd</div>
                      <div onClick={() => deleteTask(task.id)}>delete</div>
                      <div onClick={() => getEditModalWindow(task)}>edit</div>
                    </div>
                  </Toast.Body>
                </Toast>
              ))}
          </Col>

          <Col lg="3" sm="6">
            <h3>Завершенно</h3>
            {taskItems
              .filter(
                (k) => k.statuses === "28e09d0e-bf38-4c6f-a787-3ec7e222f229"
              )
              .map((task) => (
                <Toast style={{ backgroundColor: "#efffed" }} key={task.id}>
                  <Toast.Header closeButton={false}>
                    <div
                      style={{
                        display: "grid",
                        gridTemplate: "1fr /1fr 1fr",
                        width: "100%",
                      }}
                    >
                      <div>
                        <strong className="me-auto">
                          #{task.serialNumber}
                        </strong>
                      </div>
                      <div style={{ justifySelf: "right" }}>
                        <small>
                          <Moment format="YYYY-MM-DD HH:mm:ss">
                            {task.updatedAt}
                          </Moment>
                        </small>
                      </div>
                    </div>
                  </Toast.Header>
                  <Toast.Body>
                    <h5>
                      <strong onClick={() => openReadTask(task)}>
                        {task.title}
                      </strong>
                    </h5>
                    {task.discription.slice(0, 100) + "…"}
                    <hr></hr>
                    <div
                      style={{
                        display: "flex",
                        gap: " 5px",
                        alignItems: "center",
                      }}
                    >
                      <img
                        style={{
                          width: "25px",
                          height: "25px",
                          borderRadius: "50px",
                        }}
                        src="https://media.2x2tv.ru/content/images/2021/02/_00-9.jpg"
                      />
                      <div>dsdsd</div>
                      <div onClick={() => deleteTask(task.id)}>delete</div>
                      <div onClick={() => getEditModalWindow(task)}>edit</div>
                    </div>
                  </Toast.Body>
                </Toast>
              ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}
function CreateNewModalTask(props) {
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

          {props.modalType ? (
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Status</Form.Label>
              <Form.Check
                onChange={props.handleRadioChange}
                value="28e09d0e-bf38-4c6f-a787-3ec7e222f227"
                label="Не назначен"
                name="group1"
                type={"radio"}
                id={`q-1`}
              />
              <Form.Check
                onChange={props.handleRadioChange}
                label="Працюю"
                value="28e09d0e-bf38-4c6f-a787-3ec7e222f228"
                name="group1"
                type={"radio"}
                id={`q-2`}
              />
              <Form.Check
                onChange={props.handleRadioChange}
                name="group1"
                label="На перевірці"
                value="28e09d0e-bf38-4c6f-a787-3ec7e222f230"
                type={"radio"}
                id={`q-3`}
              />
              <Form.Check
                onChange={props.handleRadioChange}
                name="group1"
                label="Виконано"
                value="28e09d0e-bf38-4c6f-a787-3ec7e222f229"
                type={"radio"}
                id={`q-4`}
              />
            </Form.Group>
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => props.closeModal()}>Close</Button>
          <Button
            className="mt-4 btn-fill pull-right "
            type={props.modalType ? "button" : "submit"}
            variant="info"
            onClick={() => (props.modalType ? props.editTask() : "")}
          >
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

function ReadTask(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.taskRead.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.taskRead.discription}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default Task;
