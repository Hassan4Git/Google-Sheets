import styles from '../styles/Packages.module.scss'
import Image from 'next/image'

const Packages = () => {
    return (
        <div className = {styles.container}>
            <div className = {styles.header}>
                <Image src='/list_icon.png' height={40} width={40} alt='List Icon' />
                <h1>Our Packages</h1>
            </div>
            <ul>
                <li>
                    <div>1</div>
                    <p>Hypothetical product 1</p>
                </li>
                <li>
                    <div>2</div>
                    <p>Hypothetical product 2</p>
                </li>
                <li>
                    <div>3</div>
                    <p>Hypothetical product 3</p>
                </li>
            </ul>
        </div>
    )
}

export default Packages