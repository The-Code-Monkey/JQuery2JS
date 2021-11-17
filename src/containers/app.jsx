import React, { useState } from "react";
import { Form, Button, Input } from "reactstrap";

import { convert, clearVanillaJS } from '../modules/convert';

const App = () => {
  const [value, setValue] = useState('$(".people").hide()');
  const [converted, setConverted] = useState('');

  const handleSubmit = () => {
    setConverted(convert(value));
    clearVanillaJS()
  }

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <div className={"container vh-100 w-100"}>
        <div className={"row justify-content-center mt-5"}>
          <div className={"col-12 mt-5"}>
            <h1 className={"w-100"}>Jquery 2 JS</h1>
            <p className={"w-100 mt-4"}>
              Ever wanted to turn that pesky Jquery into js well now you can!
            </p>
          </div>
          <div className={"col-12 mt-5"}>
            <div className={"row mt-5"}>
              <Form className={"w-100 mt-5"} onSubmit={e => e.preventDefault()}>
                <div className={"col-12 mt-5"}>
                  <Input
                    id="exampleText"
                    name="text"
                    type="textarea"
                    required
                    value={value}
                    onChange={handleChange}
                  />
                </div>
                <div className={"col"}>
                  <Button
                    className={"btn btn-success btn-block mt-5"}
                    style={{ height: 100, borderRadius: 20 }}
                    type="button"
                    onClick={handleSubmit}
                  >
                    Convert
                  </Button>
                </div>
              </Form>
            </div>
          </div>
          <div className={"col-12 mt-5"}>
            {converted !== null && (
              <textarea
                value={converted}
              />
            )}
          </div>
        </div>
      </div>
  )
}

export default App;