"use server"

import { getCookieServer } from '../lib/cookieServer';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { api } from '../services/api';


export async function handleLogout(){
    "use server"

    const token = await getCookieServer();

    try{

      await api.get('/leave', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })


    } catch(error){
        console.log(error)

    }finally{
        const cookieStore = await cookies();
        cookieStore.delete("session");
    }


    redirect("/")
}
