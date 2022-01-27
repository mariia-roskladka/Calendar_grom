import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Event from '../event/Event';
import TimeSlotModal from '../timeSlotModal/TimeSlotModal';
import { formatMins } from '../../../src/utils/dateUtils.js';

const Hour = ({
  dataHour,
  hourEvents,
  dataDay,
  deleteEvent,
  postNewEvent,
  setReRender,
  updateEventsApp,
}) => {
  const [currentTimeLine, setCurrentTimeLine] = useState(null);
  const [isTimeSlotModalOpen, setTimeSlotModalOpen] = useState(false);

  const nowDay = new Date();
  const currentHour = new Date().getHours();
  const currentMin = new Date().getMinutes();
  const styles = {
    marginTop: currentMin,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimeLine(new Date());
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className='calendar__time-slot'
      data-time={dataHour + 1}
      onClick={() => setTimeSlotModalOpen(true)}
    >
      {dataDay === nowDay.getDate() &&
      dataHour === currentHour &&
      new Date().getMinutes() ? (
        <div style={styles} className='red-line'>
          <div className='red-line__circle'></div>
        </div>
      ) : null}

      {isTimeSlotModalOpen ? (
        <TimeSlotModal
          handleModalClose={() => setReRender(true)}
          setTimeSlotModalOpen={() => setTimeSlotModalOpen(false)}
          postNewEvent={postNewEvent}
          updateEventsApp={updateEventsApp}
          dataTime={dataHour}
          dataDay={dataDay}
        />
      ) : null}

      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        const eventStart = `${new Date(dateFrom).getHours()}:${formatMins(
          new Date(dateFrom).getMinutes()
        )}`;
        const eventEnd = `${new Date(dateTo).getHours()}:${formatMins(
          new Date(dateTo).getMinutes()
        )}`;

        return (
          <div onClick={(e) => e.stopPropagation()}>
            <Event
              key={id}
              id={id}
              height={(dateTo - dateFrom) / (1000 * 60)}
              marginTop={new Date(dateFrom).getMinutes()}
              time={`${eventStart} - ${eventEnd}`}
              title={title}
              deleteEvent={deleteEvent}
              updateEventsApp={updateEventsApp}
            />
          </div>
        );
      })}
    </div>
  );
};

Hour.propTypes = {
  hourEvents: PropTypes.object,
  dataHour: PropTypes.number.isRequired,
  dataDay: PropTypes.number.isRequired,
  deleteEvent: PropTypes.func.isRequired,
};

Hour.defaultProps = {
  hourEvents: [],
};

export default Hour;
