import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { SmurfContext } from "../contexts/SmurfContext";
import SmurfCard from "./SmurfCard";




function SmurfFormDataGet({ errors, touched, status, setStatus }) {

    const [smurfs, setSmurfs] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:3333/smurfs")
      .then(res => {
        console.log("Server data ->", res)
        setStatus(res.data);
      })
    }, [])

    useEffect(() => {
      if (status) {
        setSmurfs([...smurfs, status]);
      }
    }, [status]);
    return (
    <>
        <SmurfContext.Provider value={{ smurfs }}>
        <Form>
          <label>
            Smurf Name
              <p className="errors">{errors.name}</p>
            <Field type="text" name="name" placeholder="Smurf Name..." />
          </label>
          <label>
            Smurf Age
              <p className="errors">{errors.age}</p>
            <Field type="text" name="age" placeholder="Smurf Age..." />
          </label>
          <label>
            Smurf Height
              <p className="errors">{errors.height}</p>
            <Field type="text" name="height" placeholder="Smurf Height..." />
          </label>
          <button type="submit">Add Smurf</button>
        </Form>
        <SmurfCard />
      </SmurfContext.Provider>
    </>
    )
  }
  
  const Form = withFormik({
    mapPropsToValues: ({ name, age, height }) => {
      return {
        name: "",
        age: "",
        height: ""
      };
    },
    handleSubmit(values, { resetForm, setStatus }) {
      axios
        .post("http://localhost:3333/smurfs", {
          name: values.name,
          age: values.age,
          height: values.height
        })
        .then(response => {
          console.log("response", response);
          window.location.href = window.location.href;
        })
        .catch(function(error) {
          console.log(error);
        });
      resetForm();
    }
  })(TheForm);

  export default Form;