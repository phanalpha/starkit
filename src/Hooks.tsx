import { useEffect, useMemo, useState } from 'react';
import { providers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

export function useEthereum() {
  const [provider, setProvider] = useState<any>();
  useEffect(() => {
    detectEthereumProvider().then(setProvider);
  }, []);

  return provider;
}

export function useProvider(): providers.Web3Provider {
  const ethereum = useEthereum();

  return useMemo(() => ethereum && new providers.Web3Provider(ethereum), [ethereum]);
}

export function useSearchParams(...names: string[]) {
  const params = new URLSearchParams(window.location.search);

  return names.map(name => params.get(name) || undefined);
}
