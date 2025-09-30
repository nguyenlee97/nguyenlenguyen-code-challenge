import React, { useMemo, useCallback } from 'react';
import { WalletBalance, FormattedWalletBalance } from '../interface/wallet-balance.interface';
import { Blockchain } from '../interface/blockchain.interface';

interface BoxProps {
  children?: React.ReactNode;
  [key: string]: any;
}

// Mock hooks for demonstration
const useWalletBalances = (): WalletBalance[] => {
  return [
    { currency: 'ETH', amount: 1.5, blockchain: 'Ethereum' },
    { currency: 'OSMO', amount: 100, blockchain: 'Osmosis' },
    { currency: 'ARB', amount: 0, blockchain: 'Arbitrum' },
    { currency: 'ZIL', amount: -5, blockchain: 'Zilliqa' },
    { currency: 'NEO', amount: 2.3, blockchain: 'Neo' },
  ];
};

const usePrices = (): Record<string, number> => {
  return {
    'ETH': 2000,
    'OSMO': 0.5,
    'ARB': 1.2,
    'ZIL': 0.1,
    'NEO': 15,
  };
};

// Mock WalletRow component
const WalletRow: React.FC<{
  className?: string;
  key?: string;
  amount: number;
  usdValue: number;
  formattedAmount: string;
}> = ({ className, amount, usdValue, formattedAmount }) => (
  <div className={className}>
    Amount: {formattedAmount} | USD Value: ${usdValue.toFixed(2)}
  </div>
);

// Mock classes
const classes = {
  row: 'wallet-row'
};

const WalletPage: React.FC<BoxProps> = ({ children, ...rest }) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = useCallback((blockchain: Blockchain): number => {
    const priorityMap: Record<Blockchain, number> = {
      'Osmosis': 100,
      'Ethereum': 50,
      'Arbitrum': 30,
      'Zilliqa': 20,
      'Neo': 20
    };
    return priorityMap[blockchain] ?? -99;
  }, []);

  const processedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority > -99 && balance.amount > 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        
        if (leftPriority > rightPriority) return -1;
        if (rightPriority > leftPriority) return 1;
        return 0;
      })
      .map((balance: WalletBalance): FormattedWalletBalance => ({
        ...balance,
        formatted: balance.amount.toFixed()
      }));
  }, [balances, getPriority]);

  const rows = useMemo(() => {
    return processedBalances.map((balance: FormattedWalletBalance) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={`${balance.currency}-${balance.blockchain}`}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    });
  }, [processedBalances, prices]);

  return (
    <div {...rest}>
      {rows}
    </div>
  );
};

export default WalletPage;
