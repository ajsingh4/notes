import React from "react";
import moment from "moment";
import PropTypes from 'prop-types';
import {Session} from "meteor/session";
import {createContainer} from "meteor/react-meteor-data";

//Did restructuring in order to do prop types
export const NoteListItem = (props) => {
  return(
    <div onClick={() => {
      props.Session.set("selectedNoteId", props.note._id);
    }}>
      {/*If Title is available, use the title, otherwise Untitled Note*/}
      <h5>{props.note.title || "Untitled Note"}</h5>
      {/*Adding a property to the array of notes, whether it's selected*/}
      {props.note.selected ? "selected" : undefined}
      <p>{moment(props.note.updatedAt).format("M/DD/YYYY")}</p>
    </div>
  );
};

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired
};

export default createContainer(() => {
  return {Session};
}, NoteListItem);
