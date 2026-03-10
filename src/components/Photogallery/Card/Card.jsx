import styles from "./Card.module.css";

/**
 * ImageCard
 * - Purely presentational
 * - Clickable wrapper for a thumbnail image + optional caption
 */
export default function Card({ src, alt, title, onClick, width = 260 }) {
  return (
    <button
      type="button"
      className={styles.card}
      style={{ width }}
      onClick={onClick}
    >
      <img className={styles.thumb} src={src} alt={alt ?? title ?? "Image"} />
    </button>
  );
}