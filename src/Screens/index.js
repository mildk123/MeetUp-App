import React from 'react';

import Auth from './Auth/index';
import Home from './Home/index';
import Map from './Map/';
import Profile from './Profile/index';
import SelectMeet from './SelectMeet/';
// import MeetLocation from './SelectMeet/MeetLocation'
import Directions from './SelectMeet/Directions'


import { BrowserRouter as Router } from 'react-router-dom'
import { Route } from 'react-router'





const Routes = () => (
    <Router>
        <div>
            <Route exact path="/" component={Auth} />      
            <Route exact path="/Home" component={Home} />
            <Route exact path="/selectLocation" component={Map} />
            <Route exact path="/Profile" component={Profile} />      
            <Route exact path="/SelectMeeting" component={SelectMeet} />  
            <Route exact path="/getDirections" component={Directions} />   
        </div>
    </Router>
)

  export default Routes;