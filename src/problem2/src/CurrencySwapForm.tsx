import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpDown } from 'lucide-react'
import { useSwapStore } from './store/swapStore'
import { useTokenPrices } from './hooks/useTokenPrices'
import TokenSelect from './components/TokenSelect'
import './CurrencySwapForm.css'

const CurrencySwapForm: React.FC = () => {
  const {
    darkMode,
    formData,
    isSwapping,
    error,
    setDarkMode,
    setFormData,
    setSwapping,
    setError,
    swapTokens,
    calculateSwap,
  } = useSwapStore();

  const { tokens, isLoading, error: apiError } = useTokenPrices();

  // Handle API errors
  useEffect(() => {
    if (apiError) {
      setError(apiError);
    }
  }, [apiError, setError]);

  // Apply dark mode to body element
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // Calculate swap when dependencies change
  useEffect(() => {
    calculateSwap(tokens);
  }, [formData.inputToken, formData.outputToken, formData.inputAmount, tokens, calculateSwap]);


  const handleSwapTokens = (): void => {
    setSwapping(true);
    setTimeout(() => {
      swapTokens(tokens);
      setSwapping(false);
    }, 300);
  };

  const calculateReverseSwap = (amount: string): void => {
    if (!amount || !formData.exchangeRate) return;
    
    const calculatedInput = parseFloat(amount) / formData.exchangeRate;
    setFormData({ inputAmount: calculatedInput.toFixed(6) });
  };

  // Filter tokens to prevent selecting the same token on both sides
  const availableInputTokens = tokens.filter(token => token.currency !== formData.outputToken);
  const availableOutputTokens = tokens.filter(token => token.currency !== formData.inputToken);

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <motion.div 
        className="swap-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="header">
          <h1>Currency Swap</h1>
          <button 
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            type="button"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
        
        {(error || apiError) && (
          <motion.div 
            className="error-message"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error || apiError}
          </motion.div>
        )}
        
        <div className="swap-form">
          <div className="input-group">
            <div className="input-header">
              <label htmlFor="input-amount">Amount to send</label>
            </div>
            <div className="input-wrapper">
              <input
                id="input-amount"
                type="number"
                value={formData.inputAmount}
                onChange={(e) => setFormData({ inputAmount: e.target.value })}
                placeholder="0.00"
                min="0"
                step="any"
              />
              <TokenSelect
                value={formData.inputToken}
                onValueChange={(value) => setFormData({ inputToken: value })}
                tokens={availableInputTokens}
                disabled={isLoading}
              />
            </div>
          </div>

          <motion.button
            type="button"
            className="swap-icon"
            onClick={handleSwapTokens}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ 
                rotate: isSwapping ? [0, 180] : [0]
              }}
              transition={{ 
                duration: 0.3, 
                ease: "easeInOut",
                times: isSwapping ? [0, 1] : [0]
              }}
              style={{ transformOrigin: "center" }}
            >
              <ArrowUpDown size={20} />
            </motion.div>
          </motion.button>

          <div className="input-group">
            <div className="input-header">
              <label htmlFor="output-amount">Amount to receive</label>
            </div>
            <div className="input-wrapper">
              <input
                id="output-amount"
                type="number"
                value={formData.outputAmount}
                onChange={(e) => {
                  setFormData({ outputAmount: e.target.value });
                  calculateReverseSwap(e.target.value);
                }}
                placeholder="0.00"
                readOnly
              />
              <TokenSelect
                value={formData.outputToken}
                onValueChange={(value) => setFormData({ outputToken: value })}
                tokens={availableOutputTokens}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="swap-details">
            <div className="detail-row">
              <span>Exchange Rate</span>
              <span>1 {formData.inputToken} = {formData.exchangeRate.toFixed(6)} {formData.outputToken}</span>
            </div>
            <div className="detail-row">
              <span>Estimated Fee</span>
              <span>0.5%</span>
            </div>
            <div className="detail-row">
              <span>Min. Received</span>
              <span>{formData.minReceived.toFixed(6)} {formData.outputToken}</span>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default CurrencySwapForm;
