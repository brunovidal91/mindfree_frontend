"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './dashboard.module.css';

//Header
import { Header } from '../../components/header'; 

export default function Dashboard(){

    const [menu, setMenu] = useState("ExpandArrow");
    // const [user, setUser] = useState({});
    

    // useEffect(() => {


    //     async function getInfo(){

    //         const response = await api.get("/me", {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });

    //         setUser(response.data);


    //     }

    //     getInfo();

    // },[]);

    return(
        <>
        <Header/>
        <main>
            <div className={styles.dropDown}>
                <Image src={`/${menu}.png`} width={13} height={13} alt='menu'/>
                <span>Todos</span>
            </div>

            <section className={styles.monthSection}>

            </section>


            <section className={styles.resultSection}>

                <div className={styles.categories}></div>
                <div className={styles.compare}></div>

            </section>
        </main>
        </>
    );
}
 