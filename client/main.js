import {Meteor} from "meteor/meteor";
import ReactDOM from "react-dom";
import {Tracker} from "meteor/tracker";
import {Session} from "meteor/session";
import {routes, onAuthChange} from "../imports/routes/routes";
import "../imports/startup/simple-schema-configuration.js";
//These 2 imports are equivalent to importing browserHistory from router v3
import {createBrowserHistory} from "history";
const browserHistory = createBrowserHistory();

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

//This tracker autorun watches for a change in selectedNoteId
Tracker.autorun(() => {
  //Get will return undefined or a string if there is an ID
  const selectedNoteId = Session.get("selectedNoteId");

  if(selectedNoteId){
    browserHistory.replace(`/dashboard/${selectedNoteId}`);
  }
});

Meteor.startup(() => {
  //Initialize session ID as undefined but will be set to note ID
  Session.set("selectedNoteId", undefined);
  ReactDOM.render(routes, document.getElementById("app"));
});
