import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { formatMins } from '../../../src/utils/dateUtils.js';

import './event.scss';

const Event = ({
  height,
  marginTop,
  title,
  time,
  deleteEvent,
  id,
  updateEventsApp,
}) => {
  const [isDeleteWindow, setDeleteWindow] = useState(false);
  const [isDeleteEvent, setDeleteEvent] = useState(false);

  const toggle = () => {
    setDeleteWindow(!isDeleteWindow);
  };

  const handleDelete = () => {
    return setDeleteEvent(true);
  };

  const eventStyle = {
    height,
    marginTop,
  };

  return !isDeleteEvent ? (
    <div style={eventStyle} className='event' onClick={toggle}>
      <div className='event__title'>{title}</div>
      <div className='event__time'>{time}</div>
      {isDeleteWindow && (
        <div
          className='delete-event-btn'
          onClick={(event) => {
            event.stopPropagation();
            deleteEvent(id);
            handleDelete();
            updateEventsApp();
          }}
        >
          <span className='delete-event-btn__text'>Delete 🗑</span>
        </div>
      )}
    </div>
  ) : null;
};

Event.propTypes = {
  title: PropTypes.string,
  marginTop: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  time: PropTypes.string,
};

Event.defaultProps = {
  title: 'Here should be a title...',
  time: `${new Date().getHours()}:${formatMins(
    new Date().getMinutes()
  )} - ${new Date().getHours()}:${formatMins(new Date().getMinutes())}`,
};

export default Event;
