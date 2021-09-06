import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import UserLevelTable from './components/screens/UserLevelTable';
import UserTable from './components/screens/UserTable';
import CommunityTable from './components/screens/CommunityTable';
import MemberTable from './components/screens/MemberTable';
import AuthenticationProvider from './AuthenticationProvider'
import React, { useState, useEffect } from 'react';
import Pay from './components/square/Pay';
import EventTable from './components/screens/EventTable';
import EventRegistrationTable from './components/screens/EventRegistrationTable';
import PhotoForm from './components/screens/PhotoForm';


import Calendar from './components/screens/Calendar'
const App = () => {
  return (
    <>
     <AuthenticationProvider>
       
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Home/>            
          </Route>

          <Route path='/user-level'>
            <UserLevelTable/>
          </Route>
          <Route path='/users'>
            <UserTable/>
          </Route>
          <Route path='/communities'>
            <CommunityTable/>
          </Route>
          <Route path='/members'>
            <MemberTable/>
          </Route>
          <Route path='/Pay'>
            <Pay/>
          </Route>
          <Route path='/events'>
            <EventTable/>
          </Route>
          <Route path='/eventRegistration'>
            <EventRegistrationTable/>
          </Route>
          <Route path='/Calendar'>
            <Calendar/>
          </Route>
          <Route path='/photos'>
            <PhotoForm/>
          </Route>
        </Switch>
      </Router>
     </AuthenticationProvider>
    </>
  );
};

export default App;