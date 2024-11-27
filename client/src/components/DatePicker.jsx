import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SingleCalendarDatePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setEndDate(null); // Reset end date when start date is selected
    setIsEndDatePickerOpen(true); // Open end date picker
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <div>
      <h2>Select Date Range</h2>
      <div className="date-picker-container">
        <div>
          <label>From Date:</label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="MMMM d, yyyy"
            placeholderText="Select a start date"
          />
        </div>
        {isEndDatePickerOpen && (
          <div>
            <label>To Date:</label>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate} // Ensure end date is not before start date
              dateFormat="MMMM d, yyyy"
              placeholderText="Select an end date"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleCalendarDatePicker;
