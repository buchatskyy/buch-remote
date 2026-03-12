import { useState } from "react";
import styles from "./Landing.module.css"
import OrderForm from "../Landing/OrderForm"
import useAuth from "../../hooks/useAuth"
import useLoginCard from "../../hooks/useLoginCard"
export default function Landing() {
    const [showForm, setShowForm] = useState(false);
    const { user } = useAuth()
    const {openLoginCard} = useLoginCard()
    const handleClick = () => {
        if (user) {
            setShowForm(!showForm)
        } else {
            openLoginCard()
        }

    }
    return (
        <div className={styles.page}>
            <div className="styles.container">

                <section className={styles.hero}>
                    <h1>🚀 Let's Collaborate on Landing Pages</h1>
                    <p>
                        I'm building my experience as a landing page creator and looking to collaborate
                        with agencies, marketers, and business owners who need clean, simple landing pages.
                    </p>
                    <p>
                        If you have clients and need someone reliable to build the page — I'd love to work with you.
                    </p>
                </section>

                <section className={styles.offer}>
                    <h2>🎯 My Grand "MF" Offer</h2>

                    <div className={styles.offerpoints}>
                        <p>✨ I build your landing page</p>
                        <p>✨ Until you're satisfied</p>
                        <p>✨ At a beginner-friendly price</p>
                        <p>✨ With full effort and attention</p>
                    </div>

                    <ul className={styles.offerlist}>
                        <li>✔ Clean, modern design</li>
                        <li>✔ Mobile-friendly layout</li>
                        <li>✔ Clear structure based on your content</li>
                        <li>✔ Unlimited small revisions (within scope)</li>
                        <li>✔ On-time delivery</li>
                        <li>✔ Dedicated communication</li>
                    </ul>

                    <div className={styles.commitment}>
                        <p>Low risk for you.</p>
                        <p>High commitment from me.</p>
                    </div>
                </section>

                <section className={styles.why}>
                    <h2>💡 Why Work With Me?</h2>
                    <ul>
                        <li>Affordable rates</li>
                        <li>Focused attention (no overloaded projects)</li>
                        <li>Strong motivation to prove my value</li>
                        <li>I treat every project like it builds my reputation</li>
                    </ul>
                </section>

                <section className={styles.process}>
                    <h2>⚙️ How It Works</h2>
                    <ol>
                        <li>Send content & brand details</li>
                        <li>I design & build</li>
                        <li>We refine together</li>
                        <li>You launch 🚀</li>
                    </ol>
                </section>

                <section className={styles.cta}>
                    <h2>🤝 Let's Build Something Great</h2>
                    <p>
                        If you're open to working with someone hungry to grow and committed to delivering quality work — let's collaborate.
                    </p>
                    <button onClick={handleClick}>{showForm ? "Hide the form" : "Compile the form to contact me"}</button>
                </section>
                {showForm && <OrderForm />}
            </div>
        </div>
    );
}
