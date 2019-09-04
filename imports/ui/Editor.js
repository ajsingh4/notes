import React from "react";
import {createContainer} from "meteor/react-meteor-data";
import {Session} from "meteor/session";
import {Notes} from "../api/notes";
import PropTypes from 'prop-types';
//Going to use create createContainer
//Use session.get to figure out which session is selected and used to see if note exists in the db
export class Editor extends React.Component {
  render() {
    //3 possibilities, get a note, get an ID but not a match, get nothing
    if(this.props.note) {
      return (
        <p>We got the note</p>
      );
    }
    else {
      return (
        <p>{this.props.selectedNoteId ? "Note not found":"Pick or create a note"}</p>
      );
    }
  }
};

//Takes in the fn and component that we want to containerize
export default createContainer(() => {
  const selectedNoteId = Session.get("selectedNoteId");
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId)
  };
}, Editor);

//Note prop that is not required, object
//selectedNoteId, string, not required
Editor.proptypes = {
  Note: PropTypes.object,
  selectedNoteId: PropTypes.string
};
