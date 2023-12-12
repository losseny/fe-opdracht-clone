import { Router } from '@vaadin/router';

const outlet = document.querySelector('#router-outlet');
export const router = new Router(outlet);

router.setRoutes([
    {path: '/', component: 'journey-page'},
    {path: '/home', component: 'home-page'},
    {path: '/journey', component: 'journey-page'},
]);
