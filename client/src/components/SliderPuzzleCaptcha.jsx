import React, { useRef, useEffect, useState } from 'react';

const Captcha = () => {
  const canvasRef = useRef(null);
  const [captchaText, setCaptchaText] = useState('');

  // Generate a random 5-digit captcha text
  const generateCaptchaText = () => {
    return Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join('');
  };

  // Generate a random RGB color
  const randomColor = (light = false) => {
    const base = light ? 180 : 0; // Light colors start from 180
    return `rgb(${base + Math.random() * 75}, ${base + Math.random() * 75}, ${base + Math.random() * 75})`;
  };

  // Draw the captcha
  const drawCaptcha = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear the canvas
    ctx.clearRect(0, 0, width, height);

    // Set a light background color
    ctx.fillStyle = randomColor(true);
    ctx.fillRect(0, 0, width, height);

    // Draw interference lines
    for (let i = 0; i < 15; i++) {
      ctx.strokeStyle = randomColor();
      ctx.lineWidth = 1 + Math.random(); // Random line width
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.stroke();
    }

    // Generate and set captcha text
    const text = generateCaptchaText();
    setCaptchaText(text);

    // Draw the captcha text
    ctx.font = '30px Arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    for (let i = 0; i < text.length; i++) {
      ctx.fillStyle = randomColor(); // Random text color
      const char = text[i];
      const x = 30 + i * 30; // Spacing for each character
      const y = height / 2 + Math.random() * 10 - 5; // Slight vertical distortion
      ctx.fillText(char, x, y);
    }
  };

  // Refresh captcha when the component mounts or is manually refreshed
  useEffect(() => {
    drawCaptcha();
  }, []);

  const refreshCaptcha = () => {
    drawCaptcha();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <canvas
        ref={canvasRef}
        width="200"
        height="70"
        style={{ border: '1px solid #ccc', display: 'block', margin: '0 auto' }}
      ></canvas>
      <div style={{ marginTop: '10px' }}>
        <button onClick={refreshCaptcha}>Refresh Captcha</button>
      </div>
    </div>
  );
};

export default Captcha;
