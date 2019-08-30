import {Meteor} from "meteor/meteor";
import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, Switch, Redirect} from "react-router";
import {createBrowserHistory} from "history";
import {Session} from "meteor/session";

import Login from "../ui/Login";
import Signup from "../ui/Signup";
import Dashboard from "../ui/Dashboard";
import NotFound from "../ui/NotFound";

const browserHistory = createBrowserHistory();
window.browserHistory = browserHistory;
let bhistory = window.browserHistory;

//Arrays of pages that do and don't require login
const unauthenticatedPages = ["/", "/signup"];
const authenticatedPages = ["/dashboard"];

//Entering a public  page
const onEnterPublicPage = (Component) => {
  if (Meteor.userId()) {
    return <Redirect to="/dashboard" />
  } else {
    return <Component/>
  }
};

//Entering a private page
const onEnterPrivatePage = (Component) => {
  if (!Meteor.userId()) {
    return <Redirect to="/" />
  } else {
    return <Component/>
  }
};

//If person not logged in, send to home page. If they are logged in, use session.set
const onEnterNotePage = (Component) => {
  if (!Meteor.userId()) {
    return <Redirect to="/" />
  }
  else {
    return (props) => {
      Session.set("selectedNoteId", props.match.params.id);
      return <Component/>
    };
  }
};


export const onAuthChange = (isAuthenticated) => {
  const pathname = bhistory.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);
  //If they are logged in and it's a page that isn't associated with their user ID, send them to the home page
  if(isAuthenticated == true && isUnauthenticatedPage){
    browserHistory.replace("/dashboard");
  }
   else if(isAuthenticated == false && isAuthenticatedPage){
    browserHistory.replace("/");
  }
}
export const routes = (
  <Router history = {browserHistory}>
    <div>
      <Switch>
        <Route exact path="/" render={() => onEnterPublicPage(Login)}/>
        <Route exact path="/signup" render={() => onEnterPublicPage(Signup)}/>
        <Route exact path="/dashboard" render={() => onEnterPrivatePage(Dashboard)}/>
        <Route exact path="/dashboard/:id" render={onEnterNotePage(Dashboard)}/>
        <Route exact path="*" component={NotFound}/>
      </Switch>
    </div>
  </Router>
);
