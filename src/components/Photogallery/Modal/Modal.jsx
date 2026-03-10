import { useEffect } from "react";
import styles from "./Modal.module.css";

/**
 * ImageModal
 * - Blurred overlay background
 * - Close on overlay click
 * - Close on Escape
 * - Next/Prev buttons + ArrowLeft/ArrowRight shortcuts
 * - Locks page scroll when open
 */
export default function Modal({
  open,
  image, // { src, alt, title }
  onClose,
  canPrev,
  canNext,
  onPrev,
  onNext,
}) {
  // Keyboard shortcuts
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowLeft" && canPrev) onPrev?.();
      if (e.key === "ArrowRight" && canNext) onNext?.();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, canPrev, canNext, onPrev, onNext]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || !image) return null;

  const alt = image.alt ?? image.title ?? "Image";

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={image.title ? `Preview: ${image.title}` : "Image preview"}
      onMouseDown={(e) => {
        // If user clicked outside the modal container, close
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className={styles.modal}>
        {/* Close */}
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
          ✕
        </button>

        {/* Prev / Next */}
        <button
          type="button"
          className={`${styles.nav} ${styles.navLeft}`}
          onClick={onPrev}
          disabled={!canPrev}
          aria-label="Previous image"
          title="Previous (←)"
        >
          ‹
        </button>

        <button
          type="button"
          className={`${styles.nav} ${styles.navRight}`}
          onClick={onNext}
          disabled={!canNext}
          aria-label="Next image"
          title="Next (→)"
        >
          ›
        </button>

        {/* Main preview */}
        <div className={styles.content}>
          <img className={styles.full} src={image.src} alt={alt} />
          {(image.title ?? "").trim() && <div className={styles.title}>{image.title}</div>}
          <div className={styles.hint}>Use ← / → to navigate, Esc to close.</div>
        </div>
      </div>
    </div>
  );
}