import {MetaMaskInpageProvider} from '@metamask/providers';
import detectEthereumProvider from '@metamask/detect-provider';
import {Maybe} from '@metamask/providers/dist/utils';
import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class Web3Service {

  static async getProvider(): Promise<MetaMaskInpageProvider> {
    return (await detectEthereumProvider({
      mustBeMetaMask: true
    })) as MetaMaskInpageProvider;
  }

  static requestAccounts(provider: MetaMaskInpageProvider): Promise<Maybe<unknown>> {
    return provider.request({method: 'eth_requestAccounts'});
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

    static async getLoveMessage(
        provider: MetaMaskInpageProvider,
        from: string,
        to: string,
        data: string
        ): Promise<string | null> {
      try {
          return (await provider.request({
              method: 'eth_call',
              params: [
                  {from,
                      to,
                      data}
              ]
          })) as string;
      } finally {

      }
    }
}
