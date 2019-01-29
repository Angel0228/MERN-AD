import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Container, Row, Col, Button } from "reactstrap";
import { groupBy } from "lodash";

import { getUserById } from "../../actions/userActions";
import Spinner from "../../common/Spinner";

class UserProfile extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getUserById(this.props.match.params.id);
    }
  }
  render() {
    const { userprofile, loading } = this.props.userprofile;
    let userContent, advertContent, spinnerContent;

    if (
      userprofile.user === undefined ||
      userprofile.advert === undefined ||
      loading
    ) {
      spinnerContent = <Spinner />;
      advertContent = "";
      userContent = "";
    } else {
      const groupedAdverts = groupBy(userprofile.advert, item => item.status);
      let advertSoldCnt;
      advertContent = Object.keys(groupedAdverts).map(key => {
        if (key === "soldout") {
          advertSoldCnt = groupedAdverts[key].length;
        }
        return (
          <Row>
            <Col xs="12">
              <h5>{key}</h5>
            </Col>
            {groupedAdverts[key].map(advert => (
              <Col
                xs="5"
                key={advert._id}
                className="border border-dark mt-3 ml-5"
              >
                <div align="center" className="mt-3">
                  <img src={advert.avatar} alt="" className="rounded-circle" />
                </div>
                <h5>{advert.title}</h5>
                <p>{advert.description}</p>
                <p>Seit:{advert.creationdate}</p>
                <p>
                  <strong>Preis:</strong>
                  {advert.price}
                </p>
                <hr />
                <Col align="right">{key}</Col>
              </Col>
            ))}
            <hr />
          </Row>
        );
      });
      spinnerContent = "";
      userContent = (
        <Row className="mt-3">
          <Col xs="3">
            <img
              src={userprofile.user && userprofile.user.avatar}
              alt=""
              className="rounded-circle"
              width="128"
              height="128"
            />
          </Col>
          <Col xs="9">
            <h3>{userprofile.user && userprofile.user.username}</h3>
            <h5>{userprofile.user && userprofile.user.name}</h5>
            <p>{userprofile.user && userprofile.user.creationdate}</p>
            <p>Anzahl verkoufter Artikel:{advertSoldCnt}</p>
          </Col>
        </Row>
      );
    }

    return (
      <Container>
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
        {spinnerContent}
        {userContent}
        <hr />
        {advertContent}
      </Container>
    );
  }
}

UserProfile.propTypes = {
  getUserById: PropTypes.func.isRequired,
  userprofile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  userprofile: state.userprofile
});

export default connect(
  mapStateToProps,
  { getUserById }
)(UserProfile);
