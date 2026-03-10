import styles from './Support.module.css'


export default function Support() {
    return (
        <div className={styles.container}>
            <h1>☕ Support My Work</h1>

            <div className={styles.text}>
                <h3>Thank you for visiting my portfolio!</h3>
                <p>I'm a Frontend Developer at the beginning of my professional journey, focused on building modern, responsive, and user-friendly web interfaces. Every project in this portfolio reflects my commitment to continuous learning and improving my skills.</p>
                <p>If you appreciate my work or would like to support my growth as a developer, you can do so through Buy Me a Coffee.</p>
                <h4>Your support helps me:</h4>
                <ul>
                    <li>Dedicate more time to building real-world projects</li>
                    <li>Explore advanced frontend technologies and best practices</li>
                    <li>Invest in courses, tools, and learning resources</li>
                    <li>Contribute to open-source and personal projects</li>
                </ul>
                <p> Even a small contribution means a lot and motivates me to keep growing and creating.</p>
                <h4>Thank you for your support!</h4>


            </div>
            <a href='https://buymeacoffee.com/buchatskyyv' target='_blank' rel='noreferrer'><button className={styles.donate}>👉 Support me on 'Buy Me a Coffee'</button></a>
        </div>
    )
}