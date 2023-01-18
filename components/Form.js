import styles from '../styles/Form.module.scss'
import Image from 'next/image'
import { TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material'
import { useState } from 'react'

const Form = () => {
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [email, setEmail] = useState('')
    const [packageNum, setPackageNum] = useState('')
    const handleChange = (event) => {
        setPackageNum(event.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = {
            name,
            number,
            email,
            packageNum
        }
        await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        setName(''); setNumber(''); setEmail(''); setPackageNum('')
    }
    return (
        <div className={styles.container}>
            <Image src='/google_sheets_logo.png' height={70} width={50} alt='Google Sheets' id={styles.bottom} />
            <Image src='/google_sheets_logo.png' height={70} width={50} alt='Google Sheets' id={styles.top} />
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1>Order</h1>
                <TextField 
                    variant='outlined' 
                    label='Name' 
                    fullWidth 
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type='text'
                    required 
                    color='success'
                    focused
                />
                <TextField 
                    variant='outlined' 
                    label='Phone Number' 
                    fullWidth 
                    onChange={(e) => setNumber(e.target.value)}
                    value={number}
                    type='number'
                    required
                    color='success'
                />
                <TextField 
                    variant='outlined' 
                    label='Email' 
                    fullWidth 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type='email'
                    required 
                    color='success'
                />
                <FormControl style={{width: "100%"}}>
                    <InputLabel id="packagePicker" color='success'>Package</InputLabel>
                    <Select
                        labelId="packagePicker"
                        id="packageSelect"
                        value={packageNum}
                        label="Package"
                        onChange={handleChange}
                        fullWidth
                        color='success'
                        >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                    </Select>                
                </FormControl>
                <input type='submit' value='Submit Order' />
            </form>
        </div>
    )
}  

export default Form