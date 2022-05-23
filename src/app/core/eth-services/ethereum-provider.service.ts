import {MetaMaskInpageProvider} from '@metamask/providers';
import detectEthereumProvider from '@metamask/detect-provider';
import {Maybe} from '@metamask/providers/dist/utils';
import {Injectable} from '@angular/core';
import Web3 from 'web3';
import CryptoArk from './CryptoArk.json';
import {AbiItem} from 'web3-utils';
import {Seller} from './models/seller.model';
import {Product} from './models/product.model';
import {PurchasedProduct} from './models/purchasedProduct.model';


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

    static async sellerRegistry(name: string, description: string): Promise<boolean> {
        const web3js = new Web3(await this.getProvider() as any); // create web3 instance
        const cryptoArkContract = new web3js.eth.Contract(CryptoArk as unknown as AbiItem, '0x056Bf8Fb86AF262DBD8E1Fc13f92e70fC810B4d8');
        return cryptoArkContract.methods.registroVendedor(name, description).call().then(() => true, () => false);
    }

    static async buyerRegistry(name: string, description: string): Promise<boolean> {
        const web3js = new Web3(await this.getProvider() as any); // create web3 instance
        const cryptoArkContract = new web3js.eth.Contract(CryptoArk as unknown as AbiItem, '0x056Bf8Fb86AF262DBD8E1Fc13f92e70fC810B4d8');
        return cryptoArkContract.methods.registroComprador(name, description).call().then(() => true, () => false);
    }

    static async productRegistry(publicKey: string, firstDescription: string, pricel1: number, level1: string, photoIPFSL1: string,
                                 pricel2: number, level2: string, photoIPFSL2: string, pricel3: number, level3: string, photoIPFSL3: string): Promise<boolean> {
        const web3js = new Web3(await this.getProvider() as any); // create web3 instance
        const cryptoArkContract = new web3js.eth.Contract(CryptoArk as unknown as AbiItem, '0x056Bf8Fb86AF262DBD8E1Fc13f92e70fC810B4d8');
        return cryptoArkContract.methods.registroProducto(publicKey, firstDescription, pricel1, level1, photoIPFSL1, pricel2, level2,
            photoIPFSL2, pricel3, level3, photoIPFSL3).call().then(() => true, () => false);
    }

    static async getSellers(): Promise<Seller[]> {
        const web3js = new Web3(await this.getProvider() as any); // create web3 instance
        const cryptoArkContract = new web3js.eth.Contract(CryptoArk as unknown as AbiItem, '0x056Bf8Fb86AF262DBD8E1Fc13f92e70fC810B4d8');
        return cryptoArkContract.methods.getVendedores().call().then(response => response as Seller[], () => []);
    }

    static async getSellerProducts(seller: string): Promise<Product[]> {
        const web3js = new Web3(await this.getProvider() as any); // create web3 instance
        const cryptoArkContract = new web3js.eth.Contract(CryptoArk as unknown as AbiItem, '0x056Bf8Fb86AF262DBD8E1Fc13f92e70fC810B4d8');
        return cryptoArkContract.methods.getProductosVendedor(seller).call().then(response => response as Product[], () => []);
    }

    static async getSellerProduct(seller: string, id: number): Promise<Product[]> {
        const web3js = new Web3(await this.getProvider() as any); // create web3 instance
        const cryptoArkContract = new web3js.eth.Contract(CryptoArk as unknown as AbiItem, '0x056Bf8Fb86AF262DBD8E1Fc13f92e70fC810B4d8');
        return cryptoArkContract.methods.getProductoVendedor(seller, id).call().then(response => response as Product[], () => []);
    }

    static async buyProduct(seller: string, id: number, publicKey: string, value: number): Promise<boolean> {
        const web3js = new Web3(await this.getProvider() as any); // create web3 instance
        const cryptoArkContract = new web3js.eth.Contract(CryptoArk as unknown as AbiItem, '0x056Bf8Fb86AF262DBD8E1Fc13f92e70fC810B4d8');
        return cryptoArkContract.methods.comprarProducto(seller, id, publicKey).send({
            from: await this.requestAccounts()[0],
            value: value
        }).then(() => true, () => false);
    }

    static async buyProductLevel2(id: number, value: number): Promise<boolean> {
        const web3js = new Web3(await this.getProvider() as any); // create web3 instance
        const cryptoArkContract = new web3js.eth.Contract(CryptoArk as unknown as AbiItem, '0x056Bf8Fb86AF262DBD8E1Fc13f92e70fC810B4d8');
        return cryptoArkContract.methods.comprarProductoNivel2(id).send({
            from: await this.requestAccounts()[0],
            value: value
        }).then(() => true, () => false);
    }

    static async buyProductLevel3(id: number, value: number): Promise<boolean> {
        const web3js = new Web3(await this.getProvider() as any); // create web3 instance
        const cryptoArkContract = new web3js.eth.Contract(CryptoArk as unknown as AbiItem, '0x056Bf8Fb86AF262DBD8E1Fc13f92e70fC810B4d8');
        return cryptoArkContract.methods.comprarProductoNivel3(id).send({
            from: await this.requestAccounts()[0],
            value: value
        }).then(() => true, () => false);
    }

    static async paymentRefundLevel1(id: number): Promise<boolean> {
        const web3js = new Web3(await this.getProvider() as any); // create web3 instance
        const cryptoArkContract = new web3js.eth.Contract(CryptoArk as unknown as AbiItem, '0x056Bf8Fb86AF262DBD8E1Fc13f92e70fC810B4d8');
        return cryptoArkContract.methods.devolucionPagoNivel1(id).call().then(() => true, () => false);
    }

    static async paymentRefundLevel2(id: number): Promise<boolean> {
        const web3js = new Web3(await this.getProvider() as any); // create web3 instance
        const cryptoArkContract = new web3js.eth.Contract(CryptoArk as unknown as AbiItem, '0x056Bf8Fb86AF262DBD8E1Fc13f92e70fC810B4d8');
        return cryptoArkContract.methods.devolucionPagoNivel2(id).call().then(() => true, () => false);
    }

    static async paymentRefundLevel3(id: number): Promise<boolean> {
        const web3js = new Web3(await this.getProvider() as any); // create web3 instance
        const cryptoArkContract = new web3js.eth.Contract(CryptoArk as unknown as AbiItem, '0x056Bf8Fb86AF262DBD8E1Fc13f92e70fC810B4d8');
        return cryptoArkContract.methods.devolucionPagoNivel3(id).call().then(() => true, () => false);
    }

    static async getProductIdsBuyerSeller(address: string): Promise<number[]> {
        const web3js = new Web3(await this.getProvider() as any); // create web3 instance
        const cryptoArkContract = new web3js.eth.Contract(CryptoArk as unknown as AbiItem, '0x056Bf8Fb86AF262DBD8E1Fc13f92e70fC810B4d8');
        return cryptoArkContract.methods.getIdProductosCompradosCompradorVendedor(address).call().then(response => response as number[], () => []);
    }

    static async getProductsBuyerSeller(address: string): Promise<PurchasedProduct[]> {
        const web3js = new Web3(await this.getProvider() as any); // create web3 instance
        const cryptoArkContract = new web3js.eth.Contract(CryptoArk as unknown as AbiItem, '0x056Bf8Fb86AF262DBD8E1Fc13f92e70fC810B4d8');
        return cryptoArkContract.methods.getProductosCompradosCompradorVendedor(address).call().then(response => response as PurchasedProduct[], () => []);
    }

    static async getProductBuyerSeller(id: number): Promise<PurchasedProduct> {
        const web3js = new Web3(await this.getProvider() as any); // create web3 instance
        const cryptoArkContract = new web3js.eth.Contract(CryptoArk as unknown as AbiItem, '0x056Bf8Fb86AF262DBD8E1Fc13f92e70fC810B4d8');
        return cryptoArkContract.methods.getProductoComprado(id).call().then(response => response as PurchasedProduct, () => null);
    }

    static async revealN1(id: number, revealedLevel1: string, ipfsPhotoL1): Promise<boolean> {
        const web3js = new Web3(await this.getProvider() as any); // create web3 instance
        const cryptoArkContract = new web3js.eth.Contract(CryptoArk as unknown as AbiItem, '0x056Bf8Fb86AF262DBD8E1Fc13f92e70fC810B4d8');
        return cryptoArkContract.methods.desvelarN1(id, revealedLevel1, ipfsPhotoL1).call().then(response => true, () => false);
    }

    static async revealN2(id: number, revealedLevel2: string, ipfsPhotoL2): Promise<boolean> {
        const web3js = new Web3(await this.getProvider() as any); // create web3 instance
        const cryptoArkContract = new web3js.eth.Contract(CryptoArk as unknown as AbiItem, '0x056Bf8Fb86AF262DBD8E1Fc13f92e70fC810B4d8');
        return cryptoArkContract.methods.desvelarN2(id, revealedLevel2, ipfsPhotoL2).call().then(response => true, () => false);
    }

    static async revealN3(id: number, revealedLevel3: string, ipfsPhotoL3): Promise<boolean> {
        const web3js = new Web3(await this.getProvider() as any); // create web3 instance
        const cryptoArkContract = new web3js.eth.Contract(CryptoArk as unknown as AbiItem, '0x056Bf8Fb86AF262DBD8E1Fc13f92e70fC810B4d8');
        return cryptoArkContract.methods.desvelarN1(id, revealedLevel3, ipfsPhotoL3).call().then(response => true, () => false);
    }

    static async soldProduct(id: number): Promise<boolean> {
        const web3js = new Web3(await this.getProvider() as any); // create web3 instance
        const cryptoArkContract = new web3js.eth.Contract(CryptoArk as unknown as AbiItem, '0x056Bf8Fb86AF262DBD8E1Fc13f92e70fC810B4d8');
        return cryptoArkContract.methods.productoVendido(id).call().then(response => true, () => false);
    }

    static async withdrawEarnings(): Promise<boolean> {
        const web3js = new Web3(await this.getProvider() as any); // create web3 instance
        const cryptoArkContract = new web3js.eth.Contract(CryptoArk as unknown as AbiItem, '0x056Bf8Fb86AF262DBD8E1Fc13f92e70fC810B4d8');
        return cryptoArkContract.methods.retirarGanancias().call().then(response => true, () => false);
    }
}
