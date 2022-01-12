import { useField } from "formik"
import React from "react"
import '../styles/radio-checkbox.scss'

const Radio = ({ label, description, name, index, type }) => {
  const [field] = useField({ name, type, value: label })

  return (
    <div className="form-check radio-item">
      <input
        {...field}
        type={type}
        id={`${name}-radio-${index}`}
        aria-describedby={`${name}-radio-${index}-description`}
      />
      <label className="radio-label form-check-label" htmlFor={`${name}-radio-${index}`}>
        {label}
      </label>
      <div className="help-block" id={`${name}-radio-${index}-description`}>
        {description}
      </div>
    </div>
  )
}

export default Radio
