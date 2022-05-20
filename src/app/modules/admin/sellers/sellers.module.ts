import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from 'app/modules/admin/home/home.component';
import {SellersComponent} from './sellers.component';

const sellersRoutes: Route[] = [
    {
        path     : '',
        component: SellersComponent
    }
];

@NgModule({
    declarations: [
        SellersComponent
    ],
    imports     : [
        RouterModule.forChild(sellersRoutes)
    ]
})
export class SellersModule
{
}
