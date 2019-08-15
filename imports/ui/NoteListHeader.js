import React from "react";
import {Meteor} from "meteor/meteor";
import {createContainer} from "meteor/react-meteor-data";
import PropTypes from 'prop-types';
import {Notes} from "../api/notes";

export const NoteListHeader = (props) => {
  return (
    <div>
      <button onClick={() => {
        //Essentially just a call to Meteor.call, passing in the name of the method we want to call
        props.meteorCall("notes.insert");
      }}> Create Note </button>
    </div>
  )
};

//createContainer wraps that function in tracker.autorun
export default createContainer(() => {
  return {
    meteorCall: Meteor.call
  };
}, NoteListHeader);
