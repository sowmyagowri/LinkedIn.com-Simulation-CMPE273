import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './Home/Home';
import ProfileLocation from './Home/Profilelocation';
import ProfileEdit from './Home/Profileedit';
import Profile from './Profile/Profile';
import SearchJobs from './SearchJobs/Searchjobs';
import ViewJob from './SearchJobs/Viewjob';
import ViewSavedJobs from './SearchJobs/Viewsavedjobs';
import PostAJobHome from './PostJobs/PostAJobHome'
import PostAJobHeader from './PostJobs/PostJobHeader'
import Jobs from './PostJobs/Jobs'

class Main extends Component {
    render(){
        return(
            <div>         
                <Switch>
                <Route path="/" component={Home} exact/>
                <Route path="/profile" component={Profile}/>
                <Route path="/profilelocation/new" component={ProfileLocation}/>
                <Route path="/profileedit/new" component={ProfileEdit}/>
                <Route path="/searchjobs" component={SearchJobs}/>
                <Route path="/postajobhome" component={PostAJobHome}/>
                <Route path="/postajob" component={PostAJobHeader}/>
                <Route path="/jobs" component={Jobs}/>
                <Route path="/jobs/view/:jobid" component={ViewJob}/>
                <Route path="/jobs/saved/" component={ViewSavedJobs}/>
                </Switch>
            </div>
        )
    }
}

export default Main;




