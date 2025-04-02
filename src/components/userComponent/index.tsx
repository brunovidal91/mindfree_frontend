"use client"
import React, { useState, useRef, cache } from 'react';
import Image from 'next/image';
import styles from './user.module.css';
import { api } from '../../services/api';
import { toast } from 'sonner';
import { getCookieClient } from '../../lib/cookieClient';
import { redirect, useRouter } from 'next/navigation';


interface Props{
    close: Function,
    dados: {
        id: string,
        name: string,   
        email: string,
        createdAt: string,
        admin: boolean
    }

}


export function UserMeModal({close, dados}: Props){

    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [changeEmail, setChangeEmail] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const inputOldPassRef = useRef(null);

    const router = useRouter();

   async function handleChangePassword(){
        
        if(oldPass == "" || newPass == ""){
            toast.error("Para alteração de senha é necessário preencher os campos de senha atual e nova.");
            return;
        }

        if(newPass.length < 6){
            toast.error("A nova senha precisar ter pelo menos 6 caracteres");
            return;
        }

        if(oldPass.toLocaleLowerCase() == newPass.toLocaleLowerCase()){
            toast.error("A nova senha foi utilizada recentemente, por favor insira outra.")
            return;
        }

        try{

           const response = await api.put("/users/update", {
                currentPassword: oldPass,
                newPassword: newPass
            },{
    
                headers: {
                    Authorization: `Bearer ${ await getCookieClient()}`
                }
            });
            setNewPass("");
            setOldPass("");
    
            toast.success(response?.data.message);
            router.refresh();
        }

        catch(error) {
            const { response }: any = error;
            toast.error(response?.data.message);
            return;
        }
    
    }

    async function handleChangeUserInfo(formData: FormData) {
        const userName = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');

        // Alterando o nome e email
        if(changeEmail){

            try{

               const response =  await api.put("/users/update/"+dados.id, {
                    name: userName,
                    email,
                    currentPassword: password
                }, {
                    headers: {
                        Authorization: `Bearer ${getCookieClient()}`
                    }
                });

                toast.success("Dados alterados com sucesso!")
                router.refresh();


            }catch(error){
                const { response }: any = error;
                toast.error(response?.data.message);
                return;
            }


        }else{

            // Alterando apenas o nome
            try{
    
               const response =  await api.put("/users/update/"+dados.id, {
                    name: userName,
                    currentPassword: password
                }, {
                    headers: {
                        Authorization: `Bearer ${getCookieClient()}`
                    }
                });
    
            
                toast.success("Dados alterados com sucesso!")
                router.refresh();
    
                
            }catch(error){
                
                const { response }: any = error;
                toast.error(response?.data.message);
                return;
            }
        }

    }

    async function handleDeleteUser() {
        const answer = prompt("Tem certeza que deseja deletar seu usuário? Todas as informações serão excluídas definitivamente. Para completar a exclusão, confirme o endereço de email cadastrado.")
        
        if(!answer){
            toast.error("Exclusão não realizada, o endereço de email não foi confirmado.");
            return
        }

        if(answer?.toLocaleLowerCase() != dados.email.toLocaleLowerCase()){
            toast.error("Exclusão não realizada, o email não confere com o cadastrado.");
            return;
        }

        try{

            const response = await api.delete('/users/delete/'+dados.id, {
                headers: {
                    Authorization: `Bearer ${getCookieClient()}`
                }
            });

            toast.success("Usuário excluído. Você será desconectado.");

            setTimeout(() => {
                redirect("/")
            }, 5000);


        }catch(error){
            const { response }: any = error;
            toast.error(response?.data.message);
            return;
        }

    }


    return(
        <div className={styles.modalContainer}>
            <div className={styles.modalScreen}>
                <Image src="/Cancel.png" alt='close' width={30} height={30} className={styles.btnClose} onClick={() => close()}/>


                <form className={styles.formLogin} id='form-me' action={handleChangeUserInfo}>

                    <label htmlFor="name">Nome</label><input type="text" name="name" id="name" placeholder={dados.name} className={styles.loginInput} onChange={(e) => setName(e.target.value)}/>
                    <label htmlFor="email">Email</label>
                    <div className={styles.emailContainer}>
                        <input type="email" name="email" id="email" placeholder={dados.email}  className={styles.loginInput} onChange={(e) => setEmail(e.target.value)}/>
                        <div className={styles.checkboxArea}>
                            <input type="checkbox" name="changeEmail" id="changeEmail" onChange={(e) => setChangeEmail(!changeEmail)}/>
                            <label htmlFor='changeEmail'>Alterar Email?</label>

                        </div>
                    </div>
                    <label className={styles.lblAddAt}>Criado em:&nbsp;&nbsp;{dados.createdAt}</label>
                    
                    <div>
                        <input type="password" name="password" id="password" placeholder="senha atual" required onChange={(e) => setOldPass(e.target.value)} ref={inputOldPassRef} autoComplete='off' autoSave='off'/>
                        <input type="password" name="newPassword" id="newPassword" placeholder="nova senha"  onChange={(e) => setNewPass(e.target.value)}/>

                    </div>
                    <div>
                        <button type="submit" className={styles.loginButton}>Alterar dados</button>
                        <button type="button" className={styles.PasswordButton} onClick={handleChangePassword}>Alterar senha</button>
                        <button type="button" className={styles.DeleteButton} onClick={handleDeleteUser}>Excluir conta</button>
                    </div>
                </form>


            </div>
        </div>
    );
}