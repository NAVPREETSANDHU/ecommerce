import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";

//Skeleton of Product Card
function Skeleton() {
  return (
    <div className="d-flex justify-content-around">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="/place.jpg" />
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={12} />
          </Placeholder>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Skeleton;
