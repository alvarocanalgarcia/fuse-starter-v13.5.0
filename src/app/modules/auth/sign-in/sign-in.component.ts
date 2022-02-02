import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import {EthereumProviderService} from '../../../core/eth-services/ethereum-provider.service';
import {bufferToHex} from 'ethereumjs-util';
import {encrypt} from 'eth-sig-util';

@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthSignInComponent implements OnInit
{
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signInForm: FormGroup;
    showAlert: boolean = false;

    // web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/0466b07d85ad4e828497cd8b43fa1e5e'));

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.signInForm = this._formBuilder.group({
            email     : ['hughes.brian@company.com', [Validators.required, Validators.email]],
            password  : ['admin', Validators.required],
            rememberMe: ['']
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void
    {
        // Return if the form is invalid
        if ( this.signInForm.invalid )
        {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this._authService.signIn(this.signInForm.value)
            .subscribe(
                () => {

                    // Set the redirect url.
                    // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
                    // to the correct page after a successful sign in. This way, that url can be set via
                    // routing file and we don't have to touch here.
                    const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

                    // Navigate to the redirect url
                    this._router.navigateByUrl(redirectURL);

                },
                (response) => {

                    // Re-enable the form
                    this.signInForm.enable();

                    // Reset the form
                    this.signInNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type   : 'error',
                        message: 'Wrong email or password'
                    };

                    // Show the alert
                    this.showAlert = true;
                }
            );
    }

    async connectToWallet(): Promise<void> {
        EthereumProviderService.requestAccounts(await EthereumProviderService.getProvider()).then(async (accounts) => {
            console.log(accounts);
            if (accounts) {
                // @ts-ignore
                const selectedAccount = accounts[0];
                EthereumProviderService.getEncryptionPublicKey(await EthereumProviderService.getProvider(), selectedAccount).then(async (publicKey) => {
                    if (publicKey != null) {
                        const encryptedMessage = bufferToHex(Buffer.from(
                            JSON.stringify(
                                encrypt(publicKey, {
                                    data: 'Esto esta bien encriptado web'
                                }, 'x25519-xsalsa20-poly1305')), 'utf-8'));
                        EthereumProviderService.decryptMessage(await EthereumProviderService.getProvider(), encryptedMessage, selectedAccount).then((decryptedMessage) => {
                            console.log(decryptedMessage);
                        });
                    }
                });

                EthereumProviderService.getBalance(await EthereumProviderService.getProvider(), selectedAccount, 'latest').then((balance) => {
                    console.log(balance);
                });

                await EthereumProviderService.getLoveMessage();
            }
        });

        // await this.contractService.connectAccount().then(() => {
        //     console.log(this.contractService.getLoveMessage('1'));
        // });
    }
}
