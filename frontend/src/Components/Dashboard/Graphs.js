import React, { Component } from "react";
import PostJobNav from "../PostJobs/PostJobNav";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
var BarChart = require("react-chartjs").Bar;

function rand(min, max, num) {
  var rtn = [];
  while (rtn.length < num) {
    rtn.push(Math.random() * (max - min) + min);
  }
  return rtn;
}

const data = {
  labels: [
    "Job1",
    "Job2",
    "Job3",
    "Job4",
    "Job5",
    "Job6",
    "Job7",
    "Job8",
    "Job9",
    "Job10"
  ],
  datasets: [
    {
      label: "My dataset",
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: rand(32, 100, 10)
    }
  ]
};

class RecruiterGraphs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <PostJobNav />
        <br />
        <br />
        <br />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div class="card shadow-lg">
                <div class="card-body">
                  <h5 class="card-title">Top 10 Jobs Per Month</h5>
                  {/* <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                  <div className="row">
                    <div className="col-8">
                      <BarChart data={data} width="600" height="250" />{" "}
                    </div>
                    <div className="col-4">
                      <br />
                      <br />
                      <h5> Select Month</h5>
                      <select class="form-control">
                        <option>January</option>
                        <option>Febuary</option>
                        <option>March</option>
                        <option>April</option>
                        <option>May</option>
                        <option>June</option>
                        <option>July</option>
                        <option>August</option>
                        <option>September</option>
                        <option>October</option>
                        <option>November</option>
                        <option>December</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <br />
          <br />

          <div className="row">
            <div className="col-12">
              <div class="card shadow-lg">
                <div class="card-body">
                  <h5 class="card-title">City wise Application/month</h5>
                  {/* <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                  <div className="row">
                    <div className="col-8">
                      <BarChart data={data} width="600" height="250" />{" "}
                    </div>
                    <div className="col-4">
                      <br />
                      <br />
                      <h5> Select Job Posting</h5>
                      <select class="form-control" />
                    </div>
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

function mapStateToProps(state) {
  return {};
}

export default withRouter(connect(mapStateToProps)(RecruiterGraphs));
