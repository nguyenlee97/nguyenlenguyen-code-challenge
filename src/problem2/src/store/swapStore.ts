import { create } from 'zustand';
import { SwapState, SwapFormData, Token } from '../types';

const initialFormData: SwapFormData = {
  inputAmount: '',
  outputAmount: '',
  inputToken: 'ETH',
  outputToken: 'ATOM',
  exchangeRate: 0,
  minReceived: 0,
};

export const useSwapStore = create<SwapState>((set, get) => ({
  // Initial state
  darkMode: false,
  formData: initialFormData,
  isSwapping: false,
  error: '',

  // Actions
  setDarkMode: (darkMode: boolean) => set({ darkMode }),
  
  setFormData: (formData: Partial<SwapFormData>) => 
    set((state) => ({ 
      formData: { ...state.formData, ...formData } 
    })),
  
  setSwapping: (isSwapping: boolean) => set({ isSwapping }),
  
  setError: (error: string) => set({ error }),
  
  swapTokens: (tokens: Token[]) => {
    const { formData } = get();
    const tempToken = formData.inputToken;
    const tempAmount = formData.inputAmount;
    
    set((state) => ({
      formData: {
        ...state.formData,
        inputToken: formData.outputToken,
        outputToken: tempToken,
        inputAmount: formData.outputAmount,
        outputAmount: tempAmount,
      }
    }));
    get().calculateSwap(tokens);
  },
  
  calculateSwap: (tokens: Token[]) => {
    const { formData } = get();
    const { inputToken, outputToken, inputAmount } = formData;
    
    if (!inputToken || !outputToken || inputToken === outputToken) return;
    
    const inputPrice = tokens.find(t => t.currency === inputToken)?.price || 0;
    const outputPrice = tokens.find(t => t.currency === outputToken)?.price || 0;
    
    if (inputPrice && outputPrice) {
      const rate = inputPrice / outputPrice;
      let outputAmount = '';
      let minReceived = 0;
      
      if (inputAmount) {
        const calculatedOutput = parseFloat(inputAmount) * rate;
        outputAmount = calculatedOutput.toFixed(6);
        minReceived = calculatedOutput * 0.995;
      }
      
      set((state) => ({
        formData: {
          ...state.formData,
          exchangeRate: rate,
          outputAmount,
          minReceived,
        }
      }));
    }
  },
  
  resetForm: () => set({ 
    formData: initialFormData,
    error: '',
    isSwapping: false,
  }),
}));
