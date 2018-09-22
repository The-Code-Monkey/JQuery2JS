import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Form, Button } from "reactstrap";

import { convert, clearConverted } from '../modules/convert';

const required = value => (value ? undefined : "Required");

class App extends React.Component {
  onSubmit = values => {
    this.props.dispatch(clearConverted());
    // window.setTimeout(() => {
      this.props.dispatch(convert(values))
    // }, 2000);
  };

  render() {
    const { props } = this;
    const { handleSubmit, converted } = props;
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
              <Form className={"w-100 mt-5"} onSubmit={handleSubmit(this.onSubmit)}>
                <div className={"col-12 mt-5"}>
                  <Field
                    name={"data"}
                    component={"textarea"}
                    validate={required}
                  />
                </div>
                <div className={"col"}>
                  <Button
                    className={"btn btn-success btn-block mt-5"}
                    style={{ height: 100, borderRadius: 20 }}
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
    );
  }
}

App = reduxForm({
  form: "JqueryToJsForm"
})(App);

const mapState = state => ({
  converted: state.convert.converted,
  initialValues: {
    data: '$(".people").hide()'
  }
});

export default connect(mapState)(App);
