import { NavLink } from "react-router-dom"
import styles from "./Sidebar.module.css"

export default function Sidebar() {
    return (
        <div className={styles.container}>
            <div className={styles.navigation}>
            <div className={styles.navContainer}>
                <NavLink to="/photo">Photogallery</NavLink>
            </div>
            <div className={styles.navContainer}>
                <NavLink to="/video">Videogallery</NavLink>
            </div>
            <div className={styles.navContainer}>
                <NavLink to="/support">Support me</NavLink>
            </div>
            {/* <div className={styles.navContainer}>
                <NavLink to="/about">About me</NavLink>
            </div> */}
            </div>
            
        </div>
    )
}
