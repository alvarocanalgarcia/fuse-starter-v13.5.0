import {MetaMaskInpageProvider} from '@metamask/providers';
import detectEthereumProvider from '@metamask/detect-provider';
import {Maybe} from '@metamask/providers/dist/utils';
import {Injectable} from '@angular/core';
import Web3 from 'web3';
import CryptoArk from './CryptoArk.json';
import {AbiItem} from 'web3-utils';


@Injectable({
    providedIn: 'root'
})
export class EthereumProviderService {

  static async getProvider(): Promise<MetaMaskInpageProvider> {
    return (await detectEthereumProvider({
      mustBeMetaMask: true
    })) as MetaMaskInpageProvider;
  }

  static async requestAccounts(): Promise<Maybe<unknown>> {
      const provider = await this.getProvider();
      return provider.request({
            method: 'eth_requestAccounts'
      });
  }

  static async getEncryptionPublicKey(
    provider: MetaMaskInpageProvider,
    account: string
  ): Promise<string | null> {
    try {
      return (await provider.request({
        method: 'eth_getEncryptionPublicKey',
        params: [account]
      })) as string;
    } finally {

    }
  }

  static async decryptMessage(
    provider: MetaMaskInpageProvider,
    message: string,
    account: string,
  ): Promise<string | null> {
    try {
      return (await provider.request({
        method: 'eth_decrypt',
        params: [message, account]
      })) as string;
    } finally {

    }
  }

    static async getBalance(
        provider: MetaMaskInpageProvider,
        account: string,
        quantity: string
    ): Promise<string | null> {
        try {
            return (await provider.request({
                method: 'eth_getBalance',
                params: [account, quantity]
            })) as string;
        } finally {

        }
    }

    static async getLoveMessage(): Promise<void>{
      try {
          const web3js = new Web3(await detectEthereumProvider({}) as any); // create web3 instance
          const alwaysLoveContract = new web3js.eth.Contract(CryptoArk as unknown as AbiItem, '0x056Bf8Fb86AF262DBD8E1Fc13f92e70fC810B4d8');
          alwaysLoveContract.methods.getLoveMessage('1').call({from: web3js.eth.getAccounts()[0]}).then((response) => {
              console.log(response);
          });
      } finally {

      }
    }
}
