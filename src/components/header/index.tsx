"use client"

import React, { useState, useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import styles from './header.module.css';

import { CategoryModal } from '../categoryComponent';

import { handleLogout } from '../../utils/leave';


function Header(){

    const [menu, setMenu] = useState("ExpandArrow");
    const [showMenu, setShowMenu] = useState(false);
    const [showCategoryComponent, setShowCategoryComponent] = useState(false);
    const [showMe, setShowMe] = useState(false);
    // const [closeMenu, setCloseMenu] = useState("closeMenu");
    // const [openMenu, setOpenMenu] = useState("openMenu");


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

            <div className={styles.navAdmContainer}>
            <Link href="/dashboard">Usuários</Link>
            </div>

            <div className={styles.navMeContainer} onClick={handleMe}>
                <Link href="/dashboard" onClick={() => setMenu(menu == "ExpandArrow"? "CollapseArrow" : "ExpandArrow")}>
                <Image src={`/${menu}.png`} width={13} height={13} alt='menu'/>
                <span>Jason Bourne</span>
                </Link>


                {
                    showMe &&

                    <ul className={styles.meList}>
                        <li><Link href="#">Meus dados</Link></li>
                        <li><Link href="#">Configurações</Link></li>
                        <li><Link href="#" onClick={handleLogout}>Sair</Link></li>
                    </ul>
                }

            </div>

            
        </header>
            {  (showMenu || showMe) && <div className={styles.back} onClick={handleClickOut}></div>}

            { showCategoryComponent && <CategoryModal close={closeCategoryComponent}/>}
        </>
    );
}

export { Header }