import React, { Component } from "react";
import PostJobNav from "./PostJobNav";

class PostAJobHome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <PostJobNav/>
        <div className="blueBackground" style={{minHeight: "95vh"}}>
          <div className="container text-center ">
            <br />
            <br />
            <br />
            <h2 style={{ opacity: ".7" }} className="text-white">
              Reach the quality candidates you can’t find anywhere else.
            </h2>
            <br />
            <br />
            <br />

            <div className="row">
              <div className="col-5 offset-3">
                <div className="card shadow-lg">
                  <div className="card-body">
                    <div className="input-group">
                      <div className="input-group-append border-right-0">
                        <span className="input-group-text bg-transparent border-right-0">
                          <i className="fas fa-building border-right-0" />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control form-control-lg border-left-0"
                        placeholder="Company"
                        aria-label="company"
                        aria-describedby="company"
                      />
                    </div>
                    <br />
                    <div className="input-group">
                      <div className="input-group-append border-right-0">
                        <span className="input-group-text bg-transparent border-right-0">
                          <i className="fas fa-suitcase border-right-0" />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control form-control-lg border-left-0"
                        placeholder="Job title"
                        aria-label="jobtitle"
                        aria-describedby="jobtitle"
                      />
                    </div>
                    <br />
                    <div className="input-group">
                      <div className="input-group-append border-right-0">
                        <span className="input-group-text bg-transparent border-right-0">
                          <i className="fas fa-map-marker-alt border-right-0" />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control form-control-lg border-left-0"
                        placeholder="Job address or city"
                        aria-label="jbcity"
                        aria-describedby="jbcity"
                      />
                    </div>
                    <br/>
                    <button
                      type="button"
                      style={{background:"#004b7c"}}
                      className="btn btn-lg btn-block text-white"
                    >
                      Start job post
                    </button>
                  </div>
                </div>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    );
  }
}

export default PostAJobHome;
