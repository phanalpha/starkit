import React, { useState } from 'react';
import { useEthereum, useProvider } from './Hooks';
import { StarkSigner } from './Signer';

function App() {
  const starkSigner = new StarkSigner(
    'starkex',
    'immutablex',
    'Only sign this request if you’ve initiated an action with Immutable X.');
  const ethereum = useEthereum();
  const provider = useProvider();
  const [starkKey, setStarkKey] = useState('');

  const handleConnect = async () => {
    if (!provider) {
      return;
    }

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const key = await starkSigner.deriveStarkKey(provider.getSigner(accounts[0]));

    setStarkKey(String(key));
  };

  return (
    <div>
      <button onClick={handleConnect}>Connect</button>
      <p>{starkKey}</p>
    </div>
  );
}

export default App;
