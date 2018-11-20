import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class PostJobNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <nav class=" bottomBorder navbar navbar-expand-md navbar-fixed-top navbar-dark blueBackground main-nav">
          <div class="container" style={{ marginLeft: "15%" }}>
            <a class="navbar-brand" href="#">
              <img style={{ width: "50%" }} src="images/linkedinjob.png" />
            </a>

            <ul class="nav navbar-nav mx-auto">
              <li class="nav-item">
                <a class="nav-link text-white navlinkhover" href="#">
                  HOME
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white navlinkhover" href="#">
                  POST A JOB
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white navlinkhover" href="#">
                  LINKEDIN.COM
                </a>
              </li>{" "}
            </ul>

            <ul class="nav navbar-nav">
              <li className="nav-link">
                <FontAwesomeIcon color="#dee2e6" size="lg" icon="envelope" />
                <a href="/jobs" />
              </li>
              <li className="nav-link">
                <FontAwesomeIcon color="#dee2e6" size="lg" icon="user-circle" />
                <a href="/profile" />
              </li>
            </ul>
          </div>
        </nav>

      </div>
    );
  }
}

export default PostJobNav;
