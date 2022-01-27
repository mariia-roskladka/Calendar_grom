import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './modal.scss';
import {
  timeFromFixed,
  getDefaultTime,
  currentDate,
} from '../../../src/utils/dateUtils.js';

const Modal = ({ handleModalClose, postNewEvent }) => {
  const [date, setDate] = useState({
    date: getDefaultTime(currentDate, 'YYYY-MM-DD'),
  });
  const [timeFrom, setTimeFrom] = useState({
    timeFrom: getDefaultTime(currentDate, 'HH:mm'),
  });
  const [timeTo, setTimeTo] = useState({
    timeTo: getDefaultTime(
      currentDate.setMinutes(currentDate.getMinutes() + 15),
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
  };

  return (
    <div className='modal overlay'>
      <div className='modal__content'>
        <div className='create-event'>
          <button
            className='create-event__close-btn'
            onClick={() => handleModalClose()}
          >
            +
          </button>
          <form className='event-form' onSubmit={handleSubmitEvent}>
            <input
              type='text'
              name='title'
              placeholder='Title'
              className='event-form__field'
              value={Object.values(title)}
              onChange={(e) => {
                const { name, value } = e.target;
                setTitle({ [name]: value });
              }}
              placeholder={'Print your title, please...'}
            />
            <div className='event-form__time'>
              <input
                type='date'
                name='date'
                className='event-form__field'
                value={Object.values(date)}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setDate({ [name]: value });
                }}
              />
              <input
                type='time'
                name='timeFrom'
                className='event-form__field'
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
                className='event-form__field'
                value={Object.values(timeTo)}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setTimeTo({ [name]: value });
                }}
              />
            </div>
            <textarea
              name='description'
              placeholder='Description'
              className='event-form__field'
            ></textarea>
            <button type='submit' className='event-form__submit-btn'>
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  handleModalClose: PropTypes.func.isRequired,
  postNewEvent: PropTypes.func.isRequired,
};

export default Modal;
