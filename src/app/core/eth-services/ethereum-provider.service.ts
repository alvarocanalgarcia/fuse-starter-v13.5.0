import {MetaMaskInpageProvider} from '@metamask/providers';
import detectEthereumProvider from '@metamask/detect-provider';
import {Maybe} from '@metamask/providers/dist/utils';
import {Injectable} from '@angular/core';
import Web3 from 'web3';


@Injectable({
    providedIn: 'root'
})
export class EthereumProviderService {

  static async getProvider(): Promise<MetaMaskInpageProvider> {
    return (await detectEthereumProvider({
      mustBeMetaMask: true
    })) as MetaMaskInpageProvider;
  }

  static async requestAccounts(provider: MetaMaskInpageProvider): Promise<Maybe<unknown>> {
      const web3js = new Web3(await detectEthereumProvider({}) as any); // create web3 instance
      // return provider.request({method: 'eth_requestAccounts'});
      return await web3js.eth.getAccounts();
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
          const json = JSON.parse('[\n' +
              '    {\n' +
              '        "inputs": [],\n' +
              '        "stateMutability": "nonpayable",\n' +
              '        "type": "constructor"\n' +
              '    },\n' +
              '    {\n' +
              '        "inputs": [\n' +
              '            {\n' +
              '                "internalType": "string",\n' +
              '                "name": "id",\n' +
              '                "type": "string"\n' +
              '            },\n' +
              '            {\n' +
              '                "internalType": "string",\n' +
              '                "name": "_lover",\n' +
              '                "type": "string"\n' +
              '            },\n' +
              '            {\n' +
              '                "internalType": "string",\n' +
              '                "name": "_loved",\n' +
              '                "type": "string"\n' +
              '            },\n' +
              '            {\n' +
              '                "internalType": "string",\n' +
              '                "name": "_message",\n' +
              '                "type": "string"\n' +
              '            }\n' +
              '        ],\n' +
              '        "name": "addLoveMessage",\n' +
              '        "outputs": [\n' +
              '            {\n' +
              '                "internalType": "bool",\n' +
              '                "name": "",\n' +
              '                "type": "bool"\n' +
              '            }\n' +
              '        ],\n' +
              '        "stateMutability": "nonpayable",\n' +
              '        "type": "function"\n' +
              '    },\n' +
              '    {\n' +
              '        "inputs": [\n' +
              '            {\n' +
              '                "internalType": "address",\n' +
              '                "name": "_allowed",\n' +
              '                "type": "address"\n' +
              '            }\n' +
              '        ],\n' +
              '        "name": "allow",\n' +
              '        "outputs": [\n' +
              '            {\n' +
              '                "internalType": "bool",\n' +
              '                "name": "",\n' +
              '                "type": "bool"\n' +
              '            }\n' +
              '        ],\n' +
              '        "stateMutability": "nonpayable",\n' +
              '        "type": "function"\n' +
              '    },\n' +
              '    {\n' +
              '        "inputs": [\n' +
              '            {\n' +
              '                "internalType": "address",\n' +
              '                "name": "_denied",\n' +
              '                "type": "address"\n' +
              '            }\n' +
              '        ],\n' +
              '        "name": "deny",\n' +
              '        "outputs": [\n' +
              '            {\n' +
              '                "internalType": "bool",\n' +
              '                "name": "",\n' +
              '                "type": "bool"\n' +
              '            }\n' +
              '        ],\n' +
              '        "stateMutability": "nonpayable",\n' +
              '        "type": "function"\n' +
              '    },\n' +
              '    {\n' +
              '        "inputs": [\n' +
              '            {\n' +
              '                "internalType": "string",\n' +
              '                "name": "id",\n' +
              '                "type": "string"\n' +
              '            }\n' +
              '        ],\n' +
              '        "name": "getLoveMessage",\n' +
              '        "outputs": [\n' +
              '            {\n' +
              '                "internalType": "string",\n' +
              '                "name": "",\n' +
              '                "type": "string"\n' +
              '            },\n' +
              '            {\n' +
              '                "internalType": "string",\n' +
              '                "name": "",\n' +
              '                "type": "string"\n' +
              '            },\n' +
              '            {\n' +
              '                "internalType": "string",\n' +
              '                "name": "",\n' +
              '                "type": "string"\n' +
              '            },\n' +
              '            {\n' +
              '                "internalType": "uint256",\n' +
              '                "name": "",\n' +
              '                "type": "uint256"\n' +
              '            }\n' +
              '        ],\n' +
              '        "stateMutability": "view",\n' +
              '        "type": "function"\n' +
              '    }\n' +
              ']\n');
          const web3js = new Web3(await detectEthereumProvider({}) as any); // create web3 instance
          const alwaysLoveContract = new web3js.eth.Contract(json, '0x056Bf8Fb86AF262DBD8E1Fc13f92e70fC810B4d8');
          alwaysLoveContract.methods.getLoveMessage('1').call({from: web3js.eth.getAccounts()[0]}).then((response) => {
              console.log(response);
          });
      } finally {

      }
    }
}
