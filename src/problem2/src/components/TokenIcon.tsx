import React from 'react';
import { getTokenIcon, hasTokenIcon } from '../assets';

interface TokenIconProps {
  symbol: string;
  size?: number;
  className?: string;
}

const TokenIcon: React.FC<TokenIconProps> = ({ 
  symbol, 
  size = 24, 
  className = '' 
}) => {
  const iconSrc = getTokenIcon(symbol);
  const hasIcon = hasTokenIcon(symbol);

  return (
    <div 
      className={`token-icon ${className}`}
      style={{ 
        width: size, 
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {hasIcon ? (
        <img
          src={iconSrc}
          alt={`${symbol} token icon`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
        />
      ) : (
        <div 
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#6b7280',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: size * 0.4,
            fontWeight: 'bold'
          }}
        >
          {symbol.charAt(0)}
        </div>
      )}
    </div>
  );
};

export default TokenIcon;
