import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, reduxForm } from "redux-form";
import validate from "./validation";
import {
  renderFieldLarge,
  renderEmploymentType,
  renderJobDescription,
  renderDatePicker
} from "./renderField";
import PostJobNav from "./PostJobNav";

const PostAJobWizardA = props => {
  const { handleSubmit } = props;
  return (
    <div>
      <PostJobNav />
      <br />
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-8">
            <br />
            <br />
            <div class="card shadow-lg">
              <div className="container">
                <br />
                <div style={{ fontSize: "150%" }}>
                  What job do you want to post?
                </div>
                <br />
                <div className="row">
                  <div className="col-4">
                    <Field
                      name="company"
                      type="text"
                      component={renderFieldLarge}
                      label="Company"
                    />
                  </div>
                  <div className="col-4">
                    <Field
                      name="jobtitle"
                      type="text"
                      component={renderFieldLarge}
                      label="Job Title"
                    />
                  </div>
                  <div className="col-4">
                    <Field
                      name="location"
                      type="text"
                      component={renderFieldLarge}
                      label="Location"
                    />
                  </div>
                </div>
                <br />

                <div className="row">
                  <div className="col-8">
                    <Field
                      name="jobfunction"
                      type="text"
                      component={renderFieldLarge}
                      label="Job Function"
                    />
                  </div>

                  <div className="col-4">
                    <Field
                      name="employmenttype"
                      type="text"
                      component={renderEmploymentType}
                      label="Employment Field"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-8">
                    <Field
                      name="companyindustry"
                      type="text"
                      component={renderFieldLarge}
                      label="Company Industry"
                    />
                  </div>

                  <div className="col-4">
                    <Field
                      name="expiry"
                      component={renderDatePicker}
                      label="Valid Through"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <Field
                      name="companylogo"
                      type="text"
                      component={renderFieldLarge}
                      label="Image URL"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <Field
                      name="description"
                      component={renderJobDescription}
                      label="Description"
                      maxLength="1000"
                      rows="6"
                    />
                  </div>
                </div>
                <br />

                <div className="row">
                  <div className=" col-4 offset-4">
                    <button
                      type="button"
                      class="btn blueBackground btn-lg  btn-block text-white"
                    >
                      Add Job
                    </button>
                  </div>
                </div>

                <br />
              </div>
            </div>
          </div>
          <div className="col-4" style={{ fontSize: "90%" }}>
            <br />
            <br />
            <img src="images/bulb.png" style={{ width: "20%" }} />
            <br />
            <br />
            <b>Show your job to the right candidates </b>
            <br /> <br />
            Include more details such as relevant job functions, industries, and
            seniority level to help us advertise your job post to qualified
            candidates and recommend matches for you to reach out to.
          </div>
        </div>
      </div>
    </div>
  );
};

export default reduxForm({
  form: "wizard",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(PostAJobWizardA);
