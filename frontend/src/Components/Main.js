import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './Home/Home';
import ProfileLocation from './Home/Profilelocation';
import ProfileEdit from './Home/Profileedit';
import Profile from './Profile/Profile';
import SearchJobs from './SearchJobs/Searchjobs';
import ViewJob from './SearchJobs/Viewjob';


class Main extends Component {
    render(){
        return(
            <div>
                {/* Render Different Component based on Route */}
                <Switch>
                <Route path="/" component={Home} exact/>
                <Route path="/profile" component={Profile}/>
                <Route path="/profilelocation/new" component={ProfileLocation}/>
                <Route path="/profileedit/new" component={ProfileEdit}/>
                <Route path="/searchjobs" component={SearchJobs}/>
                <Route path="/jobs/view/:jobid" component={ViewJob}/>
                </Switch>
            </div>
        )
    }
}

export default Main;