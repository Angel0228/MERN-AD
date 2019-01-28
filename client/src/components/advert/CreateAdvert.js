import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
class CreateAdvert extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col className="pt-3">
            <h1 className="display-4 text-center">Anzeige erstellen</h1>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CreateAdvert;
