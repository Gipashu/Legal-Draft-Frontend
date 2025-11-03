import React from 'react';
import { Form } from 'react-bootstrap';
import { useField } from 'formik';
import '../../Components/CSS/CheckboxField.css';

const CheckboxField = ({ 
  label, 
  helpText, 
  name,
  checked,
  onChange,
  className = '',
  ...props 
}) => {
  // Try to use Formik's useField if available
  let field, meta;
  try {
    [field, meta] = useField({ 
      name,
      type: 'checkbox',
      ...props
    });
  } catch (e) {
    // If not in Formik context, use local state
    field = {
      name,
      checked: checked,
      onChange: onChange || (() => {})
    };
    meta = { error: null, touched: false };
  }

  const isInvalid = meta.touched && meta.error;
  
  return (
    <Form.Group className={`mb-3 custom-checkbox ${className}`} controlId={name}>
      <Form.Check
        type="checkbox"
        label={label}
        isInvalid={isInvalid}
        checked={field.checked}
        onChange={field.onChange}
        name={field.name}
        {...props}
      />
      {helpText && <Form.Text className="text-muted">{helpText}</Form.Text>}
      {isInvalid && (
        <Form.Control.Feedback type="invalid">
          {meta.error}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default CheckboxField;
