"use client"

import {useState} from 'react';
import { toast } from 'sonner';

import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { redirect } from 'next/navigation';

import { api } from '../../services/api';



export default function Signup() {
 
  const [formError, setFormError] = useState(false);


  async function createUser(formData: FormData) {
    
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
  
    if(name == "" || email == "" || password == "" || confirmPassword == ""){
      return;
    }

    if(password != confirmPassword){
      toast.error("As senhas não são iguais")
      return;
    }else{

      try{

        const response = await api.post('/users/add', {
          name,
          email,
          password
  
        });

        if(response.data.message){
          toast.error(response.data.message);
          return;
        }

        
        
      }catch(error) {
        
        console.log("houve um erro: " + error);
      }
      
      redirect("/");

    }
  }


 
  return (

    <div className={styles.loginContainer}>
      <Image src="/logo.png" width={350} height={350} alt="logo" className={styles.logo}/>
      <div className={styles.verticalLine}></div>

      <form className={styles.formLogin} action={createUser}>

        <input type="text" name="name" id="name" placeholder="nome" className={styles.loginInput} required/>
        <input type="email" name="email" id="email" placeholder="email" className={styles.loginInput} required/>
        <input type="password" name="password" id="password" placeholder="senha" required/>
        <input type="password" name="confirmPassword" id="confirmPassword" placeholder="confirme a senha" required/>

      {
        formError &&
        <p className={styles.errorPassword}>As senhas não conferem</p>
      }

        <button type="submit" className={styles.loginButton}>Acessar</button>
        <Link href="/">Já possui conta? Faça o login</Link>

      </form>

    </div>

  );
}
