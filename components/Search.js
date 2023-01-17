import Image from 'next/image'
import styles from '../styles/Search.module.scss'
import { useState } from 'react'

const Search = () => {
    const [answer, setAnswer] = useState()
    const searchFunction = async (e) => {
        const searchTerm = (e.target.value).toLowerCase()
        const response = await fetch('/api/submit').then(res => res)
        console.log(response)
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
                <p>
                    {answer}
                </p>
            </div>
        </div>
    )
}

export default Search