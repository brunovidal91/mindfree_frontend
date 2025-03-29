"use client"

import { toast } from "sonner";
import { api } from "../../services/api";

interface User{
    email?: string,
    password?: string
}


export async function VerifyEmailAndPassword({email, password}: User){
    if(email == "" || password == ""){
        toast.info('Teste')
        // toast.error("Preencha todos os campos");
        return;
      }
  
      try{
  
        const response = await api.post('/login', {
          email,
          password
        })
  
        if(response.data.message){
          toast.error(response.data.message);
          return;
        }
  
        // console.log(response.data);
  
  
      }catch(error){
        console.log(error);
      }
}