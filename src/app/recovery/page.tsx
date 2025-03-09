"use client"

import {useState} from 'react';
import { toast } from 'sonner';

import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";


import { api } from '../../services/api';



export default function Recovery() {
 
    const [showCard, setShowCard] = useState(false);
    const [msg, setMsg] = useState("");

  async function recovery(formData: FormData) {
    

    const email = formData.get('email');

    if(email == ""){
      return;
    }


      try{

        const response = await api.post('/recovery', {
          email
        });

        setMsg(response.data);
        setShowCard(true);

        if(response.data.message){
          toast.error(response.data.message);
          return;
        }


      }catch(error) {
        
        console.log("houve um erro: " + error);
        return;
      }
      
    
  }


 
  return (

    <div className={styles.loginContainer}>
      <Image src="/logo.png" width={350} height={350} alt="logo" className={styles.logo}/>
      <div className={styles.verticalLine}></div>

      <form className={styles.formLogin} action={recovery}>


    {
        !showCard ?

            <>
            <input type="email" name="email" id="email" placeholder="email" className={styles.loginInput} required/>
            <button type="submit" className={styles.loginButton}>Enviar</button>
            </>
        :
        
        <div className={styles.msgContainer}>
            <p>{msg}</p>
        </div>

    }



        <Link href="/">Voltar</Link>

      </form>

    </div>

  );
}
