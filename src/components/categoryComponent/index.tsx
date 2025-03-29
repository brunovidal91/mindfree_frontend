"use client"
import React, {useState, useRef, useEffect} from 'react';
import Image from 'next/image';
import styles from './category.module.css';
import { toast } from 'sonner';
import { api } from '../../services/api';
import { getCookieClient } from '../../lib/cookieClient';

interface Props{
    close: Function
}

interface Category{
    id: number,
    title: string,
    isMonthly: boolean,
    day: number
}



export function CategoryModal({close}: Props){

    //States

    const [categoryList, setCategoryList] = useState<Array<Category>>([].sort((a,b) => a > b ? 1 : -1));
    const [categoryId, setCategoryId] = useState(0);
    const [categoryTitle, setCategoryTitle] = useState("");
    const [categoryIsMonthly, setCategoryIsMonthly] = useState(false);
    const [categoryDay, setCategoryDay] = useState(30);
    const [createdItem, setCreatedItem] = useState(false);


    //UseEffect

    useEffect(() => {

        async function getCategoryList() {
            try{

                const response = await api.get('/categories', {
                    headers: {
                        Authorization: `Bearer ${getCookieClient()}`
                    }
                });

                setCategoryList(response.data.sort((a: any,b: any) => a.title > b.title ? 1 : - 1));

            }catch(error){
                const { response }: any = error 
                toast.error(response?.data.message);
            }
        }

        getCategoryList();

    },[])

    useEffect(() => {
        async function getCategoryList() {
            try{

                const response = await api.get('/categories', {
                    headers: {
                        Authorization: `Bearer ${getCookieClient()}`
                    }
                });

                setCategoryList(response.data.sort((a: any,b: any) => a.title > b.title ? 1 : - 1));

            }catch(error){
                const { response }: any = error 
                toast.error(response?.data.message);
            }
        }

        getCategoryList();
    },[createdItem])

    //Refs
    const categoryDayRef = useRef<HTMLInputElement>(null);
    const categoryTitleRef = useRef<HTMLInputElement>(null);

    //Functions

    function handleMonthly(){
        setCategoryIsMonthly(!categoryIsMonthly);

        categoryDayRef?.current?.focus();
    }

    function handleCategoryList(e: any){
        const selected = e.target.value;

        if(!selected){

            setCategoryId(0);
            setCategoryTitle("");
            setCategoryIsMonthly(false);
            setCategoryDay(30);
            return
        }

        const item = categoryList.filter((item) => {

            return item.title.toLocaleLowerCase() === String(selected).toLocaleLowerCase()
        })

        const currentCategory = {
            id: item[0].id,
            title: item[0].title,
            isMonthly: item[0].isMonthly,
            day: item[0].day == 0 ? 30 : item[0].day
        }
        
        setCategoryId(currentCategory.id ?? 0);
        setCategoryTitle(currentCategory.title ?? '');
        setCategoryIsMonthly(currentCategory.isMonthly ?? false);
        setCategoryDay(currentCategory.day ?? 30);
        

    }

    async function handleAddCategory(){
        if(!categoryTitle){
            toast.error("Favor preencher o nome da categoria.");
            return;
        }

        if(categoryTitle.length < 3){
            toast.error("O nome da categoria deve ter pelo menos 3 caracteres.");
            return;
        }

        let verify: boolean = false;

        if(categoryList.length > 0){

            categoryList.forEach((item) => {


                if(item.title.toLowerCase().trim() == categoryTitle.toLowerCase().trim()){
                    verify = true
                    return toast.error("Esta categoria já está cadastrada.");
                }
                    
            });
        }

        if(!verify){
            // Cadastrando uma nova categoria
            try{

                await api.post('/categories/add', {
                    title: categoryTitle,
                    isMonthly: categoryIsMonthly,
                    day: categoryDay.toString()
                },
                {
                    headers: {
                        Authorization: `Bearer ${getCookieClient()}`
                    }
                })

                handleClean()
                setCreatedItem(!createdItem);
                return toast.success("Categoria cadastrada com sucesso!");

            }catch(error){
                const { response }: any = error;
                toast.error(response?.data.message)
                return;
            }

        }
    }

    function handleClean(){
        setCategoryId(0);
        setCategoryTitle("");
        setCategoryIsMonthly(false);
        setCategoryDay(30);

        categoryTitleRef.current?.focus();
    }

    async function handleDeleteCategory(){
        if(!categoryId){
            toast.error("Selecione uma categoria para deletar.")
            return;
        }

        const answer = confirm(`Deseja concluir a exclusão da categoria '${categoryTitle}'?`)

        if(answer){

            try{
    
                await api.delete('/categories/'+categoryId.toString(),
                {
                    headers: {
                        Authorization: `Bearer ${getCookieClient()}`
                    }
                });
    
                setCreatedItem(!createdItem);
                handleClean();
                toast.success("Categoria deletada com sucesso.")
                return;
    
            }catch(error){
                const { response }: any = error;
                toast.error(response?.data.message);
                return;
            }
        }

    }

    return(
        <div className={styles.modalContainer}>
            <div className={styles.modalScreen}>
                <Image src="/Cancel.png" alt='close' width={30} height={30} className={styles.btnClose} onClick={() => close()}/>

                <div className={styles.categoryFirstColumn}>

                    <div>
                        <label htmlFor="category">Nome da Categoria</label>
                        <input type="text" id="category-input" name="category-input" maxLength={25} placeholder='Ex.: Mercado' value={categoryTitle} onChange={(e) => setCategoryTitle(e.target.value)} ref={categoryTitleRef}/>
                    </div>

                    <div>
                        <label htmlFor="category">É mensal?</label>
                        <input type="checkbox" id="category-check" name="category-check" onChange={handleMonthly} checked={categoryIsMonthly}/>
                    </div>
                    
                    <div>
                        <label htmlFor="category">dia</label>
                        <input type="number" id="category-day" name="category-day" maxLength={2} min={1} max={31} disabled={!categoryIsMonthly} ref={categoryDayRef} value={categoryDay} onChange={(e) => setCategoryDay(Number(e.target.value))}/>
                    </div>
                </div>



                <div className={styles.categorySecondColumn}>

                    <label htmlFor="list">Categorias ativas</label>
                    <select id="category-list" name="category-list" onChange={(e) => handleCategoryList(e)}>
                        <option></option>
                        {
                            
                            categoryList.map((item, index): any => {
                                return(
                                    <option key={item.id}>{item.title}</option>
                                )
                            })
                        }

                    </select>

                    <input type="button" onClick={handleClean} value="Limpar"/>

                </div>
                <div className={styles.categoryThirdColumn}>
                    <input type="button" value="Salvar" onClick={handleAddCategory}/>
                    <input type="button" value="Excluir" onClick={handleDeleteCategory}/>
                </div>

            </div>
        </div>
    );
}