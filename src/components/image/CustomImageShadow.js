import React from 'react';
import './CustomImageShadow.css';

const CustomImageShadow = ({ 
  src, 
  alt, 
  size = '100%', 
  overlayColorStart = '#101424FF',
  overlayColorEnd = '#10142400',
  children
}) => {
  return (
    <div 
      className="image-container" 
      style={{ 
        width: size, 
        position: 'relative',
        '--overlay-color-start': overlayColorStart,
        '--overlay-color-end': overlayColorEnd,
        '--overlay-height': '50%'
      }} 
    >
      <img 
        src={src} 
        alt={alt} 
        style={{ 
          width: '100%', 
          height: '100%', 
        }} 
      />
      <div style={{ top: '100px', left: '100px' }}>
        {children}
      </div>
    </div>
  );
};

export default CustomImageShadow;
