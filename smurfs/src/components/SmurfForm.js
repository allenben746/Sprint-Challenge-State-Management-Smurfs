import React, { useState, useEffect, useContext } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { SmurfContext } from "../contexts/SmurfContexts";
import SmurfDisplay from "./SmurfDisplay";


function SmurfFormDataGet({ errors, touched, status, setStatus }) {

    const [smurfs, setSmurfs] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:3333/smurfs")
      .then(res => {
        console.log("Server data ->", res)
        setStatus(res.data);
        setSmurfs(res.data);
      })
    }, [])

    // useEffect(() => {
    //   if (status) {
    //     setSmurfs([...smurfs, status]);
    //   }
    // }, [status]);
    return (
        <>
        <SmurfContext.Provider value={{ smurfs }}>
          <Form>
            <label>
              Smurf Name
              {touched.name && errors.name && (
                <p className="errors">{errors.name}</p>
              )}
              <Field type="text" name="name" placeholder="Smurf Name..." />
            </label>
            <label>
              Smurf Age
              {touched.age && errors.age && (
                <p className="errors">{errors.age}</p>
              )}
              <Field type="text" name="age" placeholder="Smurf Age..." />
            </label>
            <label>
              Smurf Height
              {touched.height && errors.height && (
                <p className="errors">{errors.height}</p>
              )}
              <Field type="text" name="height" placeholder="Smurf Height..." />
            </label>
            <button type="submit">Smurf Addition</button>
          </Form>
          <SmurfDisplay smurfs={smurfs}/>
        </SmurfContext.Provider>
      </>
    )
  }
  
  const SmurfForm = withFormik({
    mapPropsToValues: ({ name, age, height }) => {
      return {
        name: "",
        age: "",
        height: ""
      };
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(3, "Smurf name must be at least 3 characters")
        .required("Name is required"),
      age: Yup.string().required("Age is required"),
      height: Yup.string().required("Height is required")
    }),
    handleSubmit(values, { resetForm, setStatus }) {
      axios
        .post("http://localhost:3333/smurfs", {
          name: values.name,
          age: values.age,
          height: values.height
        })
        .then(res => {
          console.log("Server response ->", res.data);
          const { smurfList } = useContext(SmurfContext);
        })
        .catch(function(error) {
          console.log(error);
        });
      resetForm();
    }
  })(SmurfFormDataGet);

  export default SmurfForm;