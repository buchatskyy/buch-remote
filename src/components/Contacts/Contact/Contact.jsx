import styles from "./Contact.module.css"

import { ReactComponent as Tel } from "../../../media/icons/telephone.svg"
import { ReactComponent as Mail } from "../../../media/icons/email.svg"
import { ReactComponent as Whatsapp } from "../../../media/icons/whatsapp.svg"

export default function Contact({ className = "" }) {
    return (
        <div className={`${styles.container} ${className}`.trim()}>
            <div className={`${styles.telContainer} ${styles.block}`}>
                <Tel style={{stroke:"orange"}} className={styles.icon} />
                <a target="_blank" rel="noreferrer noopener" href="tel:+393896345280">+39 389 634 52 80</a>
            </div>
            <div className={`${styles.emailContainer} ${styles.block}`}>
                <Mail style={{stroke:"blue"}} className={styles.icon} />
                <a target="_blank" rel="noreferrer noopener" href="mailto:buchatskyy1995@gmail.com">Contact me</a>
            </div>
            <div className={`${styles.whatsappContainer} ${styles.block}`}>
                <Whatsapp style={{fill:"green"}} className={styles.icon} />
                <a target="_blank" rel="noreferrer noopener" href="https://wa.me/393896345280?text=Buongiorno Dimitrii. Mi piacerebbe lavorare con te.">Contact me on WhatsApp </a>
            </div>
        </div>
    )
}
