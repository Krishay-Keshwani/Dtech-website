import React from 'react';
import dtechMark from '../assets/dtech-mark.png';

interface LogoProps {
  className?: string;
  hideText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  hideIcon?: boolean;
}

export default function Logo({ className = '', hideText = false, size = 'md', hideIcon = false }: LogoProps) {
  // Dimension scaling based on size prop
  const sizeClasses = {
    sm: { box: 'h-10', logoWidth: 160, logoHeight: 48, iconScale: 0.6, textScale: 'scale-[0.85]' },
    md: { box: 'h-14', logoWidth: 260, logoHeight: 80, iconScale: 0.85, textScale: 'scale-[1.0]' },
    lg: { box: 'h-24', logoWidth: 380, logoHeight: 120, iconScale: 1.3, textScale: 'scale-[1.3]' },
    xl: { box: 'h-36', logoWidth: 500, logoHeight: 160, iconScale: 1.8, textScale: 'scale-[1.8]' },
  };

  const scaleConfig = sizeClasses[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* 3D Dotted Cube Icon (now using static image mark) */}
      {!hideIcon && (
        <img
          src={dtechMark}
          alt="DTECH Logo Mark"
          className="flex-shrink-0 object-contain"
          style={{
            width: `${70 * scaleConfig.iconScale}px`,
            height: `${70 * scaleConfig.iconScale}px`,
          }}
        />
      )}

      {/* Stylized Text Elements */}
      {!hideText && (
        <div className="flex flex-col justify-center leading-none">
          {/* Top small text */}
          <span 
            className="font-sans font-medium uppercase tracking-wider text-[#e85b73] mb-0.5"
            style={{ 
              fontSize: size === 'sm' ? '7px' : size === 'md' ? '9.5px' : size === 'lg' ? '13px' : '18px',
              letterSpacing: '0.05em'
            }}
          >
            DTE 4 Calamity and Humanity Pvt Ltd.
          </span>

          {/* Center Main DTECH Text with Stylized letter "E" and horizontal gradient */}
          <div className="flex items-end select-none">
            {/* We will write D T [Horizontal bars for E] C H */}
            <div className="flex items-center font-display font-black leading-none" style={{ gap: size === 'sm' ? '1.5px' : '3px' }}>
              <span 
                className="bg-gradient-to-r from-[#FF7E40] to-[#FF2E93] bg-clip-text text-transparent"
                style={{ fontSize: size === 'sm' ? '20px' : size === 'md' ? '30px' : size === 'lg' ? '46px' : '64px' }}
              >
                DT
              </span>
              
              {/* Stylized letter E (3 horizontal bars) */}
              <div 
                className="flex flex-col justify-between" 
                style={{ 
                  height: size === 'sm' ? '13px' : size === 'md' ? '19.5px' : size === 'lg' ? '29.5px' : '41px',
                  width: size === 'sm' ? '10px' : size === 'md' ? '15px' : size === 'lg' ? '23px' : '32px',
                  paddingTop: size === 'sm' ? '1px' : '2px',
                  paddingBottom: size === 'sm' ? '1px' : '2px',
                }}
              >
                <div className="h-[22%] w-full bg-[#FF2E93] rounded-sm" />
                <div className="h-[22%] w-full bg-[#D119A8] rounded-sm" />
                <div className="h-[22%] w-full bg-[#BC00DD] rounded-sm" />
              </div>

              <span 
                className="bg-gradient-to-r from-[#D119A8] to-[#BC00DD] bg-clip-text text-transparent"
                style={{ fontSize: size === 'sm' ? '20px' : size === 'md' ? '30px' : size === 'lg' ? '46px' : '64px' }}
              >
                CH
              </span>
            </div>
          </div>

          {/* Bottom subtitle */}
          <span 
            className="font-sans font-semibold text-[#2E7D4E] tracking-widest uppercase mt-0.5"
            style={{ 
              fontSize: size === 'sm' ? '5.5px' : size === 'md' ? '8.5px' : size === 'lg' ? '11.5px' : '15.5px',
              wordSpacing: '2px'
            }}
          >
            -Technologies for Sustainability-
          </span>
        </div>
      )}
    </div>
  );
}
