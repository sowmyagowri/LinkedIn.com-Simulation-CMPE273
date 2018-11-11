import React, {Component} from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import Home from './Home/Home';
import Profile from './Profile/Profile';

class Main extends Component {
    render(){
        return(
            <div>
                {/* Render Different Component based on Route */}
                <Switch>
                <Route path="/" component={Home} exact/>
                <Route path="/profile" component={Profile}/>
                </Switch>
            </div>
        )
    }
}

export default Main;