import styles from "./Addres.module.css"

export default function Address() {
    return (
        <address className={styles.container}>
            <div>Dumitru Buceacii</div>
            <div>Viale Dolomiti 23/E, ap. 24</div>
            <div>Ponte nelle Alpi, BL 32014</div>
            <div>ITALY</div>
        </address>
    )
}