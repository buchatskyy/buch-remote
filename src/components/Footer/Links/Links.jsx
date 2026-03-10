import { Link } from "react-router-dom"

import styles from './Links.module.css'

export default function Links() {
    return (
        <div className={styles.container}>
            <Link to='/photo'>Photo gallery</Link>
            <Link to='/video'>Video gallery</Link>
            <Link to='/support'>Support me</Link>
            <Link to='/weather'>Check the weather</Link>
            <Link to='/landing'>Collaborate with me</Link>
        </div>
    )
}