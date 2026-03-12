import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const links = [
    { to: "/photo", label: "Photogallery" },
    { to: "/video", label: "Videogallery" },
    { to: "/support", label: "Support me" },
];

export default function Sidebar({ isMobileOpen = false, onClose }) {
    return (
        <div className={`${styles.container} ${isMobileOpen ? styles.containerOpen : ""}`}>
            <button
                type="button"
                className={`${styles.overlay} ${isMobileOpen ? styles.overlayOpen : ""}`}
                aria-label="Close sidebar"
                onClick={onClose}
            />
            <div className={`${styles.navigation} ${isMobileOpen ? styles.navigationOpen : ""}`}>
                {links.map(({ to, label }) => (
                    <div key={to} className={styles.navContainer}>
                        <NavLink to={to} onClick={onClose}>{label}</NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
}
