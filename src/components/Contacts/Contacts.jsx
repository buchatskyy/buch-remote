import Contact from "./Contact/Contact"
import Address from "./Address/Address"
import Social from "./Social/Social"
import Map from "./Map/Map"

import styles from "./Contacts.module.css"

export default function Contacts() {
    return (
        <div className={styles.container}>
            <div className={styles.map}>
                <Map/>
            </div>
            <div className={styles.contactContainer}>
                <Address />
                <Contact />
                <Social />
            </div>
        </div>
    )
}