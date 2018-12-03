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
import URI from "../../constants/URI"
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
      resumeUrl:""

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
        if(application.first_name.includes(this.state.search) ||  application.last_name.includes(this.state.search) ){
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
                  <br/> 
                    <button
                      type="button"
                      className="btn btn-block blueBackground text-white"
                      onClick={()=>{
                        this.setState({
                          resumeUrl: URI.ROOT_URL+"/resumes/"+application.resume
                        })
                      }}
                      data-toggle="modal" data-target="#resumeModal"
                    >
                      <FontAwesomeIcon
                        style={{ color: "#e6e6e6" }}
                        className="scroll"
                        icon="scroll"
                      />
                      &nbsp; View Resume
                    </button>
                    <br/>
            
                  </div>
              
                </div>
              </div>
   
            </div>
            <br />
            <br />
  

          </div>
          
        );
                    }
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

       <div className="container">
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
    </div>


          <div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" id="resumeModal" aria-hidden="true">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Resume</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <div>
        <Document
          file={this.state.resumeUrl}
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
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
    applicationsState: state.ApplicationsReducer
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { getAllApplicationsForJob }
  )(RecruiterJobApplications)
);




