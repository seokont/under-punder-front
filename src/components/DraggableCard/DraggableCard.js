import { ItemTypes } from "elements/ItemTypes";
import React from "react";
import { Card } from "react-bootstrap";
import { useDrag } from "react-dnd";

const DraggableCard = ({ id, title, text, post }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.Card,
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }} className="mb-3">
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
          <div className="stats" onClick={() => redirectProjectId(post)}>
            Подробнее
          </div>
          <div onClick={() => delProject(post.id)} className="stats">
            Delete
          </div>
          <div className="stats" onClick={() => getEditModalWindow(post)}>
            Edit
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default DraggableCard;
