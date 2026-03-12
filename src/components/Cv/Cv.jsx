import { useEffect, useRef, useState } from "react"
import { ReactComponent as Download } from "../../media/icons/download.svg"
import useLoginCard from "../../hooks/useLoginCard"
import useAuth from "../../hooks/useAuth"


import styles from "./Cv.module.css"
export default function Cv() {
    const [isAgree, setIsAgree] = useState(false)
    const [isDownloaded, setIsDownloaded] = useState(false);
    const { user } = useAuth()
    const { openLoginCard } = useLoginCard();
    const timerRef = useRef(null)
    const handleClick = (e) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        if (isAgree && user) {
            setIsDownloaded(true);
            timerRef.current = setTimeout(() => setIsDownloaded(false), 2000);
        }
        if (!(isAgree && user)) {
            e.preventDefault()
            return
        }
    };
    useEffect(() => {
        return (() => {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }
        })
    }, []);
    return (
        <div className={styles.container}>
            <div className={`${styles.text} ${styles.textTop}`}>
                {user ? `Logged in as ${user.displayName}` : <>
                    <div>To download CV you must be logged in</div>
                    <button className={styles.loginButton} onClick={openLoginCard} >Login</button>
                </>}
            </div>
            <div className={styles.download}>
                <div>
                    <a href="/files/js.pdf" onClick={handleClick} download="CV-Buceacii.pdf">
                        <Download fill={(isAgree && user) ? "#1C274C" : "gray"} className={styles.icon} />
                    </a>
                </div>
                <div>
                    <label>
                        <input disabled={!user} type="checkbox" checked={isAgree} onChange={(e) => setIsAgree(e.target.checked)} />
                        I agree to the Terms and Conditions
                    </label>
                </div>
            </div>
           
                <div className={`${styles.text} ${styles.textBottom}`} >
                   {isDownloaded && <span className={styles.message}>Thank you for downloading! I really appreciate it</span> }
                </div>

        </div>
    )
}