"use client"

import React, { useState, useRef, useContext, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import styles from './header.module.css';

import { CategoryModal } from '../categoryComponent';
import { UserMeModal } from '../userComponent';

import { handleLogout } from '../../utils/leave';


//Context
import { AppContext } from '../../context/index';
import { api } from '../../services/api';
import { getCookieClient } from '../../lib/cookieClient';



function Header(){

    interface UserType{
        id: string,
        name: string,
        email: string,
        createdAt: string
    }


    
    
    interface User{
        id: string,
        name: string,
        email: string,
        createdAt: string,
        admin: boolean,
    }
    
    
    

    // const { user } = useContext(AppContext);


    const [menu, setMenu] = useState("ExpandArrow");
    const [showMenu, setShowMenu] = useState(false);
    const [showCategoryComponent, setShowCategoryComponent] = useState(false);
    const [showUserComponent, setShowUserComponent] = useState(false);
    const [showMe, setShowMe] = useState(false);
    const [user, setUser] = useState({name: "", email: "", createdAt: "", admin: false});
    

    


    useEffect(() => {

        async function getUserData(){
            // setUserData( await user);
            // console.log(user);

            const token = await getCookieClient();

            const response = await api.get('/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const userData = {
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
                createdAt: response.data.createdAt,
                admin: response.data.admin
            }

            setUser(userData);

        }

        getUserData();

    },[])
   

    const menuRef = useRef(null);

    function handleOptions(){
        setShowMenu(!showMenu);

    }

    function clickme(){
        console.log("deu certo")
    }

    function handleClickOut(){
        setShowMenu(false);
        setShowMe(false);
        setMenu("ExpandArrow")


    }
 
    
    function openCategoryComponent(){
        setShowMenu(false);
        setShowCategoryComponent(true);
    }

    function closeCategoryComponent(){
        setShowCategoryComponent(false);
    }


    function openUserComponent(){
        setShowMe(false);
        setShowUserComponent(true);
    }

    function closeUserComponent(){
        setShowUserComponent(false);
    }



    function handleMe(){
        setShowMe(!showMe);

        if(showMe){
            setMenu("ExpandArrow")
        }else{
            setMenu("CollapseArrow")
        }
    }




    return(
        <>
        <header>
            <Link href="/"><Image src="/logo2.png" width={90} height={90} alt="logo"/></Link>
            <div className={styles.navContainer}>
                

                <nav>
                    <ul className={styles.menu}>
                        <li><Link href="/dashboard">Dashboard</Link></li>
                        <li><Link href="/dashboard">Lançamento</Link></li>
                        <li>
                            <Link href="/dashboard" onClick={handleOptions} >Cadastro</Link>

                        {          
                                showMenu &&        
                                <ul className={styles.submenu}>
                                    <li><Link href="/dashboard" onClick={openCategoryComponent}>Categorias</Link></li>
                                    <li><Link href="/dashboard" onClick={clickme}>Agendamentos</Link></li>
                                </ul>
                        }

                        </li>
                    </ul>
                </nav>




            </div>

           { user && 
           
           user.admin?
           <div className={styles.navAdmContainer}>
            <Link href="/dashboard">Usuários</Link>
            </div>
            : null
}
            <div className={styles.navMeContainer} onClick={handleMe}>
                <Link href="/dashboard" onClick={() => setMenu(menu == "ExpandArrow"? "CollapseArrow" : "ExpandArrow")}>
                <Image src={`/${menu}.png`} width={13} height={13} alt='menu'/>
                <span>{user?.name}</span>
                </Link>


                {
                    showMe &&

                    <ul className={styles.meList}>
                        <li><Link href="#" onClick={openUserComponent}>Meus dados</Link></li>
                        <li><Link href="#">Configurações</Link></li>
                        <li><Link href="#" onClick={handleLogout}>Sair</Link></li>
                    </ul>
                }

            </div>

            
        </header>
            {  (showMenu || showMe) && <div className={styles.back} onClick={handleClickOut}></div>}

            { showCategoryComponent && <CategoryModal close={closeCategoryComponent}/>}

            { showUserComponent && <UserMeModal close={closeUserComponent} data={user}/>}
        </>
    );
}

export { Header }