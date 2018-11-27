import React, { Component } from "react";
import PostJobNav from "./PostJobNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getRecruiterJobs } from "../../Actions/PostJobActions";
import { v4 } from "node-uuid";

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
          <div key={v4()} className="card shadow-lg">
            <div className="card-body">
              <div className="row">
                <div className="col-4">
                  <img
                    className="img-thumbnail"
                    alt=""
                    style={{ border: "none" }}
                  />
                </div>
                <div className="col-8">
                  <h5
                    style={{ fontWeight: "500" }}
                    className="linkBlue"
                    href="/"
                  >
                    {job.title}
                  </h5>
                  <h5>Company</h5>
                  <FontAwesomeIcon
                    style={{ color: "#e6e6e6" }}
                    className="fa-map-marker-alt"
                    icon="map-marker-alt"
                  />
                  &nbsp;&nbsp;Place <br />
                </div>
                <hr />
              </div>
            </div>
          </div>
        );
      });
    }

    if (this.props.jobsState.jobs.length === 0) {
      errors = (
        <div className="col-6 offset-3 text-center">
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
            {errors}
            <div className="col-5">
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
