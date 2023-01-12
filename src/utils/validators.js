/**
 * Validate form data according to the provided schema
 * 
 * @param {Object} formData - The data to be validated.
 * @param {Object} schema - The schema to be used for validation.
 * @returns {Object} - An object containing two properties: 
 *                   - isValid: A boolean indicating whether the data is valid or not.
 *                   - message: An error message if the data is not valid, an empty string otherwise.
 */
const validateFormData = (formData, schema) => {
  const { error } = schema.validate(formData);
  if (error) {
    console.error(error);
    return {
      isValid: false,
      message: error.details[0].message,
    };
  }
  return {
    isValid: true,
    message: "",
  };
};

module.exports = {
  validateFormData,
};
