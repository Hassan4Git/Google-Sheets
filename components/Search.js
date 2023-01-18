import Image from 'next/image'
import styles from '../styles/Search.module.scss'
import { useState } from 'react'


const Search = () => {
    const [listOfCustomers, setListOfCustomers] = useState([])
    const searchFunction = async (e) => {
        const searchTerm = (e.target.value).toLowerCase()
        const response = await fetch('/api/submit', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        }).then(res => res.json()).then(res => res.data)        
        searchTerm != '' ? 
        setListOfCustomers(
            response.filter(customer => customer[0].toLowerCase().includes(searchTerm))
        ) : setListOfCustomers([])
    }
    const deleteOrder = async (rowValue) => {
        const response = await fetch('/api/submit', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
            },
            body: `A${rowValue}:D${rowValue}` // This is the range to delete.
        })
        setListOfCustomers(listOfCustomers.filter(customer => customer[4] != rowValue))
    }
    return (
        <div className={styles.container}>
            <div className={styles.searchBar}>
                <div className={styles.imageContainer}>
                    <Image src='/search_icon.png' height={30} width={30} alt='Search Icon' />
                </div>
                <div className={styles.inputContainer}>
                    <input type='text' onChange={searchFunction} placeholder='Customer Name' />
                </div>
            </div>
            <div className={styles.matchedOrders}>
                {
                    listOfCustomers.map((customer, index) => {
                        return (
                            <div className={styles.orders} key={index}>
                                <span>
                                    <Image src='/person_icon.png' height={35} width={30} alt='Person Icon' />
                                    {customer[0]}
                                </span>
                                <span>
                                    <Image src='/phone_icon.png' height={30} width={30} alt='Phone Icon' />
                                    {customer[1]}
                                </span>
                                <span>
                                    <Image src='/email_icon.png' height={30} width={30} alt='Email Icon' />
                                    {customer[2]}
                                </span>
                                <span>
                                    <Image src='/order3_icon.png' height={30} width={30} alt='Order Icon' />
                                    {customer[3]}
                                </span>
                                <Image 
                                    src='/garbage_icon.png' 
                                    height={30} 
                                    width={30} 
                                    alt='Garbage Icon' 
                                    onClick={() => deleteOrder(customer[4])} //Row value that was pushed in.
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Search