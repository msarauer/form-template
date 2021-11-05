import React from "react"
import { ErrorMessage, useField } from "formik"

const TextInput = ({ isRequired, label, type, placeholder, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <div className="mb-4">
      <label htmlFor={field.name}>{label}</label>
      <input
        className={`form-control ${meta.touched && meta.error && "is-invalid"}`}
        {...field}
        id={field.name}
        name={field.name}
        placeholder={placeholder}
        type={type}
        aria-invalid={meta.touched && meta.error ? "true" : null}
        aria-describedby={
          meta.touched && meta.error ? `${field.name}-error` : null
        }
        aria-required={isRequired}
      />
      <ErrorMessage name={field.name}>
        {msg => (
          <div id={`${field.name}-error`} className="error">
            {msg}
          </div>
        )}
      </ErrorMessage>
    </div>
  )
}

export default TextInput
