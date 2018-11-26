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
    if (this.props.jobsState.jobs.length) {
      jobs = this.props.jobsState.jobs.map(job => {
        return (
          <div key={v4()} className="card shadow-lg">
            <div className="row">
              <div className="col-4">
                <img
                  className="img-thumbnail"
                  alt=""
                  style={{ border: "none" }}
                />
              </div>
              <div className="col-8">
                <h4>{job.title}</h4>
                &nbsp;&nbsp;&nbsp;&nbsp;Company <br />
                &nbsp;&nbsp;&nbsp;&nbsp;Expiry <br />
                <FontAwesomeIcon
                  color="#dee2e6"
                  size="sm"
                  icon="location-arrow"
                />
                Place <br />
                <br />
              </div>
              <hr />
            </div>
          </div>
        );
      });
    } else {
      jobs = (
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
            <div className="col-12">
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
