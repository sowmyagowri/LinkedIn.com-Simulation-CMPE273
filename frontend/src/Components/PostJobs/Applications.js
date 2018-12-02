import React, { Component } from "react";
import PostJobNav from "./PostJobNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getRecruiterJobs } from "../../Actions/recruiterActions";
import { v4 } from "node-uuid";
import moment from "moment";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

class Jobs extends Component {
  componentWillMount() {
    this.props.getRecruiterJobs();
  }

  state = {
    numPages: null,
    pageNumber: 1
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div>
        <PostJobNav />

        <div className="container">
          <br />
          <br />
          <br />

          <div className="card shadow-lg">
            <div className="card-body">
              <div className="row">
                <div className="col-1">
                  <img
                    src="http://via.placeholder.com/80"
                    className="float-left"
                    alt=""
                  />
                </div>

                <div className="col-4">
                  <h5 className="card-title">John Doe</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Position</h6>
                  <h6 className="card-subtitle mb-2 ">Date of Application</h6>
                </div>
                <div className="col-4 offset-3">
                  <button
                    type="button"
                    data-toggle="modal"
                    data-target="#ResumeModal"
                    className="btn btn-block blueBackground text-white"
                  >
                    {" "}
                    <FontAwesomeIcon
                      style={{ color: "#e6e6e6" }}
                      className="scroll"
                      icon="scroll"
                    />{" "}
                    &nbsp; View Resume
                  </button>
                  <button
                    type="button"
                    className="btn btn-block blueBackground text-white"
                  >
                    <FontAwesomeIcon
                      style={{ color: "#e6e6e6" }}
                      className="user-circle"
                      icon="user-circle"
                    />{" "}
                    &nbsp; View Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade bd-example-modal-lg"
          id="ResumeModal"
          tabindex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="row">
                <div className="col-8 offset-1">
                  <Document
                    classname="jodField"
                    file="Resume_AkhileshAnand.pdf"
                    onLoadSuccess={this.onDocumentLoadSuccess}
                  >
                    <Page pageNumber={pageNumber} />
                  </Document>
                </div>
              </div>
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
