import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export const renderFieldLarge = ({
  input,
  label,
  maxLength,
  type,
  meta: { touched, error }
}) => (
  <div>
    <label style={{ fontSize: "14px" }}>{label}</label>
    <div>
      <input
        {...input}
        placeholder={label}
        type={type}
        className="form-control form-control-lg jodField"
        maxLength={maxLength}
      />
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  </div>
);

const types = [
  "Full-Time",
  "Part-Time",
  "Contract",
  "Temporary",
  "Voluntary",
  "Internship"
];

export const renderEmploymentType = ({
  input,
  label,
  meta: { touched, error }
}) => (
  <div>
    <label style={{ fontSize: "14px" }}>{label}</label>
    <div>
      <select {...input} className="form-control form-control-lg jodField">
        <option value="">Choose One</option>
        {types.map(val => (
          <option value={val} key={val}>
            {val}
          </option>
        ))}
      </select>
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  </div>
);

export const renderJobDescription = ({
  input,
  rows,
  maxLength,
  label,
  maxlength,
  type,
  meta: { touched, error }
}) => (
  <div>
    <label style={{ fontSize: "14px" }}>{label}</label>

    <div>
      <textarea
        {...input}
        placeholder={label}
        type={type}
        className="form-control form-control-lg jodField"
        maxLength={maxLength}
        rows={rows}
      />{" "}
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  </div>
);

export const renderDatePicker = ({
  input,
  label,
  placeholder,
  defaultValue,
  meta: { touched, error }
}) => (
  <div>
    <label style={{ fontSize: "14px" }}>{label}</label>

    <div>
      <DatePicker
        {...input}
        className="form-control form-control-lg jodField "
        dateForm="MM/DD/YYYY"
        selected={input.value ? moment(input.value) : null}
      />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);
