import React from 'react';

const MaskedNumber = ({ number }) => {
  const strNum = number.toString();
  const maskedNum = `${strNum.slice(0, 3)}****${strNum.slice(-3)}`;
  return <span>{maskedNum}</span>;
};

export default MaskedNumber;
