// para recuperar o cookie em componente client precisa instalar a bibliotca: npm install cookies-next

import { getCookie } from 'cookies-next';

export function getCookieClient(){
    const token = getCookie("session");
    return token;
}