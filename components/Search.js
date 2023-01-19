import Image from 'next/image'
import styles from '../styles/Search.module.scss'
import { useState } from 'react'

const Search = () => {
    const [listOfCustomers, setListOfCustomers] = useState([])
    const [updateArray, setUpdateArray] = useState([])
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [email, setEmail] = useState('')
    const [packageNum, setPackageNum] = useState('')
    const [rowNumber, setRowNumer] = useState('')
    // Search function. Takes the search term, fetches the data, filters for matching rows.
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
    // Delete function. Takes the rowValue, passes it to the API as a range, to delete it.
    const deleteOrder = async (rowValue) => {
        await fetch('/api/submit', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
            },
            body: `A${rowValue}:D${rowValue}` // This is the range to delete.
        })
        setListOfCustomers(listOfCustomers.filter(customer => customer[4] != rowValue))
    }
    // Setup for update order screen.
    const updateOrderSetup = async (e, rowNumber) => {
        const splitArray = e.target.outerText.split("\n")
        splitArray.push(rowNumber); setUpdateArray(splitArray)
        document.getElementById('orderScreen').style.display = 'none'
        document.getElementById('searchSection').style.display = 'none'
        document.getElementById('updateOrder').style.display = 'flex'
        setName(updateArray[0]); setNumber(updateArray[1]); setEmail(updateArray[2]); setPackageNum(updateArray[3]); setRowNumer(updateArray[4])
    }
    // Cancel update, change displays back.
    function cancelUpdate() {
        document.getElementById('orderScreen').style.display = 'flex'
        document.getElementById('searchSection').style.display = 'block'
        document.getElementById('updateOrder').style.display = 'none'
    }
    // Submit update, and change displays back.
    function submitUpdate() {
        
    }
    return (
        <>
            <div className={styles.container}>
                <div id='searchSection'>
                    <h2>Order Search</h2>
                    <div className={styles.searchBar}>
                        <div className={styles.imageContainer}>
                            <Image src='/search_icon.png' height={30} width={30} alt='Search Icon' />
                        </div>
                        <div className={styles.inputContainer}>
                            <input type='text' onChange={searchFunction} placeholder='Customer Name' />
                        </div>
                    </div>
                </div>
                <div className={styles.matchedOrders} id='orderScreen'>
                    {
                        listOfCustomers.map((customer, index) => {
                            return (
                                <div className={styles.order} key={index} onClick={(e) => updateOrderSetup(e, customer[4])}>
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
                <div className={styles.updateOrder} id='updateOrder'>
                    <h2>Update Order</h2>
                    <div className={styles.pseudoForm}>
                        <input type='text' defaultValue={updateArray[0]} onChange={(e) => setName(e.target.value)} />
                        <input type='text' defaultValue={updateArray[1]} onChange={(e) => setNumber(e.target.value)} />
                        <input type='text' defaultValue={updateArray[2]} onChange={(e) => setEmail(e.target.value)} />
                        <input type='text' defaultValue={updateArray[3]} onChange={(e) => setPackageNum(e.target.value)} />
                        <div className={styles.buttonWrapper}>
                            <button className={styles.updateButton} onClick={submitUpdate}>Update</button>
                            <button className={styles.cancelButton} onClick={cancelUpdate}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search