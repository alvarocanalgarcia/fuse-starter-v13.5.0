import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from 'app/modules/admin/home/home.component';
import {PurchasedProductsComponent} from './purchased-products.component';

const purchasedProductsRoutes: Route[] = [
    {
        path     : '',
        component: PurchasedProductsComponent
    }
];

@NgModule({
    declarations: [
        PurchasedProductsComponent
    ],
    imports     : [
        RouterModule.forChild(purchasedProductsRoutes)
    ]
})
export class PurchasedProductsModule
{
}
