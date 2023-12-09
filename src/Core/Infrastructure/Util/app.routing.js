import { Router } from '@vaadin/router';

const outlet = document.querySelector('#router-outlet');
export const router = new Router(outlet);

router.setRoutes([
    {path: '/', component: 'login-page'},
    {path: '/home', component: 'app-page'},
]);
