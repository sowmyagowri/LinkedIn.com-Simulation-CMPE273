import React, {Component} from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import Home from './Home/Home';
import Login from './Home/Login';
import ProfileLocation from './Home/Profilelocation';
import ProfileEdit from './Home/Profileedit';
import Profile from './Profile/Profile';
import SearchJobs from './SearchJobs/Searchjobs';
import ViewJob from './SearchJobs/Viewjob';
import ViewSavedJobs from './SearchJobs/Viewsavedjobs';
import Inbox from './Messages/Inbox'
import EasyApply from './SearchJobs/Easyapply'
import PostAJobHome from './PostJobs/PostAJobHome'
import PostAJobHeader from './PostJobs/PostJobHeader'
import Jobs from './PostJobs/Jobs'


class Main extends Component {
    render(){
        return(
            <div>
                {/* Render Different Component based on Route */}
                <Switch>
                <Route path="/" component={Home} exact/>
                <Route path="/login" component={Login}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/profilelocation/new" component={ProfileLocation}/>
                <Route path="/profileedit/new" component={ProfileEdit}/>
                <Route path="/searchjobs" component={SearchJobs}/>

                <Route path="/messages" component={Inbox}/>

                <Route path="/easyapply" component={EasyApply}/>
                <Route path="/job/view/:jobid" component={ViewJob}/>
                <Route path="/job/saved" component={ViewSavedJobs}/>
                <Route path="/postajobhome" component={PostAJobHome}/>
                <Route path="/postajob" component={PostAJobHeader}/>
                <Route path="/jobs" component={Jobs}/>

                </Switch>
            </div>
        )
    }
}

export default Main;