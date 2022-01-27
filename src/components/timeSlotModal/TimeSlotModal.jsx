import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './timeSlotModal.scss';
import { timeFromFixed, getDefaultTime } from '../../../src/utils/dateUtils.js';

const TimeSlotModal = ({
  handleModalClose,
  postNewEvent,
  setTimeSlotModalOpen,
  dataTime,
  dataDay,
}) => {
  const dataDayFixed = new Date(new Date().setDate(dataDay));
  const dataTimeFixed = new Date(dataDayFixed.setHours(dataTime));

  const [date, setDate] = useState({
    date: getDefaultTime(dataDayFixed, 'YYYY-MM-DD'),
  });
  const [timeFrom, setTimeFrom] = useState({
    timeFrom: getDefaultTime(
      new Date(new Date().setHours(dataTimeFixed.getHours(), 0, 0)),
      'HH:mm'
    ),
  });
  const [timeTo, setTimeTo] = useState({
    timeTo: getDefaultTime(
      new Date(new Date().setHours(dataTimeFixed.getHours(), 60, 0)),
      'HH:mm'
    ),
  });
  const [title, setTitle] = useState('');

  const eventObj = Object.assign({}, date, timeFrom, timeTo, title);

  const handleSubmitEvent = (event) => {
    const { date, timeFrom, timeTo, title } = eventObj;

    const df = new Date(date);
    const dateFrom = new Date(
      df.setHours(timeFrom.slice(0, 2), timeFromFixed(timeFrom.slice(3, 5)), 0)
    ).getTime();

    const dt = new Date(date);
    const dateTo = new Date(
      dt.setHours(timeTo.slice(0, 2), timeFromFixed(timeTo.slice(3, 5)), 0)
    ).getTime();

    event.preventDefault();
    postNewEvent({ dateFrom, dateTo, title });

    handleModalClose();
    setTimeSlotModalOpen();
  };

  return (
    <div className='tsmodal tsoverlay'>
      <div className='tsmodal__content'>
        <form className='tsevent-form' onSubmit={handleSubmitEvent}>
          <input
            type='text'
            name='title'
            placeholder='Title'
            className='tsevent-form__field'
            value={Object.values(title)}
            onChange={(e) => {
              const { name, value } = e.target;
              setTitle({ [name]: value });
            }}
            placeholder={'Title...'}
          />
          <div className='tsevent-form__time'>
            <input
              type='date'
              name='date'
              className='tsevent-form__field'
              value={Object.values(date)}
              onChange={(e) => {
                const { name, value } = e.target;
                setDate({ [name]: value });
              }}
            />
            <input
              type='time'
              name='timeFrom'
              className='tsevent-form__field'
              value={Object.values(timeFrom)}
              onChange={(e) => {
                const { name, value } = e.target;
                setTimeFrom({ [name]: value });
              }}
            />
            <span>-</span>
            <input
              type='time'
              name='timeTo'
              className='tsevent-form__field'
              value={Object.values(timeTo)}
              onChange={(e) => {
                const { name, value } = e.target;
                setTimeTo({ [name]: value });
              }}
            />
          </div>
          <button
            type='reset'
            className='tsevent-form__btn-cancel btn'
            onClick={(event) => {
              event.stopPropagation();
              handleModalClose();
              setTimeSlotModalOpen();
            }}
          >
            Cancel
          </button>
          <button type='submit' className='tsevent-form__btn-submit btn'>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

TimeSlotModal.propTypes = {
  handleModalClose: PropTypes.func.isRequired,
  postNewEvent: PropTypes.func.isRequired,
  setTimeSlotModalOpen: PropTypes.func.isRequired,
  dataTime: PropTypes.number.isRequired,
  dataDay: PropTypes.number.isRequired,
};

export default TimeSlotModal;
