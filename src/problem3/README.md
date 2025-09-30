# Problem 3: Messy React

## 🚀 Quick Start

```bash
cd src/problem3
npm install
npm start
```

## 📋 Original Code Issues

### 1. **Critical Runtime Error: Undefined Variable**
```typescript
if (lhsPriority > -99) { // ❌ lhsPriority is never defined!
```
**Impact**: Causes immediate runtime crash
**Fix**: Use `balancePriority` instead of `lhsPriority`

### 2. **Incorrect Dependency Array in useMemo**
```typescript
const sortedBalances = useMemo(() => {
  // ... computation that doesn't use prices
}, [balances, prices]); // ❌ prices included but not used
```
**Impact**: Unnecessary recalculations when prices change
**Fix**: Remove `prices` from dependency array

### 3. **Flawed Filter Logic**
```typescript
if (balance.amount <= 0) {
  return true; // ❌ Keeps zero/negative balances
}
```
**Impact**: Shows unwanted balances (zero/negative amounts)
**Fix**: Return `false` to filter out these balances

### 4. **Incomplete Sort Comparator**
```typescript
.sort((lhs, rhs) => {
  if (leftPriority > rightPriority) return -1;
  else if (rightPriority > leftPriority) return 1;
  // ❌ Missing return 0 for equal priorities
});
```
**Impact**: Unstable sorting, potential infinite loops
**Fix**: Add `return 0;` for equal priorities

### 5. **Redundant Array Processing**
```typescript
const formattedBalances = sortedBalances.map(...); // ❌ Created but never used
const rows = sortedBalances.map(...); // ❌ Processing same array twice
```
**Impact**: Unnecessary memory allocation and computation
**Fix**: Combine operations into single pipeline

### 6. **Type Inconsistency**
```typescript
const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
  // ❌ sortedBalances contains WalletBalance, not FormattedWalletBalance
```
**Impact**: TypeScript errors, runtime type mismatches
**Fix**: Ensure consistent types throughout pipeline

### 7. **Non-unique React Keys**
```typescript
key={index} // ❌ Using array index as key
```
**Impact**: React rendering issues, performance problems
**Fix**: Use unique identifiers like `${currency}-${blockchain}`

### 8. **Missing Interface Properties**
```typescript
interface WalletBalance {
  currency: string;
  amount: number;
  // ❌ Missing blockchain property that's being used
}
```
**Impact**: TypeScript compilation errors
**Fix**: Add missing properties to interface

### 9. **Weak Type Safety**
```typescript
const getPriority = (blockchain: any): number => { // ❌ Using 'any'
```
**Impact**: Loss of type safety, potential runtime errors
**Fix**: Use union types or specific interfaces

### 10. **Redundant Interface Declaration**
```typescript
interface Props extends BoxProps {} // ❌ Empty interface extending another
```
**Impact**: Unnecessary abstraction layer
**Fix**: Use `BoxProps` directly or add meaningful properties

## Original code
```typescript
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {

}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

	const getPriority = (blockchain: any): number => {
	  switch (blockchain) {
	    case 'Osmosis':
	      return 100
	    case 'Ethereum':
	      return 50
	    case 'Arbitrum':
	      return 30
	    case 'Zilliqa':
	      return 20
	    case 'Neo':
	      return 20
	    default:
	      return -99
	  }
	}

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
		  const balancePriority = getPriority(balance.blockchain);
		  if (lhsPriority > -99) {
		     if (balance.amount <= 0) {
		       return true;
		     }
		  }
		  return false
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
		  const rightPriority = getPriority(rhs.blockchain);
		  if (leftPriority > rightPriority) {
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  }
    });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}
```