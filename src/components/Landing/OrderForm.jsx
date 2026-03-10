import { useState } from "react"
import emailjs from "@emailjs/browser"
import styles from "./OrderForm.module.css"
import { KEYS } from "./keys"

export default function OrderForm() {
    const [data, setData] = useState({ name: '', email: '', tel: '', message: '' });
    const [isSent, setIsSent] = useState(false)
    function handleSubmit(e) {
        e.preventDefault()
        emailjs.send(
            KEYS.serviceId,
            KEYS.templateId,
            data,
            KEYS.publicKey
        ).then(
            () => {
                setData({ name: '', email: '', tel: '', message: '' })
                setIsSent(true)
            },
            (error) => {
                alert("Failed to send message.")
                console.log(error)
            }
        )
    }
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <label>
                    Name
                    <input className={styles.field} required onChange={(e) => setData({ ...data, name: e.target.value })} type="text" value={data.name} />
                </label>
                <label>
                    Email
                    <input className={styles.field} required onChange={(e) => setData({ ...data, email: e.target.value })} type="email" value={data.email} />
                </label>
                <label>
                    Tel №
                    <input className={styles.field} required onChange={(e) => setData({ ...data, tel: e.target.value })} type="tel" value={data.tel} />
                </label>
                <label>
                    More information (optional)
                    <textarea onChange={(e) => setData({ ...data, message: e.target.value })} value={data.message} rows='10' cols='60' placeholder="Type..." ></textarea>
                </label>
                <div className={styles.feedback}>
                    <button type="submit">Contact me</button>
                    <div>{isSent ? "Thank you for your inquiry. I will contact you shortly." : ""}</div>
                </div>
            </form>
        </div>
    )
}