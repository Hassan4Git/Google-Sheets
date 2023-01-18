import Image from 'next/image'
import styles from '../styles/Search.module.scss'
import { useState } from 'react'

//Considering adding getServerSideProps. Problem with that is if they update the page, they can't then
//search it.

const Search = () => {
    const [listOfCustomers, setListOfCustomers] = useState([])
    const searchFunction = async (e) => {
        const searchTerm = (e.target.value).toLowerCase()
        const response = await fetch ('/api/submit', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            
        }).then(res => res.json()).then(res => res.data)
        console.log(response)
        searchTerm != '' ? 
        setListOfCustomers(response.filter(customer => customer[0].toLowerCase().includes(searchTerm)))
        : setListOfCustomers([])
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
                    listOfCustomers.map(customer => {
                        return (
                            <div className={styles.orders}>
                                <span>
                                    <Image src='/person_icon.png' height={30} width={30} alt='Person Icon' />
                                    {customer[0]},
                                </span>
                                <span>
                                    <Image src='/phone_icon.png' height={30} width={30} alt='Phone Icon' />
                                    {customer[1]},
                                </span>
                                <span>
                                    <Image src='/email_icon.png' height={30} width={30} alt='Email Icon' />
                                    {customer[2]},
                                </span>
                                <span>
                                    <Image src='/order3_icon.png' height={30} width={30} alt='Order Icon' />
                                    {customer[3]}
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Search