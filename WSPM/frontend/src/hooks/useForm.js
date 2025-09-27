import { useState } from "react";

/**
 * Generic form handler
 * @param {object} initialValues - default form values
 * @param {function} callback - submit handler
 */
export default function useForm(initialValues, callback) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    callback(values);
    setValues(initialValues); // reset form
  };

  return { values, handleChange, handleSubmit, setValues };
}
