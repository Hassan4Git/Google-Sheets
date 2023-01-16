import styles from '../styles/Form.module.scss'
import Image from 'next/image'
import { TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material'
import { useState } from 'react'

const Form = () => {
    const [packageNum, setPackageNum] = useState('')
    const handleChange = (event) => {
        setPackageNum(event.target.value)
    }
    return (
        <div className={styles.container}>
            <Image src='/google_sheets_logo.png' height={70} width={50} alt='Google Sheets' id={styles.bottom} />
            <Image src='/google_sheets_logo.png' height={70} width={50} alt='Google Sheets' id={styles.top} />
            <form className={styles.form}>
                <h1>Order</h1>
                <TextField variant='outlined' label='Name' fullWidth />
                <TextField variant='outlined' label='Phone Number' fullWidth />
                <FormControl style={{width: "100%"}}>
                    <InputLabel id="packagePicker">Package</InputLabel>
                    <Select
                        labelId="packagePicker"
                        id="packageSelect"
                        value={packageNum}
                        label="Package"
                        onChange={handleChange}
                        fullWidth
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