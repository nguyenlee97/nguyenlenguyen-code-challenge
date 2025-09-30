import React from 'react';
import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon, CheckIcon } from '@radix-ui/react-icons';
import { Token } from '../types';
import TokenIcon from './TokenIcon';
import './TokenSelect.css';

interface TokenSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  tokens: Token[];
  disabled?: boolean;
}

const TokenSelect: React.FC<TokenSelectProps> = ({ 
  value, 
  onValueChange, 
  tokens, 
  disabled = false 
}) => {

  return (
    <Select.Root value={value} onValueChange={onValueChange} disabled={disabled}>
      <Select.Trigger className="token-select-trigger">
        <div className="token-select-content">
          <TokenIcon symbol={value} size={20} />
          <div className="token-select-text">
            <Select.Value placeholder="Select token" />
          </div>
        </div>
        <Select.Icon className="token-select-icon">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content 
          className="token-select-content-portal"
          position="popper"
          sideOffset={4}
          align="start"
        >
          <Select.ScrollUpButton className="token-select-scroll-button">
            <ChevronDownIcon />
          </Select.ScrollUpButton>
          
          <Select.Viewport className="token-select-viewport">
            {tokens.map((token) => (
              <Select.Item 
                key={token.currency} 
                value={token.currency}
                className="token-select-item"
              >
                <div className="token-select-item-content">
                  <TokenIcon symbol={token.currency} size={18} />
                  <div className="token-select-item-text">
                    <Select.ItemText>{token.currency}</Select.ItemText>
                  </div>
                </div>
                <Select.ItemIndicator className="token-select-item-indicator">
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
          
          <Select.ScrollDownButton className="token-select-scroll-button">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default TokenSelect;
