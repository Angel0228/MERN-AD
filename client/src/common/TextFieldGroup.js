import React from "react";
import PropTypes from "prop-types";

import { FormGroup, Label, Input, FormFeedback } from "reactstrap";

const TextFieldGroup = ({
  name,
  label,
  placeholder,
  value,
  error,
  type,
  onChange,
  disabled
}) => {
  return (
    <FormGroup>
      <Label for={name}>{label}</Label>
      <Input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        invalid={error === undefined ? false : true}
      />
      <FormFeedback>{error}</FormFeedback>
    </FormGroup>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
