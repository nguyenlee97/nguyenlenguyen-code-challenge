import { useState, useEffect } from 'react';
import { Token } from '../types';

interface UseTokenPricesReturn {
  tokens: Token[];
  isLoading: boolean;
  error: string;
}

export const useTokenPrices = (): UseTokenPricesReturn => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchTokenPrices = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError('');
        
        const response = await fetch('https://interview.switcheo.com/prices.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: Token[] = await response.json();
        
        const uniqueTokens = data.reduce((acc: Record<string, Token>, token: Token) => {
          if (!acc[token.currency] || new Date(token.date) > new Date(acc[token.currency].date)) {
            acc[token.currency] = token;
          }
          return acc;
        }, {});
        
        const tokenArray = Object.values(uniqueTokens).sort((a, b) => 
          a.currency.localeCompare(b.currency)
        );
        
        setTokens(tokenArray);
      } catch (err) {
        console.error('Error fetching token prices:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch token prices';
        setError(`Failed to load token prices: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokenPrices();
  }, []);

  return { tokens, isLoading, error };
};
