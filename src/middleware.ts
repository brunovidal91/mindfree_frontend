import { NextRequest, NextResponse } from 'next/server';
import { api } from './services/api';

import { getCookieServer } from './lib/cookieServer';

export async function middleware(req: NextRequest) {

    const { pathname } = req.nextUrl;
    const token = await getCookieServer();
    const check = await checkToken(token);

    if(pathname.startsWith("/_next") || pathname === "/"){
        
        return NextResponse.next();
    }


    
    if(pathname.startsWith("/dashboard")){
        if(!token){
            return NextResponse.redirect( new URL("/", req.url));
        }
    }

    if(pathname.startsWith("/transactions")){
        if(!token){
            return NextResponse.redirect( new URL("/", req.url));
        }
    }

    
    if(pathname.startsWith("/dashboard")){
        

        if(!check){
           
            return NextResponse.redirect( new URL("/", req.url));
        }
    }

    if(pathname.startsWith("/transactions")){
        

        if(!check){
           
            return NextResponse.redirect( new URL("/", req.url));
        }
    }



}

async function checkToken(token: any) {
    
    if(!token){
        return false;
    }
    
    try{
        
        await api.get("/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return true
        
    }catch(error){
        console.log(error)
        return false
    }
}