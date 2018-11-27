import React, { Component } from "react";
import PostJobNav from "./PostJobNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getRecruiterJobs } from "../../Actions/PostJobActions";
import { v4 } from "node-uuid";
import moment from "moment";
class Jobs extends Component {
  componentWillMount() {
    this.props.getRecruiterJobs();
  }

  render() {
    let jobs = null;
    let errors = null;

    if (this.props.jobsState.jobs.length) {
      jobs = this.props.jobsState.jobs.map(job => {
        return (
          <div className="dashItem">
            <div key={v4()} className="card shadow-lg ">
              <div className="card-body">
                <div className="row">
                  <div className="col-3 text-center">
                    <img
                      className="img-thumbnail"
                      alt=""
                      src={job.company_logo}
                      style={{ border: "none", width: "70%" }}
                    />
                  </div>

                  <div className="col-5">
                    <h5
                      style={{ fontWeight: "500" }}
                      className="linkBlue"
                      href="/"
                    >
                      {job.title}
                    </h5>
                    <h5>{job.company}</h5>
                    <FontAwesomeIcon
                      style={{ color: "#e6e6e6" }}
                      className="fa-map-marker-alt"
                      icon="map-marker-alt"
                    />
                    &nbsp;&nbsp;{job.location} <br />
                    <FontAwesomeIcon
                      style={{ color: "#e6e6e6" }}
                      className="calendar-alt"
                      icon="calendar-alt"
                    />
                    &nbsp;&nbsp;{moment(job.expiry_date).format("MM/DD/YYYY")}{" "}
                    <br />
                  </div>
                  <div className="col-4 ">
                    <button
                      type="button"
                      class="btn btn-block blueBackground text-white"
                    >
                      <FontAwesomeIcon
                        style={{ color: "#e6e6e6" }}
                        className="scroll"
                        icon="scroll"
                      />
                      &nbsp; View Applications
                    </button>
                    <br />
                    <br />

                    <button
                      type="button"
                      class="btn btn-block blueBackground text-white"
                    >
                      <FontAwesomeIcon
                        style={{ color: "#e6e6e6" }}
                        className="edit"
                        icon="edit"
                      />
                      &nbsp; Edit Posting{" "}
                    </button>
                  </div>
                  <hr />
                </div>
              </div>
            </div>
            <br />
            <br />
          </div>
        );
      });
    }

    if (this.props.jobsState.jobs.length === 0) {
      errors = (
        <div className="col-6  text-center">
          <br />
          <br />
          <img alt="" src="images/nojobs.png" />
          <br />
          <br />
          <span style={{ fontSize: "150%" }}>
            Sorry, there are no jobs to display.
          </span>
          <br />
          <br /> <br />
          <br />
        </div>
      );
    }

    return (
      <div>
        <PostJobNav />
        <br />
        <br />
        <br />
        <div className="container">
          <div className="row">
            <div className="col-6 offset-2">
              <input
                type="text"
                className="form-control form-control-lg shadow-lg"
                placeholder="Search"
                aria-label="Sizing example input"
              />
            </div>

            <div className="col-2">
              <button
                type="button"
                class="btn btn-block btn-lg blueBackground text-white shadow-lg"
              >
          
                Search
              </button>
            </div>
          </div>
          <br />
        <br />
          <hr/>
          <div className="row">
            {errors}
            <div className="col-10 offset-1">
              <br />
              <br />
              {jobs}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    jobsState: state.ShowJobsReducer
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { getRecruiterJobs }
  )(Jobs)
);
