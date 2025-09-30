import React from 'react';
import WalletPageRefactored from './component/wallet-page-refactored.component';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Wallet Component Analysis</h1>
        <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
          <div>
            <h2>Refactored Version</h2>
            <WalletPageRefactored />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
