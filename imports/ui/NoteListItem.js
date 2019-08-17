import React from "react";
import moment from "moment";
import PropTypes from 'prop-types';

//Did restructuring in order to do prop types
const NoteListItem = (props) => {
  return(
    <div>
      {/*If Title is available, use the title, otherwise Untitled Note*/}
      <h5>{props.note.title || "Untitled Note"}</h5>
      <p>{moment(props.note.updatedAt).format("M/DD/YYYY")}</p>
    </div>
  );
};

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired
};

export default NoteListItem;
