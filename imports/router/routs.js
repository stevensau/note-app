import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Router, Route, browserHistory } from 'react-router';
import { Session } from 'meteor/session';

import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';


const onEnterNotePage = (nextState) => {
    Session.set('selectNodeId',nextState.params.id);
};
const onLeaveNotePage = () => {
  Session.set('selectNodeId', undefined);
}
export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  const isUnauthenticatedPage = currentPagePrivacy === 'unauth'
  const isAuthenticatedPage = currentPagePrivacy === 'auth'

  if (isUnauthenticatedPage && isAuthenticated ) {
    browserHistory.replace('/dashboard');
  }else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/signup');
  }
}
export const globalOnChange = (prevState, nextState) => {
  globalOnEnter(nextState);
}
export const globalOnEnter = (nextState) => {
  const lastRouts = nextState.routes[nextState.routes.length - 1];
  Session.set('currentPagePrivacy', lastRouts.privacy);

}



export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnChange}>
      <Route path="/signup" component={Signup} privacy='unauth'/>
      <Route path="/dashboard" component={Dashboard} privacy='auth'/>
      <Route path="/dashboard/:id" component={Dashboard} privacy='auth' onEnter={onEnterNotePage} onLeave={onLeaveNotePage}/>
      <Route path="/login" component={Login} privacy='unauth'/>
      <Route path="/" component={Signup}/>
      <Route path="*" component={NotFound} />
    </Route>

  </Router>
)
