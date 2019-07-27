import React from "react";
import {Link} from "react-router-dom";

export default () => {
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h1>Not Found</h1>
        <p>Hmm, we're unable to find that page</p>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};
