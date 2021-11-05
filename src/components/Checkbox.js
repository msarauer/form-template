import { useField } from "formik"
import React from "react"

const Checkbox = ({ label, description, name, index, type }) => {
  const [field] = useField({ value: label, name, type })
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type={type}
        {...field}
        id={`${name}-checkbox-${index}`}
        aria-describedby={`${name}-checkbox-${index}-description`}
      />
      <label className="form-check-label" htmlFor={`${name}-checkbox-${index}`}>
        {label}
      </label>
      <div className="help-block" id={`${name}-checkbox-${index}-description`}>
        {description}
      </div>
    </div>
  )
}

export default Checkbox
