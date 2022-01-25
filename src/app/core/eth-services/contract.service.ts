import { Injectable } from '@angular/core';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ContractService {
    private web3js: any;
    private provider: any;
    private accounts: any;
    private contractAddress = '0x056Bf8Fb86AF262DBD8E1Fc13f92e70fC810B4d8';
    web3Modal;

    private accountStatusSource = new Subject<any>();
    accountStatus$ = this.accountStatusSource.asObservable();

    constructor() {
        const providerOptions = {
            walletconnect: {
                package: WalletConnectProvider, // required
                options: {
                    rpc: {
                        97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
                    },
                    network: 'binance'
                }
            }
        };

        this.web3Modal = new Web3Modal({
            network: 'mainnet', // optional
            cacheProvider: true, // optional
            providerOptions, // required
            theme: {
                background: 'rgb(39, 49, 56)',
                main: 'rgb(199, 199, 199)',
                secondary: 'rgb(136, 136, 136)',
                border: 'rgba(195, 195, 195, 0.14)',
                hover: 'rgb(16, 26, 32)'
            }
        });
    }

    public async connectAccount(): Promise<void>{
        this.web3Modal.clearCachedProvider();

        this.provider = await this.web3Modal.connect(); // set provider
        this.web3js = new Web3(this.provider); // create web3 instance
        this.accounts = await this.web3js.eth.getAccounts();
        this.accountStatusSource.next(this.accounts);
    }

    public getLoveMessage(id: string) {
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
        const alwaysLoveContract = new this.web3js.eth.Contract(json, this.contractAddress);
        console.log(alwaysLoveContract);
        alwaysLoveContract.methods.getLoveMessage(id).call({from: this.accounts[0]}).then((response) => {
            console.log(response);
        });
    }

}
