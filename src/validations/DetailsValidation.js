import * as yup from "yup";

const DetailsValidation = (data) => {
  if (data) {
    let obj = {};
    console.log('items',data)
    data.map((input) => {
      if (input.type === "email") {
        if (input.data.is_required) {
          return (obj = {
            ...obj,
            [input.uid]: yup
              .string()
              .email(input.data.invalid_error_message)
              .required(input.data.required_error_message),
          });
        }
        return (obj = {
          ...obj,
          [input.uid]: yup
            .string()
            .email(input.data.invalid_error_message),
        });
      }
      if (input.data.is_required) {
        return (obj = {
          ...obj,
          [input.uid]: yup
            .string()
            .required(input.data.required_error_message),
        });
      }
      return (obj = {
        ...obj,
        [input.uid]: yup.string(),
      });
    });

    const detailsSchema = yup.object().shape(obj);
    return detailsSchema;
  }
  return null;
};

export default DetailsValidation;
