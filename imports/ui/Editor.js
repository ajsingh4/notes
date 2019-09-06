import React from "react";
import {createContainer} from "meteor/react-meteor-data";
import {Session} from "meteor/session";
import {Notes} from "../api/notes";
import PropTypes from 'prop-types';
import {Meteor} from "meteor/meteor";

//Use session.get to figure out which session is selected and used to see if note exists in the db
export class Editor extends React.Component {
  handleBodyChange(e) {
    //Will be able to access the dom element on the e location -> the area value
    this.props.call("notes.update", this.props.note._id, {
      //e.target gets us to the dom and then access the value
      body: e.target.value
    })
  };
  handleTitleChange(e) {
    this.props.call("notes.update", this.props.note._id, {
      title: e.target.value
    })
  }
  render() {
    //3 possibilities, get a note, get an ID but not a match, get nothing
    if(this.props.note) {
      return (
        <div>
          <input value = {this.props.note.title} placeholder="Your title" onChange={this.handleTitleChange.bind(this)}/>
          <textarea value = {this.props.note.body} placeholder="Your note here" onChange={this.handleBodyChange.bind(this)}></textarea>
          <button>Delete Note</button>
        </div>
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
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call
  };
}, Editor);

//Note prop that is not required, object
//selectedNoteId, string, not required
Editor.proptypes = {
  Note: PropTypes.object,
  selectedNoteId: PropTypes.string
};
