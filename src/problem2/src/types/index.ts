// Token and API types
export interface Token {
  currency: string;
  price: number;
  date: string;
  icon?: string;
}

export interface SwapFormData {
  inputAmount: string;
  outputAmount: string;
  inputToken: string;
  outputToken: string;
  exchangeRate: number;
  minReceived: number;
}

export interface SwapState {
  darkMode: boolean;
  
  formData: SwapFormData;
  
  isSwapping: boolean;
  error: string;
  
  setDarkMode: (darkMode: boolean) => void;
  setFormData: (formData: Partial<SwapFormData>) => void;
  setSwapping: (swapping: boolean) => void;
  setError: (error: string) => void;
  swapTokens: (tokens: Token[]) => void;
  calculateSwap: (tokens: Token[]) => void;
  resetForm: () => void;
}
