import React, { useState } from 'react';
import Modal from '../modal/Modal.jsx';
import PropTypes from 'prop-types';

import { months, getCurrentMonth } from '../../utils/dateUtils.js';

import './header.scss';

const Header = ({
  postNewEvent,
  getCurrentWeek,
  getPreviousWeek,
  getNextWeek,
  weekStartDate,
  updateEventsApp,
}) => {
  const [currentMonth, setCurrentMonth] = useState(
    getCurrentMonth(months, new Date())
  );
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <header className='header'>
      <button
        className='create-event-btn button'
        onClick={() => setModalOpen(true)}
      >
        <i className='fas fa-plus create-event-btn__icon'></i>
        <span className='create-event-btn__text'>Create</span>
      </button>
      {isModalOpen && (
        <Modal
          handleModalClose={() => setModalOpen(false)}
          postNewEvent={postNewEvent}
          updateEventsApp={updateEventsApp}
        />
      )}
      <div className='navigation'>
        <button
          className='navigation__today-btn button'
          onClick={() => {
            getCurrentWeek();
            setCurrentMonth(getCurrentMonth(months, new Date()));
          }}
        >
          Today
        </button>
        <button
          className='icon-button navigation__nav-icon'
          onClick={() => {
            getPreviousWeek();
            setCurrentMonth(getCurrentMonth(months, new Date(weekStartDate)));
          }}
        >
          <i className='fas fa-chevron-left'></i>
        </button>
        <button
          className='icon-button navigation__nav-icon'
          onClick={() => {
            getNextWeek();
            setCurrentMonth(getCurrentMonth(months, new Date(weekStartDate)));
          }}
        >
          <i className='fas fa-chevron-right'></i>
        </button>
        <span className='navigation__displayed-month'>{currentMonth}</span>
      </div>
    </header>
  );
};

Header.propTypes = {
  postNewEvent: PropTypes.func.isRequired,
  getCurrentWeek: PropTypes.func.isRequired,
  getPreviousWeek: PropTypes.func.isRequired,
  getNextWeek: PropTypes.func.isRequired,
  weekStartDate: PropTypes.object.isRequired,
};

export default Header;
