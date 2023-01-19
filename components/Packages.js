import styles from '../styles/Packages.module.scss'

const Packages = () => {
    return (
        <div className={styles.wrapper}>
            <h2>Our Packages</h2>
            <div className = {styles.container}>
                <div>
                    <div className={styles.infoExpand}>
                        <div className={styles.numberBox}>1</div>
                        <span>Hypothetical product 1</span>
                    </div>
                    <p>• Extra information about the product.</p>
                </div>
                <div>
                    <div className={styles.infoExpand}>
                        <div className={styles.numberBox}>2</div>
                        <span>Hypothetical product 2</span>
                    </div>
                    <p>• Extra information about the product.</p>
                </div>
                <div>
                    <div className={styles.infoExpand}>
                        <div className={styles.numberBox}>3</div>
                        <span>Hypothetical product 3</span>
                    </div>
                    <p>• Extra information about the product.</p>
                </div>
                <div>
                    <div className={styles.infoExpand}>
                        <div className={styles.numberBox}>4</div>
                        <span>Hypothetical product 4</span>
                    </div>
                    <p>• Extra information about the product.</p>
                </div>
                <div>
                    <div className={styles.infoExpand}>
                        <div className={styles.numberBox}>5</div>
                        <span>Hypothetical product 5</span>
                    </div>
                    <p>• Extra information about the product.</p>
                </div>
            </div>
        </div>
    )
}

export default Packages