import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FormGroup,
  Input,
  Label
} from "reactstrap";

import TextFieldGroup from "../../common/TextFieldGroup";
import {
  getCategories,
  getCategoriesById
} from "../../actions/categoryActions";
import { updateAdvert, getAdvertById } from "../../actions/advertActions";

class EditAdvert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      price: "",
      category: [],
      description: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const advertData = {
      title: this.state.title,
      price: this.state.price,
      categoryTypes: this.state.category.join(","),
      description: this.state.description
    };

    this.props.updateAdvert(
      this.props.match.params.id,
      advertData,
      this.props.history
    );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeCategory(e, value) {
    console.log(e.target.checked);
    const i = this.state.category.indexOf(value);

    if (i < 0) {
      this.setState({
        category: this.state.category.concat(value)
      });
    } else {
      this.setState({
        category: this.state.category.filter(item => item !== value)
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.advert.advert) {
      const advert = nextProps.advert.advert;

      //Set component fields state
      this.setState({
        title: advert.title,
        price: advert.price,
        description: advert.description
      });
    }

    if (nextProps.category.category) {
      const category = nextProps.category.category;
      let categoryItems = [];
      if (category && category.length > 0) {
        category.map(category => categoryItems.push(category.categoryType));
        this.setState({
          category: categoryItems
        });
      } else {
        this.setState({
          category: []
        });
      }
    }
  }

  componentDidMount() {
    this.props.getCategories();
    this.props.getAdvertById(this.props.match.params.id);
    this.props.getCategoriesById(this.props.match.params.id);
  }

  render() {
    const { errors } = this.state;
    const { categories } = this.props.category;
    let categoryItems;
    console.log(this.state.category);
    if (categories && categories.length > 0) {
      console.log(categories);
      categoryItems = categories.map(category => (
        <Col md={6} key={category._id}>
          <FormGroup check>
            <Input
              type="checkbox"
              name="category"
              id={category._id}
              value={category._id}
              checked={this.state.category.includes(category._id)}
              onChange={e => this.onChangeCategory(e, category._id)}
            />
            <Label for={category._id} check>
              {category.name}
            </Label>
          </FormGroup>
        </Col>
      ));
    } else {
      categoryItems = <h4>No Category found...</h4>;
    }
    return (
      <Container>
        <Row>
          <Col className="pt-3">
            <Link to="/" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Anzeige editieren</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="Enter the Title"
                label="* Titel"
                name="title"
                value={this.state.title}
                onChange={this.onChange}
                error={errors.title}
              />
              <Row form className="mb-3">
                {categoryItems}
              </Row>
              <TextFieldGroup
                placeholder="Enter the Price"
                label="* Preis($)"
                name="price"
                value={this.state.price}
                onChange={this.onChange}
                error={errors.price}
              />
              <TextFieldGroup
                type="textarea"
                placeholder="Enter the Description"
                label="* Beschreibung"
                name="description"
                value={this.state.description}
                onChange={this.onChange}
                error={errors.description}
              />
              <Col align="right">
                <Button type="submit" color="primary">
                  Erstellen
                </Button>
              </Col>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

EditAdvert.propTypes = {
  advert: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  advert: state.advert,
  category: state.category,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCategories, updateAdvert, getAdvertById, getCategoriesById }
)(withRouter(EditAdvert));
