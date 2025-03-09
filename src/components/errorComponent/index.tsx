"use client"

import styles from './error.module.css';

interface Msg{
    msg: string
}

export function ErrorMessage({msg}: Msg){
    return(

        <p className={styles.msg}>{msg}</p>
    )
}