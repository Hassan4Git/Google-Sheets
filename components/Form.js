import styles from '../styles/Form.module.scss'
import Image from 'next/image'

const Form = () => {
    return (
        <div className={styles.container}>
            <Image src='/google_sheets_logo.png' height={70} width={50} alt='Google Sheets' id='top' />
            <Image src='/google_sheets_logo.png' height={70} width={50} alt='Google Sheets' id='bottom' />
            <form className={styles.form}>
                <h1>Order</h1>
                <input type='text' placeholder='Lorem' />
                <input type='text' placeholder='Lorem' />
                <input type='text' placeholder='Lorem' />
                <input type='submit' value='Submit Order' />
            </form>
        </div>
    )
}  

export default Form