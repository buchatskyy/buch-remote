import useAuth from "../../hooks/useAuth";
import styles from "./LoginCard.module.css";

export default function LoginCard({ onClose }) {
  const { login } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await login();
      onClose();
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message || "Unable to sign in");
    }
  };

  const handleCardClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.card} onClick={handleCardClick}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className={styles.badge}>Welcome back</div>

        <h2 className={styles.title}>Sign in</h2>

        <p className={styles.text}>
          Sign in with Google to access private sections of the website.
        </p>

        <button
          type="button"
          className={styles.googleButton}
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}