import React from "react";
import {Meteor} from "meteor/meteor";
import {createContainer} from "meteor/react-meteor-data";
import PropTypes from 'prop-types';
import {Notes} from "../api/notes";
import NoteListHeader from "./NoteListHeader";
import NoteListItem from "./NoteListItem";
import NoteListEmptyItem from "./NoteListEmptyItem";
import {Session} from "meteor/session";

export const NoteList = (props) => {
  //If there exists a note, then render information pertaining to that note
  if(props.notes.length !== 0) {
    return (
      <div>
        <NoteListHeader/>
        {/*Mapping the array of notes as a NoteListItem to be rendered*/}
        {props.notes.map((note) => {
          return (
            <NoteListItem key={note._id} note={note}/>
          );
        })}
        NoteList {props.notes.length}
      </div>
    )}
  //If no note exists, then say so and render button
  else {
    return (
      <div>
        <NoteListHeader/>
        <NoteListEmptyItem/>
      </div>
    );
  };
};

NoteList.proptypes = {
  notes: PropTypes.array.isRequired
};

export default createContainer(() => {
  //Get value of selectedNoteId, rerenders list everytime the selectedNoteId
  //changes or query for all notes changes
  const selectedNoteId = Session.get("selectedNoteId");
  Meteor.subscribe("notes");
  return {
    //Passing in function into map to see if note is selected
    notes: Notes.find().fetch().map((note) => {
      return {
        //Spread operator used to keep everything note has
        ...note,
        //Checking if _id = selectedNoteId
        selected: note._id === selectedNoteId
      };
    })
  };
}, NoteList);
