import React, { Component } from "react";
import PostJobNav from "../PostJobs/PostJobNav";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import checkValidityRecruiter from "../../Actions/ValidityScript"
import axios from  "axios"
import URI from "../../constants/URI"

var BarChart = require("react-chartjs").Bar;
var LineChart = require("react-chartjs").Line;
var PieChart = require("react-chartjs").Pie;



class RecruiterGraphs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topten:null,
      clicksPerJob:null,
      topTenMonth:"1",
      unpopularJobs:null,
      jobs:[],
      cityWiseMonth:"1",
      cityWiseJobTitle:null,
      cityWise:null


    };

    this.TopTenMonthChangeHandler.bind(this);
    this.TopTenJobs.bind(this);
    this.ClicksPerJob.bind(this);
    this.UnpopularJobs.bind(this);

  }


  CityWiseMonthChangeHandler= (e)=>{
    this.setState({
      cityWiseMonth:e.target.value+""
    })
    this.CityWiseGraph(this.state.cityWiseJobTitle, e.target.value+"")

   }

   CityWiseJobChangeHandler= (e)=>{
    this.setState({
      cityWiseJobTitle:e.target.value+""
    })
    this.CityWiseGraph( e.target.value+"", this.state.cityWiseMonth)
  }



    TopTenMonthChangeHandler= (e)=>{
     this.setState({
      topTenMonth:e.target.value+""
     })
     this.TopTenJobs(e.target.value+"")
    }


     TopTenJobs =(month)=>{
      let data = null;
      let recruiterEmail = "recruiter3@gmail.com";
      axios.defaults.withCredentials = true;
      axios.defaults.headers.common["Authorization"] =localStorage.getItem("user");
        axios.get(`${URI.ROOT_URL}/graph_top_job_postings`, {
        params: {
          recruiterEmail,
          month
        }
      }).then((res)=>{
        if (res.status === 200) {
          data = {
            labels: res.data.label.slice(0,10),
            datasets: [
              {
                label: "My dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: res.data.values.slice(0,10)
              }
            ]
          };

          console.log("Top Ten", data);

         this.setState({
           topten:data
         })
        }
      }).catch((err)=>{
          console.log(err);
      })
    }



    ClicksPerJob =()=>{
      let data = null;
      let recruiterEmail = "recruiter3@gmail.com";
      axios.defaults.withCredentials = true;
      axios.defaults.headers.common["Authorization"] =localStorage.getItem("user");
      axios.get(`${URI.ROOT_URL}/graph_clicks_per_job`, {
        params: {
          recruiterEmail,
        }
      }).then((res)=>{
        if (res.status === 200) {
          console.log("Hello", res);
          data = {
            labels: res.data.labels,
            datasets: [
              {
                label: "My dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: res.data.values
              }
            ]
          };
          console.log("Clicks Per Job",data)
         this.setState({
          clicksPerJob:data
         })
        }
      }).catch((err)=>{
          console.log(err);
      })
    }


    UnpopularJobs =()=>{
      let data = null;
      let recruiterEmail = "recruiter3@gmail.com";
      axios.defaults.withCredentials = true;
      axios.defaults.headers.common["Authorization"] =localStorage.getItem("user");
      axios.get(`${URI.ROOT_URL}/graph_unpopular_job_postings`, {
        params: {
          recruiterEmail,
        }
      }).then((res)=>{
        if (res.status === 200) {
          console.log(res.data.colors);
          data = {
            labels: res.data.label,
            datasets: [
              {
                label: "My dataset",
                fillColor:  res.data.colors,
                data: [5,4,2,1,6]
              }
            ]
          };
          console.log("Unpopular Jobs",data)
         this.setState({
          unpopularJobs:data
         })
        }
      }).catch((err)=>{
          console.log(err);
      })
    }



    CityWiseGraph =(jobID, month)=>{
      console.log(jobID, month);
      let data = null;
      axios.defaults.withCredentials = true;
      axios.defaults.headers.common["Authorization"] =localStorage.getItem("user");
      axios.get(`${URI.ROOT_URL}/graph_citywise_applications`, {
        params: {
          jobID,
          month
        }
      }).then((res)=>{
        if (res.status === 200) {
          console.log(res);
        //   data = {
        //     labels: res.data.label,
        //     datasets: [
        //       {
        //         label: "My dataset",
        //         fillColor:  res.data.colors,
        //         data: [5,4,2,1,6]
        //       }
        //     ]
        //   };
        //   console.log("City Wise Jobs",data)
        //  this.setState({
        //   cityWise:data
        //  })
        }
      }).catch((err)=>{
          console.log(err);
      })
    }




    populateCity =()=>{
      let recruiterEmail = "recruiter4@gmail.com";
      axios.defaults.withCredentials = true;
      axios.defaults.headers.common["Authorization"] =localStorage.getItem("user");
      axios.get(`${URI.ROOT_URL}/get_jobs_by_recruiter`, {
        params: {
          recruiterEmail,
        }
      }).then((res)=>{
        if (res.status === 200) {
          this.setState({
            jobs:res.data.allJobs,
            cityWiseJobTitle:res.data.allJobs[0]._id
          })
          this.CityWiseGraph(res.data.allJobs[0]._id, "1")
        }
      }).catch((err)=>{
          console.log(err);
      })
     
    }


   componentDidMount() {
      this.TopTenJobs(this.state.topTenMonth)
      this.ClicksPerJob()
      this.UnpopularJobs();
    this.populateCity();
  }

  componentWillMount(){
    checkValidityRecruiter(this);

  
  }
  render() {
   let  cities = this.state.jobs.map(job => {
      return (
        <option value={job._id}>{job.title}</option>
      );
    });


    return (
      <div>
        <PostJobNav />
        <br />
        <br />
        <br />


        <div className="container text-center">
        <h1 style={{fontWeight:"200"}}>Statistical Analysis</h1>
        <h2 style={{fontWeight:"200"}}>Graphs</h2>
        <br/><br/>
          <div className="row">
            <div className="col-12">
              <div className="card shadow-lg">
                <div className="card-body">
                  <h5 className="card-title">Top 10 Jobs Per Month</h5>
                  <div className="row">
                    <div className="col-8">
                    {this.state.topten===null ? null: <LineChart data={this.state.topten} width="600" height="250" /> }
                    </div>
                    <div className="col-4">
                      <br />
                      <br />
                      <h5> Select Month</h5>
                      <select onChange={this.TopTenMonthChangeHandler}  className="form-control">
                        <option value="1">January</option>
                        <option value="2">Febuary</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
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
              <div className="card shadow-lg">
                <div className="card-body">
                  <h5 className="card-title">Clicks per Job</h5>
                  <div className="row">
                    <div className="col-12">
                    {this.state.clicksPerJob===null ? null: <BarChart data={this.state.clicksPerJob} width="1000" height="250" /> }
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
              <div className="card shadow-lg">
                <div className="card-body">
                  <h5 className="card-title">Unpopular Jobs</h5>
                  <div className="row">
                    <div className="col-8">
                    {this.state.unpopularJobs===null ? null: <BarChart data={this.state.unpopularJobs} width="600" height="250" /> }
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
              <div className="card shadow-lg">
                <div className="card-body">
                  <h5 className="card-title">City Wise Jobs per Month</h5>
                  <div className="row">
                    <div className="col-8">
                    {this.state.cityWise===null ? null: <LineChart data={this.state.cityWise} width="600" height="250" /> }
                    </div>
                    <div className="col-4">
                      <br />
                      <br />
                      <h5> Select Job Title</h5>
                      <select onChange={this.CityWiseJobChangeHandler}  className="form-control">
                      {cities}  
                      </select>
                      <br/> 
                      <h5> Select Month</h5>
                      <select onChange={this.CityWiseMonthChangeHandler}  className="form-control">
                        <option value="1">January</option>
                        <option value="2">Febuary</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                      </select>


                      
                      
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
