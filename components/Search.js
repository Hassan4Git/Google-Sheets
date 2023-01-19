import Image from 'next/image'
import styles from '../styles/Search.module.scss'
import { useState } from 'react'

const Search = () => {
    // Declaring required state variables.
    const [listOfCustomers, setListOfCustomers] = useState([])
    const [updateArray, setUpdateArray] = useState([])
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [email, setEmail] = useState('')
    const [packageNum, setPackageNum] = useState('')
    const [searchTermState, setSearchTermState] = useState('')

    // READ: Search function. Takes the search term, fetches the data, filters for matching rows.
    const searchFunction = async (search) => {
        const searchTerm = (search).toLowerCase()
        setSearchTermState(searchTerm)
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
    
    // DELETE: Delete function. Takes the rowValue, passes it to the API as a range, to delete it.
    const deleteOrder = async (e, rowValue) => {
        e.stopPropagation()
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
        console.log(e.target.outerText)
        const splitArray = e.target.outerText.split("\n")
        splitArray.push(rowNumber)
        console.log(splitArray) 
        setUpdateArray(splitArray)
        setName(splitArray[0]); setNumber(splitArray[1]); setEmail(splitArray[2]); setPackageNum(splitArray[3]);
        document.getElementById('orderScreen').style.display = 'none'
        document.getElementById('searchSection').style.display = 'none'
        document.getElementById('updateOrder').style.display = 'flex'
    }

    // Cancel update, change displays back.
    function cancelUpdate() {
        document.getElementById('orderScreen').style.display = 'flex'
        document.getElementById('searchSection').style.display = 'block'
        document.getElementById('updateOrder').style.display = 'none'
        searchFunction(searchTermState)
    }

    // UPDATE: Submit update, and change displays back.
    async function submitUpdate() {
        const form = {
            name,
            number,
            email,
            packageNum,
            range: `A${updateArray[4]}:D${updateArray[4]}`
        }
        await fetch('/api/submit', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        searchFunction(searchTermState)
        document.getElementById('orderScreen').style.display = 'flex'
        document.getElementById('searchSection').style.display = 'block'
        document.getElementById('updateOrder').style.display = 'none'
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
                            <input type='text' onChange={(e) => searchFunction(e.target.value)} placeholder='Customer Name' />
                        </div>
                    </div>
                </div>
                {/* This is where the orders that match the search will show up. */}
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
                                        onClick={(e) => deleteOrder(e ,customer[4])} //Row value that was pushed in.
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <div className={styles.updateOrder} id='updateOrder'>
                    <h2>Update Order</h2>
                    <div className={styles.pseudoForm}>
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)} id='nameInput' />
                        <input type='text' value={number} onChange={(e) => setNumber(e.target.value)} id='numberInput' />
                        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} id='emailInput' />
                        <input type='text' value={packageNum} onChange={(e) => setPackageNum(e.target.value)} id='packageInput' />
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