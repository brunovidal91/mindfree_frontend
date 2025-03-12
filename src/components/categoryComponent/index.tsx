"use client"
import Image from 'next/image';
import styles from './category.module.css';

interface Props{
    close: Function
}


export function CategoryModal({close}: Props){
    return(
        <div className={styles.modalContainer}>
            <div className={styles.modalScreen}>
                <Image src="/Cancel.png" alt='close' width={30} height={30} className={styles.btnClose} onClick={() => close()}/>

            </div>
        </div>
    );
}