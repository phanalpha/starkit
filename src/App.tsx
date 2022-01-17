import React from 'react';
import URI from 'urijs';
import { Button, Grid, Typography } from '@mui/material';
import { useEthereum, useProvider, useSearchParams } from './Hooks';
import { StarkSigner } from './Signer';

function App() {
  const starkSigner = new StarkSigner(
    'starkex',
    'immutablex',
    'Only sign this request if you’ve initiated an action with Immutable X.');
  const ethereum = useEthereum();
  const provider = useProvider();
  const [from_, callback] = useSearchParams('from', 'callback');

  const handleConnect = async () => {
    if (!provider) {
      return;
    }

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const key = await starkSigner.deriveStarkKey(provider.getSigner(accounts[0]));

    window.location.href = String(URI(callback).addSearch('stark_key', key));
  };

  return (
    <Grid container direction="column" justifyContent="center" alignContent="center">
      {from_ && callback ? (
        <>
          <Typography variant="h2" textAlign="center" marginTop={16}>{from_}</Typography>
          <Typography variant="body1" textAlign="center">
            is requiring your StarkKey.
          </Typography>
          <Typography textAlign="center" marginTop={8}>
            <Button variant="contained" onClick={handleConnect}>Connect</Button>
          </Typography>
        </>
      ) : (
        <Typography variant="h1">Oops.</Typography>
      )}
    </Grid>
  );
}

export default App;
