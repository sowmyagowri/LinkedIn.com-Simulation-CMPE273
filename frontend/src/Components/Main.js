import React, {Component} from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import Home from './Home/Home';
import ProfileLocation from './Home/Profilelocation';
import ProfileEdit from './Home/Profileedit';
import Profile from './Profile/Profile';
import SearchJobs from './SearchJobs/Searchjobs';
import PostAJobHome from './PostJobs/PostAJobHome'
import PostAJobWizardA from './PostJobs/PostAJobWizardA'

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
                <Route path="/postajob" component={PostAJobHome}/>
                <Route path="/postajobwizard" component={PostAJobWizardA}/>
                </Switch>
            </div>
        )
    }
}

export default Main;




