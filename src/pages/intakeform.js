import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import GenericForm from "../components/GenericForm"

const IntakeForm = () => {
  const [stepOptions, setStepOptions] = useState({})

  const cmsData = useStaticQuery(graphql`
    query cmsData {
      allPrismicWizard {
        nodes {
          data {
            title {
              text
            }
            lead {
              text
            }
            step
            body {
              ... on PrismicWizardDataBodySteps {
                id
                items {
                  step {
                    document {
                      ... on PrismicStepPage {
                        id
                        data {
                          title {
                            text
                          }
                          lead
                          fields {
                            form_field {
                              document {
                                ... on PrismicCheckbox {
                                  id
                                  type
                                  data {
                                    legend {
                                      text
                                    }
                                    options {
                                      label
                                      description {
                                        text
                                      }
                                    }
                                  }
                                  uid
                                }
                                ... on PrismicTextarea {
                                  id
                                  data {
                                    is_required
                                    label
                                    placeholder
                                    required_error_message
                                  }
                                  type
                                  uid
                                }
                                ... on PrismicEmail {
                                  id
                                  data {
                                    invalid_error_message
                                    is_required
                                    label
                                    placeholder
                                    required_error_message
                                  }
                                  type
                                  uid
                                }
                                ... on PrismicText {
                                  id
                                  data {
                                    invalid_error_message
                                    is_required
                                    label
                                    placeholder
                                    required_error_message
                                  }
                                  type
                                  uid
                                }
                                ... on PrismicRadio {
                                  id
                                  type
                                  uid
                                  data {
                                    required_error_message
                                    is_required
                                    legend {
                                      text
                                    }
                                    options {
                                      description {
                                        text
                                      }
                                      option
                                      next_steps_relationships {
                                        document {
                                          ... on PrismicNextStepList {
                                            data {
                                              links {
                                                link_to_subsequent_step {
                                                  document {
                                                    ... on PrismicStepPage {
                                                      id
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const steps = cmsData.allPrismicWizard.nodes[0].data.body.map(stepList =>
    stepList.items.map(step => step.step.document)
  )
  const lead = cmsData.allPrismicWizard.nodes[0].data.lead.text
  const title = cmsData.allPrismicWizard.nodes[0].data.title.text
  const stepWord = cmsData.allPrismicWizard.nodes[0].data.step

  useEffect(()=>{
    const initialStepState = {}
    steps.forEach((step, i)=>{
      initialStepState[`step-${i + 1}`] = 0;
    })
    setStepOptions({...initialStepState})
  },[])


  return (
    <div className="container">
      <h1>{title}</h1>
      <p>{lead}</p>
      {steps.map((step, i) => {
        const data = step.at(stepOptions[`step-${i + 1}`])
        const items = data.data.fields.map((item)=>(item.form_field.document))

        return (
          <GenericForm
            items={items}
            key={data.id}
            index={i}
            title={data.data.title.text}
            lead={data.data.lead}
            stepWord={stepWord}
            setStepOptions={setStepOptions}
            allSteps={steps}
          />
        )
      })}
    </div>
  )
}

export default IntakeForm
