import React, { useState } from "react";

// Component to handle user rating input
const RatingReview = () => {
  const [rating, setRating] = useState(0); // State to store the selected rating

  // Helper function to set the rating
  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <div className="flex items-center p-2">
      <div className="flex">
        {/* Create 5 stars */}
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            onClick={() => handleRating(index + 1)} // Set the rating on star click
            className={`size-8 cursor-pointer ${
              rating > index ? "text-red-500" : "text-gray-300"
            }`} // Change star color based on rating
            fill="currentColor"
            viewBox="0 0 28 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
          </svg>
        ))}
      </div>
    </div>
  );
};

// Component to display the rating (static)
const RateReview = ({ rating }) => {
  return (
    <div className="flex">
      {/* Create 5 stars */}
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`size-8 ${
            rating > index ? "text-red-500" : "text-gray-300"
          }`} // Change star color based on rating
          fill="currentColor"
          viewBox="0 0 28 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
        </svg>
      ))}
    </div>
  );
};

export {RatingReview, RateReview};
