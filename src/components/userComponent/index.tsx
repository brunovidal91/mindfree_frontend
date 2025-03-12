"use client"
import Image from 'next/image';
import styles from './user.module.css';

interface Props{
    close: Function,
    data: {

        name: string,
        email: string,
        createdAt: string,
        admin: boolean
    }

}

// interface UserType{
//     data: {

//         name: string,
//         email: string,
//         createdAt: string,
//         password: string,
//         confirmPass: string
//     }
// }


export function UserMeModal({close, data}: Props){
    return(
        <div className={styles.modalContainer}>
            <div className={styles.modalScreen}>
                <Image src="/Cancel.png" alt='close' width={30} height={30} className={styles.btnClose} onClick={() => close()}/>


                <form className={styles.formLogin}>

                    <label htmlFor="name">Nome</label><input type="text" name="name" id="name" placeholder="nome"  value={data.name} className={styles.loginInput} onChange={() => 1*1}/>
                    <label htmlFor="email">Email</label><input type="email" name="email" id="email" placeholder="email" value={data.email} className={styles.loginInput} onChange={() => 1*1}/>
                    <label className={styles.lblAddAt}>Criado em:&nbsp;&nbsp;{data.createdAt}</label>
                    
                    <div>
                        <input type="password" name="password" id="password" placeholder="senha" required/>
                        <input type="password" name="confirmPassword" id="confirmPassword" placeholder="confirme a senha"/>

                    </div>
                    <div>
                        <button type="submit" className={styles.loginButton}>Alterar dados</button>
                        <button type="button" className={styles.PasswordButton}>Alterar senha</button>
                        <button type="button" className={styles.DeleteButton}>Excluir conta</button>
                    </div>
                </form>


            </div>
        </div>
    );
}