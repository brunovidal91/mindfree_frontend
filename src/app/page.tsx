
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { api } from '../services/api';
import { redirect } from "next/navigation";

import { cookies } from 'next/headers';

interface User{
  email?: string,
  password?: string
}


export default function Home() {

  
  async function handleLogin(formData: FormData){
    "use server"

    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    if(email == "" || password == ""){
      console.log("Preencha todos os campos");
      return;
    }

    try{

      const response = await api.post('/login', {
        email,
        password
      })
      
      if(!response.data.token){
        return;
      }


      const expirationTime = 60 * 60 * 24 * 30 * 1000; // 30 dias

      (await cookies()).set("session", response.data.token, {
        maxAge: expirationTime,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production" // só vai habilitar o https se estiver em produção
      })

      // repassar os dados para o context --> salvar no localstorage

      const user = {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        createdAt: response.data.createdAt
      }

      
    }catch(error){
      const { response }: any = error;
      if(response){

        console.log(response.data.message);
      }
      return;
    }

    redirect("/dashboard",)
  }



  return (

    <div className={styles.loginContainer}>
      <Image src="/logo.png" width={350} height={350} alt="logo" className={styles.logo}/>
      <div className={styles.verticalLine}></div>

      <form className={styles.formLogin} action={handleLogin}>
        <input type="email" name="email" id="email" placeholder="email" className={styles.loginInput}/>
        <input type="password" name="password" id="password" placeholder="senha"/>
        
        <button type="submit" className={styles.loginButton}>Acessar</button>
        <Link href="/signup">Não possui conta? Clique para criar</Link>
        <Link href="/recovery" className={styles.recovery}> Esqueceu a senha?</Link>
      </form>
    </div>

  );
}
