import { useField } from "formik"
import React from "react"

const Radio = ({ label, description, name, index, type }) => {
  const [field] = useField({ name, type, value: label })

  return (
    <div className="form-check">
      <input
        className="form-check-input"
        {...field}
        type={type}
        id={`${name}-radio-${index}`}
        aria-describedby={`${name}-radio-${index}-description`}
      />
      <label className="form-check-label" htmlFor={`${name}-radio-${index}`}>
        {label}
      </label>
      <div className="help-block" id={`${name}-radio-${index}-description`}>
        {description}
      </div>
    </div>
  )
}

export default Radio
