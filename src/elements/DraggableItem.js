// DraggableItem.js
import React from "react";
import { useDrag } from "react-dnd";
import Moment from "react-moment";
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

const DraggableItem = ({ task }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "DRAGGABLE_ITEM",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Toast
      key={task.id}
      style={{
        backgroundColor: "#fffbed",
        opacity: isDragging ? 0.5 : 1,
        cursor: "pointer",
      }}
      ref={drag}
    >
      <Toast.Header closeButton={false}>
        <div
          style={{
            display: "grid",
            gridTemplate: "1fr /1fr 1fr",
            width: "100%",
          }}
        >
          <div>
            <strong className="me-auto">#{task.serialNumber}</strong>
          </div>
          <div style={{ justifySelf: "right" }}>
            <small>
              {" "}
              <Moment format="YYYY-MM-DD HH:mm:ss">{task.updatedAt}</Moment>
            </small>
          </div>
        </div>
      </Toast.Header>
      <Toast.Body>
        <h5>
          <strong onClick={() => openReadTask(task)}>{task.title}</strong>
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
  );
};

export default DraggableItem;
