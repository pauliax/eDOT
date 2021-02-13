import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

export function FAQ() {
  return (
    <Accordion defaultActiveKey="0" className="text-left">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          One
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>Hello! Answer here</Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="1">
          Two
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <Card.Body>Hello! Another answer here</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}
