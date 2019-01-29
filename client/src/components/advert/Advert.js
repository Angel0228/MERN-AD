import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import {
  getAdvertById,
  addCommentToAdvert,
  updateAdvertStatus,
  deleteAdvert
} from "../../actions/advertActions";
import { Container, Row, Col, Button } from "reactstrap";

import TextFieldGroup from "../../common/TextFieldGroup";
import Spinner from "../../common/Spinner";

class Advert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ""
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCommentClick(e, id) {
    e.preventDefault();
    const commentData = {
      comment: this.state.comment
    };
    this.setState({ comment: "" });
    this.props.addCommentToAdvert(id, commentData);
  }

  onBuyClick(id) {
    this.props.updateAdvertStatus(id, this.props.history);
  }

  onUpdateClick(id) {
    this.props.history.push("/advert/update/" + id);
  }

  onDeleteClick(id) {
    this.props.deleteAdvert(id, this.props.history);
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getAdvertById(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (
      nextProps.avert &&
      nextProps.advert.advert === null &&
      this.advert.advert.loading
    ) {
      this.props.history.push("/not-found");
    }
  }
  render() {
    const { errors } = this.state;
    const { advert, loading } = this.props.advert;
    let advertContent, commentContent;
    if (advert && advert.comments === undefined) {
      commentContent = "";
    } else {
      if (advert && advert.comments.length > 0) {
        commentContent = advert.comments.map(comment => (
          <Row key={comment._id}>
            <Col>
              <strong>{comment.userName}:</strong>
              {comment.text}
            </Col>
          </Row>
        ));
      }
    }

    if (advert === null || advert === undefined || loading) {
      advertContent = <Spinner />;
    } else {
      advertContent = (
        <Col className="pt-3">
          <Link to="/" className="btn btn-light">
            Go Back
          </Link>
          <h1 className="display-4 text-center">Anzeige Details</h1>
          <div align="center" className="mt-3">
            <img src={advert.avatar} alt="" className="rounded-circle" />
          </div>
          <h3>{advert.title}</h3>
          <p>{advert.description}</p>
          <span>Seit:{advert.creationdate}</span>
          <Link
            to={`/users/${advert.creator && advert.creator._id}`}
            className="text-dark ml-3"
          >
            <span>
              von:<strong>{advert.creator && advert.creator.username}</strong>
            </span>
          </Link>
          <Row>
            <Col xs="6">
              <span>
                <strong>Preis: {advert.price}</strong>
              </span>
            </Col>
            <Col xs="6">
              <Button
                color="primary"
                onClick={this.onBuyClick.bind(this, advert._id)}
              >
                kaufen
              </Button>
              <Button
                color="success"
                className="ml-3"
                onClick={this.onUpdateClick.bind(this, advert._id)}
              >
                Editieren
              </Button>
              <Button
                color="danger"
                className="ml-3"
                onClick={this.onDeleteClick.bind(this, advert._id)}
              >
                Loschen
              </Button>
            </Col>
          </Row>
          <hr />
          <h3>Kommentare</h3>
          {commentContent}
          <TextFieldGroup
            type="textarea"
            placeholder="Schade, donn eben nic..."
            label=""
            name="comment"
            value={this.state.comment}
            onChange={this.onChange}
            error={errors && errors.comment}
          />
          <Button
            color="primary"
            onClick={e => this.onCommentClick(e, advert._id)}
          >
            Kommentar hinzufugen
          </Button>
        </Col>
      );
    }
    return (
      <div>
        <Container>
          <Row>{advertContent}</Row>
        </Container>
      </div>
    );
  }
}
Advert.propTypes = {
  getAdvertById: PropTypes.func.isRequired,
  advert: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  advert: state.advert,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { getAdvertById, addCommentToAdvert, updateAdvertStatus, deleteAdvert }
)(withRouter(Advert));
