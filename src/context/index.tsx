"use client"

import React, { createContext, useState, useEffect } from 'react';
import { getCookieClient } from '../lib/cookieClient';
import { api } from '../services/api';




interface UserType{
    name: string,
    email: string,
    createdAt: string
}


interface ContextType{
    user: UserType,
    setUser: React.Dispatch<React.SetStateAction<UserType>>
}

const DEFAULT_VALUE = {
    user:{
        name: "",
        email: "",
        createdAt: ""
    },

    setUser: () => {}
}


export const AppContext = createContext<ContextType>(DEFAULT_VALUE);



export function MainContext({ children }: {children: React.ReactNode}){

    const [user, setUser] = useState<UserType>({name: "", email: "", createdAt: ""});
    const [token, setToken] = useState(getCookieClient());

    useEffect(() => {


        async function getInfo(){

            if(!token){
                return;
            }

            const response = await api.get("/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setUser(response.data);
            

        }

        getInfo();

    },[]);



    function addUser(user: UserType){
        setUser(user);
    }


    return(
        <AppContext.Provider value={{ user, setUser }}>
            {children}
        </AppContext.Provider>
    )
}