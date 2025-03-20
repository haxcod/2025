import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentConfirmation = () => {
  const [countdown, setCountdown] = useState(3);
  const [animationStage, setAnimationStage] = useState(0);
  const [confetti, setConfetti] = useState([]);
  const navigate = useNavigate();
  // Theme color: #4ca335
  const themeColor = '#4ca335';
  const lighterThemeColor = '#65c94e';
  
  // Generate random confetti pieces
  useEffect(() => {
    const pieces = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -20 - Math.random() * 80,
      size: 5 + Math.random() * 10,
      rotation: Math.random() * 360,
      color: [themeColor, lighterThemeColor, '#FFD700', '#FFFFFF', '#E8F5E9'][Math.floor(Math.random() * 5)],
      delay: Math.random() * 0.5,
      speed: 1 + Math.random() * 2
    }));
    setConfetti(pieces);
  }, []);

  // Control the animation sequence
  useEffect(() => {
    // Start first animation
    setTimeout(() => setAnimationStage(1), 100);
    
    // Trigger confetti animation
    setTimeout(() => setAnimationStage(2), 500);
    
    // Show amount
    setTimeout(() => setAnimationStage(3), 800);
    
    // Start countdown after animations
    setTimeout(() => {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // Fade out before redirect
            setAnimationStage(4);
            setTimeout(() => {
              navigate(-1)
            }, 700);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }, 1200);
  }, [navigate]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden"
         style={{ background: `linear-gradient(to bottom, ${themeColor}, #2e7c1c)` }}>
      {/* Circular rings animation - made smaller for mobile */}
      <div className={`absolute rounded-full bg-white bg-opacity-5 transition-all duration-1500 ease-out ${
        animationStage >= 1 ? 'scale-100 opacity-30' : 'scale-0 opacity-0'
      }`} style={{ width: '300px', height: '300px' }}></div>
      
      <div className={`absolute rounded-full bg-white bg-opacity-5 transition-all duration-1500 delay-100 ease-out ${
        animationStage >= 1 ? 'scale-100 opacity-30' : 'scale-0 opacity-0'
      }`} style={{ width: '220px', height: '220px' }}></div>
      
      <div className={`absolute rounded-full bg-white bg-opacity-5 transition-all duration-1500 delay-200 ease-out ${
        animationStage >= 1 ? 'scale-100 opacity-30' : 'scale-0 opacity-0'
      }`} style={{ width: '150px', height: '150px' }}></div>
      
      {/* Confetti animation */}
      {animationStage >= 2 && confetti.map(piece => {
        // Calculate final position based on animation stage
        const topPosition = animationStage >= 2 
          ? `${110 + piece.y + piece.speed * 50}%` 
          : `${piece.y}%`;
          
        return (
          <div 
            key={piece.id}
            className="absolute rounded-full"
            style={{
              width: `${piece.size}px`,
              height: `${piece.size}px`,
              backgroundColor: piece.color,
              left: `${piece.x}%`,
              top: topPosition,
              transform: `rotate(${piece.rotation}deg)`,
              opacity: animationStage === 4 ? 0 : 1,
              transition: `top 2s ease-out ${piece.delay}s, opacity 0.7s ease-out`
            }}
          />
        );
      })}
      
      {/* Main content - optimized for mobile */}
      <div className={`relative z-10 flex flex-col items-center justify-center px-4 max-w-sm w-full transition-all duration-700 ${
        animationStage === 0 ? 'opacity-0 scale-95' : 
        animationStage === 4 ? 'opacity-0 scale-105' : 
        'opacity-100 scale-100'
      }`}>
        {/* Success checkmark with pulsing background */}
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-white rounded-full opacity-20 animate-ping" 
               style={{animationDuration: '2s'}}></div>
          <div className="relative bg-white rounded-full p-5">
            <CheckCircle 
              className="transition-all duration-700"
              style={{ 
                color: themeColor,
                transform: animationStage >= 1 ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-90deg)',
                opacity: animationStage >= 1 ? 1 : 0
              }} 
              size={50} 
              strokeWidth={2.5}
            />
          </div>
        </div>
        
        {/* Main text with staggered animation */}
        <h2 className={`text-2xl md:text-4xl font-bold mb-2 text-center transition-all duration-500 ${
          animationStage >= 1 ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-10'
        }`}>Payment Successful!</h2>
        
        {/* Amount with zoom-in animation */}
        <div className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-500 delay-100 ${
          animationStage >= 3 ? 'opacity-100 transform-none' : 'opacity-0 scale-50'
        }`}>
          ₹1,299
        </div>
        
        {/* Animated progress bar */}
        <div className={`mt-6 w-48 md:w-64 h-2 bg-white bg-opacity-20 rounded-full overflow-hidden transition-all duration-500 ${
          animationStage >= 3 ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
        }`}>
          <div 
            className="h-full rounded-full transition-all duration-1000 ease-linear"
            style={{ 
              width: `${(1 - countdown/3) * 100}%`,
              backgroundColor: lighterThemeColor
            }}
          ></div>
        </div>
        
        {/* Countdown text */}
        <p className={`mt-3 text-sm md:text-base text-center transition-all duration-500 ${
          animationStage >= 3 ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
        }`}>
          Redirecting in {countdown}...
        </p>
      </div>
      
      {/* Fixed dots at the bottom */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center z-20">
        <div className="flex space-x-2">
          {[0, 1, 2].map(index => (
            <div 
              key={index} 
              className="h-2 w-2 rounded-full transition-all duration-300"
              style={{ 
                backgroundColor: 'white',
                opacity: 3 - countdown === index ? 1 : 0.4
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;