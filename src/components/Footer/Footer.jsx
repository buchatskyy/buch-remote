import {ReactComponent as LogoF} from "../../media/logov2.svg"
import Contact from "../Contacts/Contact/Contact"
import Social from "../Contacts/Social/Social"

import styles from "./Footer.module.css"
import Links from "./Links/Links"


export default function Footer() {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div>
                    <Links/>
                </div>
                <div>
                    <Contact/>
                </div>
                <div>
                    <Social/>
                </div>

            </div>
            <div className={styles.bottom}>
                    <LogoF className={styles.logoF}/>
                    <p>Copyright © 2026 Buchatskyy.  All rights reserved</p>
            </div>
        </div>
    )
}