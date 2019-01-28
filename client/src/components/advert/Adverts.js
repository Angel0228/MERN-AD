import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { getAdverts } from "../../actions/advertActions";

import AdvertItem from "../advert/AdvertItem";
import Spinner from "../../common/Spinner";

import { Container, Row, Col, Button } from "reactstrap";

class Adverts extends Component {
  componentDidMount() {
    this.props.getAdverts();
  }

  onCreateClick() {
    this.props.history.push("/advert/create");
  }

  render() {
    const { adverts, loading } = this.props.advert;
    let advertItems;

    if (adverts === null || adverts === undefined || loading) {
      advertItems = <Spinner />;
    } else {
      if (adverts.length > 0) {
        advertItems = adverts.map(advert => (
          <AdvertItem key={advert._id} advert={advert} />
        ));
      } else {
        advertItems = <h4>No Adverts found...</h4>;
      }
    }
    return (
      <Container>
        <Row>
          <Col className="pt-3">
            <h1 className="display-4 text-center">
              Ubersicht aller Kleinanzeigen
            </h1>
          </Col>
        </Row>
        <Row>{advertItems}</Row>
        <Button
          color="primary"
          className="mt-3"
          onClick={this.onCreateClick.bind(this)}
        >
          Neue Kleinanzeige erstellen
        </Button>
      </Container>
    );
  }
}

Adverts.propTypes = {
  getAdverts: PropTypes.func.isRequired,
  advert: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  advert: state.advert
});

export default connect(
  mapStateToProps,
  { getAdverts }
)(withRouter(Adverts));
