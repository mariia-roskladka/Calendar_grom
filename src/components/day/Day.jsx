import React from 'react';
import Hour from '../hour/Hour';
import PropTypes from 'prop-types';

import './day.scss';

const Day = ({
  dataDay,
  dayEvents,
  deleteEvent,
  postNewEvent,
  setReRender,
  updateEventsApp,
}) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  return (
    <div className='calendar__day' data-day={dataDay}>
      {hours.map((hour) => {
        const hourEvents = dayEvents.filter(
          (event) => new Date(event.dateFrom).getHours() === hour
        );
        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            dataDay={dataDay}
            hourEvents={hourEvents}
            deleteEvent={deleteEvent}
            postNewEvent={postNewEvent}
            setReRender={setReRender}
            updateEventsApp={updateEventsApp}
          />
        );
      })}
    </div>
  );
};

Day.propTypes = {
  dayEvents: PropTypes.object,
  dataDay: PropTypes.number.isRequired,
  deleteEvent: PropTypes.func.isRequired,
};

Day.defaultProps = {
  dayEvents: [],
};

export default Day;
