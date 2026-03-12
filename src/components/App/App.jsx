import { useState } from "react";

import AppRoutes from "../Routes/Routes";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./App.module.css";


export default function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Header
                    isSidebarOpen={isSidebarOpen}
                    onSidebarToggle={() => setIsSidebarOpen((prev) => !prev)}
                    onSidebarClose={() => setIsSidebarOpen(false)}
                />
            </div>
            <main className={styles.main}>
                <div className={styles.sidebar}>
                    <Sidebar />
                </div>
                <div className={styles.mobileSidebar}>
                    <Sidebar
                        isMobileOpen={isSidebarOpen}
                        onClose={() => setIsSidebarOpen(false)}
                    />
                </div>
                <div className={styles.content}>
                    <AppRoutes />
                </div>
            </main>
            <div className={styles.footer}>
                <Footer />
            </div>
        </div>
    )
}
