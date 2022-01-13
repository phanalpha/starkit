import BN from 'bn.js';
import { ec } from 'elliptic';
import { hexToBuffer } from 'enc-utils';
import { hdkey } from 'ethereumjs-wallet';
import { Signer, utils } from 'ethers';
import { getAccountPath, grindKey, starkEc } from '@phanalpha/starkcrypto';

export class StarkSigner {
  constructor(private layer: string, private application: string, private message: string) {
  }

  async deriveStarkKey(signer: Signer): Promise<BN> {
    const key = await this.deriveKeyPair(signer);

    return key.getPublic().getX();
  }

  private async deriveKeyPair(signer: Signer): Promise<ec.KeyPair> {
    const signature_str = await signer.signMessage(this.message);
    const signature = utils.splitSignature(signature_str);
    const path = getAccountPath(this.layer, this.application, await signer.getAddress(), 1);
    const derived = hdkey
      .fromMasterSeed(hexToBuffer(signature.s))
      .derivePath(path)
      .getWallet()
      .getPrivateKeyString();

    return starkEc.keyFromPrivate(grindKey(derived, starkEc.n as BN), 'hex');
  }
}
