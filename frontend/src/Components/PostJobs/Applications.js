import React, { Component } from "react";
import PostJobNav from "./PostJobNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getAllApplicationsForJob } from "../../Actions/recruiterActions";
import { v4 } from "node-uuid";
import moment from "moment";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import checkValidityRecruiter from "../../Actions/ValidityScript"
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

class RecruiterJobApplications extends Component {

  componentWillMount() {
    checkValidityRecruiter(this);
  }

  constructor(props) {
    super(props);
    this.state = {
      search:"",
      numPages: null,
      pageNumber: 1,

    };
  }

 
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }



  componentDidMount(){
    this.props.getAllApplicationsForJob();
  }



  searchChangeListener = e => {
    this.setState({
      search: e.target.value
    });
  };

  
  render() {
    const { pageNumber, numPages } = this.state;

    let applications = null;
    if (this.props.applicationsState.applications.length) {
      applications = this.props.applicationsState.applications.map(application => {

        return (
          <div  key={v4()} className="dashItem">
            <div  className="card shadow-lg ">
              <div className="card-body">
                <div className="row">
                  <div className="col-5">
                    <h5
                      style={{ fontWeight: "500" }}
                      className="linkBlue"
                      href="/"
                    >
                      {application.first_name}{" "}{application.last_name}
                    </h5>
                    <h5>{application.applicant_email}</h5>
                    <FontAwesomeIcon
                      style={{ color: "#e6e6e6" }}
                      className="fa-map-marker-alt"
                      icon="map-marker-alt"
                    />
                    &nbsp;&nbsp;{application.phone_number} <br />
                    <FontAwesomeIcon
                      style={{ color: "#e6e6e6" }}
                      className="calendar-alt"
                      icon="phone"
                    />
                    &nbsp;&nbsp;{application.address}{" "}
                    <br />
                  </div>
                  <div className="col-4 offset-3 ">
                    <button
                      type="button"
                      className="btn btn-block blueBackground text-white"
                    >
                      <FontAwesomeIcon
                        style={{ color: "#e6e6e6" }}
                        className="scroll"
                        icon="scroll"
                      />
                      &nbsp; View Resume
                    </button>
                    <br/>
                    <button
                      type="button"
                      className="btn btn-block blueBackground text-white"
                    >
                      <FontAwesomeIcon
                        style={{ color: "#e6e6e6" }}
                        className="scroll"
                        icon="user-circle"
                      />
                      &nbsp; View Profile
                    </button>
                
                  </div>
              
                </div>
              </div>
   
            </div>
            <br />
            <br />
          </div>
        );
     
      });


    } else {
      applications = (
        <div className="col-6 offset-3 text-center">
          <br />
          <br />
          <img alt="" src="images/nojobs.png" />
          <br />
          <br />
          <span style={{ fontSize: "150%" }}>
            Sorry, there are no Applications to display.
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

       {/* <div className="container">
          <div className="row">
            <div className="col-6 offset-2">
              <input
                type="text"
                className="form-control form-control-lg shadow-lg"
                placeholder="Search"
                aria-label="Sizing example input"
                onChange={this.searchChangeListener}
              />
            </div>

            <div className="col-2">
              <button
                type="button"
                className="btn btn-block btn-lg blueBackground text-white shadow-lg"
                
              >
                Search
              </button>
            </div>
          </div>
          <br />
        <br />
          <hr/>
          <div className="row">
            <div className="col-10 offset-1">
              <br />
              <br />
              {applications}
            </div>
          </div>
    </div> */}


      <div>
        <Document
          file="http://www.pdf995.com/samples/pdf.pdf"
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>

 
      </div>
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    applicationsState: state.ApplicationsReducer
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { getAllApplicationsForJob }
  )(RecruiterJobApplications)
);




