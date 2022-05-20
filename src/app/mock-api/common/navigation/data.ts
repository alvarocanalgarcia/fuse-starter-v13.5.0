/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'cryptoArk',
        title: 'CryptoArk',
        subtitle: 'Exchange information',
        type: 'group',
        icon: 'heroicons_outline:currency-dollar',
        children: [
            {
                id   : 'home',
                title: 'Home',
                type : 'basic',
                icon : 'heroicons_outline:home',
                link : '/home'
            },
            {
                id   : 'sellers',
                title: 'Sellers',
                type : 'basic',
                icon : 'heroicons_outline:user-group',
                link : '/sellers'
            },
            {
                id   : 'purchased-products',
                title: 'Purchased products',
                type : 'basic',
                icon : 'heroicons_outline:folder-open',
                link : '/purchased-products'
            }
        ]
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'home',
        title: 'Home',
        type : 'basic',
        icon : 'heroicons_outline:home',
        link : '/home'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'home',
        title: 'Home',
        type : 'basic',
        icon : 'heroicons_outline:home',
        link : '/home'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'home',
        title: 'Home',
        type : 'basic',
        icon : 'heroicons_outline:home',
        link : '/home'
    }
];
