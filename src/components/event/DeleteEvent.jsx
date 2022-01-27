import React from "react";
import "./event.scss";

const DeleteEvent = ({ deleteEvent, id }) => (
  <button className="delete-event-btn" onClick={() => deleteEvent(id)}>
    Delete
  </button>
);

export default DeleteEvent;