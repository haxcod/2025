import React from 'react';

const ErrorPopup = ({ handleClose, error }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
      role="alert"
      aria-live="assertive"
    >
      <div className="relative bg-white border-l-4 border-red-500 text-gray-800 px-6 py-5 rounded-lg shadow-lg w-11/12 max-w-sm">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={() => handleClose(false)}
          aria-label="Close Error Message"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path strokeLinecap="round" color='red' strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-red-600">Error</h3>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPopup;
