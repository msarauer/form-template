import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik"
import TextInput from "./TextInput"
import TextArea from "./TextArea"
import Checkbox from "./Checkbox"
import Radio from "./Radio"
import DetailsValidation from "../validations/DetailsValidation"
import '../styles/styles.scss'

const Logger = ({ options, allSteps, setStepOptions, currentIndex, name }) => {
  const { values } = useFormikContext()
  useEffect(() => {
    const nextId = options.find(option => values[`${name}`] === option.option)
    if (nextId) {
      if (nextId.next_steps_relationships.document) {
        const nextSteps = nextId.next_steps_relationships.document.data.links
        const nextPages = []

        for (let i = 0; i < nextSteps.length; i++) {
          nextPages.push(
            allSteps[i + currentIndex + 1].findIndex(step => {
              return (
                nextSteps[i].link_to_subsequent_step.document.id === step.id
              )
            })
          )
        }
        setStepOptions(prev => {
          const newItem = {}
          for (let i = 0; i < nextPages.length; i++) {
            newItem[`step-${currentIndex + i + 2}`] = nextPages[i]
          }
          const newState = { ...prev, ...newItem }
          return newState
        })
      }
    }
  }, [values[`${name}`]])
  return null
}

const GenericForm = ({
  items,
  index,
  title,
  lead,
  stepWord,
  setStepOptions,
  allSteps,
}) => {
  const [initialValues, setInitialValues] = useState({})
  const onSubmit = values => {
    console.log(values)
  }

  const schema = DetailsValidation(items)

  useEffect(() => {
    setInitialValues(prev => {
      const obj = { ...prev }
      items.map(item => {
        obj[item.uid] = ""
      })
      return obj
    })
  }, [])

  return (
    <div>
      <h2>{`${stepWord} ${index + 1} - ${title}`}</h2>
      <p>{lead}</p>
      {Object.keys(initialValues).length > 0 && (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={schema}
        >
          <Form className="mb-5">
            {items.map((item, i) => {
              if (item.type === "email") {
                return (
                  <Field
                    as={TextInput}
                    name={item.uid}
                    type="email"
                    placeholder={item.data.placeholder}
                    label={item.data.label}
                    isRequired={true}
                  />
                )
              }
              if (item.type === "text") {
                return (
                  <Field
                    as={TextInput}
                    name={item.uid}
                    type="text"
                    placeholder={item.data.placeholder}
                    label={item.data.label}
                    isRequired={true}
                  />
                )
              }
              if (item.type === "textarea") {
                return (
                  <Field
                    as={TextArea}
                    name={item.uid}
                    placeholder={item.data.placeholder}
                    label={item.data.label}
                    isRequired={true}
                  />
                )
              }

              if (item.type === "radio") {
                return (
                  <div className="mb-4" role="group">
                    <legend>{item.data.legend.text}</legend>
                    <Logger
                      options={item.data.options}
                      allSteps={allSteps}
                      setStepOptions={setStepOptions}
                      currentIndex={index}
                      name={item.uid}
                    />
                    {item.data.options.map((option, innerIndex) => (
                      <Field
                        as={Radio}
                        label={option.option}
                        value={option}
                        type="radio"
                        description={option.description.text}
                        index={innerIndex}
                        name={item.uid}
                        key={innerIndex}
                      />
                    ))}
                    <ErrorMessage name={item.uid}>
                      {msg => (
                        <div id={`${item.uid}-error`} className="error">
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
                )
              }
              if (item.type === "checkbox") {
                return (
                  <div className="mb-4" role="group">
                    {item.data.options.map((option, innerIndex) => (
                      <Field
                        as={Checkbox}
                        label={option.label}
                        type="checkbox"
                        description={option.description.text}
                        index={innerIndex}
                        name={item.uid}
                        key={innerIndex}
                      />
                    ))}
                  </div>
                )
              }
            })}

            <button type="submit">Submit</button>
          </Form>
        </Formik>
      )}
    </div>
  )
}

export default GenericForm
