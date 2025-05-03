import React from 'react';

const FormInput = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  autoComplete = 'off'
}) => {
  return (
    <div className="form-floating mb-3">
      <input
        type={type}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
      />
      <label htmlFor={name}>{label}</label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default FormInput; 