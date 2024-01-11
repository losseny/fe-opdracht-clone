import { Router } from '@vaadin/router';

const outlet = document.querySelector('#router-outlet');
export const router = new Router(outlet);

router.setRoutes([
    {path: '/', component: 'login-page'},
    {path: '/home', component: 'home-page'},
    {
        path: '/journey', component: 'journey-page',
        children: [
            {path: '/registration', component: 'journey-component'},
            {path: '/transport', component: 'transport-option-component'},
            {path: '/location', component: 'location-component'},
            {path: '/detail', component: 'journey-detail-component'},
        ]
    },
    {
        path: '/profile', component: 'profile-page',
        children: [
            {path: '/settings', component: 'profile-settings-component'},
            {path: '/routes', component: 'route-component'},
            {path: '/favorites', component: 'favorite-routes-page'},

        ]
    },
]);
