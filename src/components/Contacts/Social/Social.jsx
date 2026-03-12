import { ReactComponent as LinkedIn } from "../../../media/icons/linkedin.svg"
import { ReactComponent as Instagram } from "../../../media/icons/instagram.svg"
import { ReactComponent as Youtube } from "../../../media/icons/youtube.svg"

import styles from "./Social.module.css"



export default function Social({ className = "" }) {
    return (
        <div className={`${styles.container} ${className}`.trim()}>
            <a target="_blank" rel="noreferrer noopener" className={styles.iha} href="https://linkedin.com/in/dimitrii-buceacii-21ab9b362">
                <LinkedIn style={{ fill: "#0077B5" }} className={styles.icon} />
                Dimitrii Buceacii
            </a>
            <a target="_blank" rel="noreferrer noopener" className={styles.iha} href="https://www.instagram.com/buchatskyyy?igsh=MTc0dDVxam56Z3JxYw==">
                <Instagram className={styles.icon}/>
                buchatskyyy
            </a>
            <a target="_blank" rel="noreferrer noopener" className={styles.iha} href="https://www.youtube.com/@buchatskyy">
            <Youtube className={styles.icon}/>
            msDymoon
            </a>
        </div>
    )
}
