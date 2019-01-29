import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";

class AdvertItem extends Component {
  render() {
    const { advert } = this.props;
    return (
      <Col xs="12" sm="6" md="6">
        <div className="border border-dark p-3 mt-3">
          <div align="center">
            <img src={advert.avatar} alt="" className="rounded-circle" />
          </div>
          <Link to={`/advert/detail/${advert._id}`} className="text-dark">
            <h3>{advert.title}</h3>
          </Link>
          <p>{advert.description}</p>
          <span>Seit:{advert.creationdate}</span>
          <Row>
            <Col xs="4">
              <span>
                <strong>Preis: {advert.price}</strong>
              </span>
            </Col>
            <Col xs="4" />
            <Col xs="4" align="right">
              <Link
                to={`/users/${advert.creator && advert.creator._id}`}
                className="text-dark"
              >
                <span>
                  <strong>{advert.creator.username}</strong>
                </span>
              </Link>
            </Col>
          </Row>
        </div>
      </Col>
    );
  }
}

AdvertItem.propsTypes = {
  advert: PropTypes.object.isRequired
};

export default AdvertItem;
