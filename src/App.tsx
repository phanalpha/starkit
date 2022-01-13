import React, { useState } from 'react';
import { useProvider } from './Hooks';
import { StarkSigner } from './Signer';

function App() {
  const signer = new StarkSigner('starkex', 'immutablex', 'Only sign this request if you’ve initiated an action with Immutable X.');
  const provider = useProvider();
  const [starkKey, setStarkKey] = useState('');

  const handleConnect = async () => {
    if (!provider) {
      return;
    }

    const accounts = await provider.listAccounts();
    const key = await signer.deriveStarkKey(provider.getSigner(accounts[0]));

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
